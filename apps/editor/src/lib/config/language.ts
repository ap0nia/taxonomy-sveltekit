import type { Selected } from 'bits-ui'
import { writable } from 'svelte/store'

import * as m from '$paraglide/messages'
import {
  type AvailableLanguageTag,
  languageTag,
  onSetLanguageTag,
  setLanguageTag,
} from '$paraglide/runtime'

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

export const translationFunction = <T extends keyof typeof m>(
  message: T,
  ...args: Parameters<(typeof m)[T]>
): ReturnType<(typeof m)[T]> => {
  return (m[message] as any)(...args)
}

/**
 * Reactive proxy to paraglide messages that updates whenever language changes.
 */
export function createMessagesStore() {
  /**
   * Using a derived store messes up the type of the translation function,
   * so use a writable store that subscribes/unsubscribes to the language store.
   */
  const store = writable(translationFunction, (set) => {
    const unsubscribe = language.subscribe(() => {
      set(translationFunction)
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
