import { THEME_KEY } from '$lib/config/themes'

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
  const theme = event.cookies.get(THEME_KEY)
  const session = await event.locals.getSession()
  const user = await event.locals.getUser()

  return {
    theme,
    session,
    user,
  }
}
