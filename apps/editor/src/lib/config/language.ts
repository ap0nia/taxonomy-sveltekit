import { writable } from 'svelte/store'

import * as m from '$paraglide/messages'
import { onSetLanguageTag } from '$paraglide/runtime'

/**
 * Reactive proxy to paraglide messages that updates whenever language changes.
 */
export function createMessagesStore() {
  const store = writable(m, (set) => {
    onSetLanguageTag((_newLanguageTag) => {
      set({ ...m })
    })
  })

  return {
    ...store,
  }
}

export const messages = createMessagesStore()
