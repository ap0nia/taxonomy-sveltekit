import { error } from '@sveltejs/kit'
import { allGuides } from 'contentlayer/generated'

import { getTableOfContents } from '$lib/utils/markdown-table-of-contents'

import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const slug = event.params.slug

  const guide = allGuides.find((b) => b.slug === slug)

  const guideModule = await import(`../../../../content/guides/${slug}.md`).catch((error) => {
    console.error('Failed to load markdown module. ', error)
  })

  if (guide == null || guideModule == null) {
    return error(404)
  }

  const tableOfContents = await getTableOfContents(guide.body.raw)

  return {
    component: guideModule.default,
    metadata: guideModule.metadata,
    guide,
    tableOfContents,
  }
}
