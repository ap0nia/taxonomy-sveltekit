import { createI18n } from '@inlang/paraglide-js-adapter-sveltekit'

import * as m from '$paraglide/messages'
import * as runtime from '$paraglide/runtime'

/**
 * "The inferred type of i18n cannot be named ..." ?
 */
export const i18n = createI18n(runtime)

export const t = <T extends keyof typeof m>(
  message: T,
  ...args: Parameters<(typeof m)[T]>
): ReturnType<(typeof m)[T]> => {
  return (m[message] as any)(...args)
}
