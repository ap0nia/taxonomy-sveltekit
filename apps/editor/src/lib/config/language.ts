import { writable } from 'svelte/store'

import { browser } from '$app/environment'
import { t } from '$lib/i18n'
import { languageTag, onSetLanguageTag } from '$paraglide/runtime'

/**
 * Don't use this store because {@link languageTag} only works fully correctly within components.
 * This is a convenience observable that just provides updates.
 *
 * @internal
 */
export function createLanguageStore() {
  const store = writable(languageTag(), (set) => {
    if (!browser) return

    onSetLanguageTag((newLanguageTag) => {
      set(newLanguageTag)
    })
  })

  return {
    ...store,
  }
}

/**
 * Reactive proxy to paraglide messages that updates whenever language changes.
 */
export function createMessagesStore() {
  /**
   * Using a derived store messes up the type of the translation function,
   * so use a writable store that subscribes/unsubscribes to the language store.
   */
  const store = writable(t, (set) => {
    const unsubscribe = language.subscribe(() => {
      set(t)
    })

    return () => {
      unsubscribe()
    }
  })

  return {
    ...store,
  }
}

export const language = createLanguageStore()

export const messages = createMessagesStore()
