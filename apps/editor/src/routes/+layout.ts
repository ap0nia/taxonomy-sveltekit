import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async (event) => {
  return {
    user: undefined,
    session: undefined,
    theme: event.data.theme,
  }
}
