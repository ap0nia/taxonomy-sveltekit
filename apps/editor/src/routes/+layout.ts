import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async (event) => {
  return {
    user: undefined,
    paraglide: event.data.paraglide,
    session: undefined,
    theme: event.data.theme,
  }
}
