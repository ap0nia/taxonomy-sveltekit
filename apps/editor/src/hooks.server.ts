import { sequence } from '@sveltejs/kit/hooks'

import { i18n } from '$lib/i18n'

const i18nhandle = i18n.handle()

export const handle = sequence(i18nhandle)
