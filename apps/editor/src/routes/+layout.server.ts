import { THEME_KEY } from '$lib/config/themes'

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
  const theme = event.cookies.get(THEME_KEY)

  return {
    paraglide: event.locals.paraglide,
    theme,
  }
}
