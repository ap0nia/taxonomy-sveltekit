import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { dimensions } from '$lib/config/og'
import { i18n } from '$lib/i18n'

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

export const handle = sequence(i18nhandle, ogHandle)
