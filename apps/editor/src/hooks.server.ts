import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { and, eq, gt } from 'drizzle-orm'

import { dimensions } from '$lib/config/og'
import { i18n } from '$lib/i18n'
import { asyncNoop } from '$lib/utils/noop'
import { session } from '$server/db'
import { auth } from '$server/services/auth'
import { db } from '$server/services/db'

const i18nhandle = i18n.handle()

const ogHandle: Handle = async ({ event, resolve }) => {
  return await resolve(event, {
    transformPageChunk(input) {
      return input.html
        .replace('%og:url%', event.url.origin)
        .replace('%og:image%', `${event.url.origin}/og`)
        .replace('%og:image:width%', `${dimensions.width}`)
        .replace('%og:image:height%', `${dimensions.height}`)
        .replace('%og:locale%', event.locals.paraglide.lang)
        .replace('%manifest%', `${event.url.origin}/manifest.json`)
    },
  })
}

const authenticationHandle: Handle = async ({ event, resolve }) => {
  const authResponse = await auth.handle({
    url: event.url,
    method: event.request.method,
    headers: event.request.headers,
    cookies: event.cookies,
    event,
  })

  let user: Aponia.User | false

  // The auth response injects utilities for retrieving the session
  // and refresh information for the current request.

  event.locals.getSession = authResponse?.getSession ?? asyncNoop
  event.locals.getRefresh = authResponse?.getRefresh ?? asyncNoop

  event.locals.getUser = async () => {
    if (user === false) return

    const cookieSession = await event.locals.getSession()

    if (cookieSession == null) {
      user = false
      return
    }

    const dbSession = await db.query.session.findFirst({
      where: and(eq(session.id, cookieSession.id), gt(session.expires, Date.now())),
      with: {
        user: true,
      },
    })

    if (dbSession?.user == null) {
      user = false
      return
    }

    user = dbSession.user

    return user
  }

  /**
   * Attempt to convert {@link authResponse} to a {@link Response} if possible.
   * Otherwise, fallback to SvelteKit's default handling.
   */
  const response = auth.toResponse(authResponse) ?? resolve(event)

  return response
}

export const handle = sequence(i18nhandle, ogHandle, authenticationHandle)
