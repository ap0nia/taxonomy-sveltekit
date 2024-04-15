import { DEFAULT_THEME_KEY } from '$lib/config/themes'

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
  const theme = event.cookies.get(DEFAULT_THEME_KEY)

  return {
    theme,
  }
}
