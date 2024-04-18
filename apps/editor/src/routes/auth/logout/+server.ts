import { redirect, type RequestHandler } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

import { session } from '$server/db'
import { jwt } from '$server/services/auth'
import { db } from '$server/services/db'

export const POST: RequestHandler = async (event) => {
  const cookieSession = await event.locals.getSession()

  event.cookies.set(jwt.cookies.accessToken.name, '', {
    path: '/',
    maxAge: 0,
  })

  event.cookies.set(jwt.cookies.refreshToken.name, '', {
    path: '/',
    maxAge: 0,
  })

  if (cookieSession == null) {
    return redirect(302, '/')
  }

  const existingSession = await db.query.session.findFirst({
    where: eq(session.id, cookieSession.id),
  })

  if (existingSession == null) {
    return redirect(302, '/')
  }

  await db.update(session).set({ expires: 0 })

  return redirect(302, '/')
}
