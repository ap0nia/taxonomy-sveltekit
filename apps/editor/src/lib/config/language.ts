import type { Selected } from 'bits-ui'
import { writable } from 'svelte/store'

import { t } from '$lib/i18n'
import * as m from '$paraglide/messages'
import {
  type AvailableLanguageTag,
  languageTag,
  onSetLanguageTag,
  setLanguageTag,
} from '$paraglide/runtime'

/**
 * Don't use this store because {@link languageTag} only works fully correctly within components.
 * This is a convenience observable that just provides updates.
 */
export function createLanguageStore() {
  const value = languageTag()

  const label = m.__name({}, { languageTag: value })

  const store = writable({ label, value }, (set) => {
    if (typeof document === 'undefined') return

    onSetLanguageTag((newLanguageTag) => {
      const label = m.__name({ language: newLanguageTag })
      set({ label, value: newLanguageTag })
    })
  })

  /**
   * Don't directly set the store, the store will listen to changes to the paraglide store.
   */
  const set = (selected: Selected<AvailableLanguageTag>) => {
    setLanguageTag(selected.value)
  }

  return {
    ...store,
    set,
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
