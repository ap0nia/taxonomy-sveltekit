import { error } from '@sveltejs/kit'
import { allDocumentations } from 'contentlayer/generated'

import { getTableOfContents } from '$lib/utils/markdown-table-of-contents'

import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const slug = event.params.slug

  const documentation = allDocumentations.find((d) => d.slug === slug)

  const documentationModule = await import(`../../../../content/documentation/${slug}.md`).catch(
    (error) => {
      console.error('Failed to load markdown module. ', error)
    },
  )

  if (documentation == null || documentationModule == null) {
    return error(404)
  }

  const tableOfContents = await getTableOfContents(documentation.body.raw)

  return {
    component: documentationModule.default,
    metadata: documentationModule.metadata,
    documentation,
    tableOfContents,
  }
}
