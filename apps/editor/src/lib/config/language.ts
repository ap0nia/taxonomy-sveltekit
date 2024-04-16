import { writable } from 'svelte/store'

import * as m from '$paraglide/messages'
import { languageTag, onSetLanguageTag } from '$paraglide/runtime'

export const language = writable(languageTag(), (set) => {
  if (typeof document === 'undefined') return

  onSetLanguageTag((newLanguageTag) => {
    set(newLanguageTag)
  })
})

/**
 * Reactive proxy to paraglide messages that updates whenever language changes.
 */
export function createMessagesStore() {
  const translationFunction = <T extends keyof typeof m>(
    message: T,
    ...args: Parameters<(typeof m)[T]>
  ): ReturnType<(typeof m)[T]> => {
    return (m[message] as any)(...args)
  }

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

export const messages = createMessagesStore()
