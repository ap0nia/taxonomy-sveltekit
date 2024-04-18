import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async (event) => {
  return {
    theme: event.data.theme,
    session: event.data.session,
    user: event.data.user,
  }
}
