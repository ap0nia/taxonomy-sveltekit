import { createI18n } from '@inlang/paraglide-js-adapter-sveltekit'

import * as runtime from '$paraglide/runtime'

/**
 * "The inferred type of i18n cannot be named ..." ?
 */
export const i18n = createI18n(runtime)
