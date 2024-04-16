import { error } from '@sveltejs/kit'
import { allDocumentations } from 'contentlayer/generated'

import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const slug = event.params.slug

  const documentation = allDocumentations.find((d) => d.slug === slug)

  if (documentation == null) {
    return error(404)
  }

  return {
    documentation,
  }
}
