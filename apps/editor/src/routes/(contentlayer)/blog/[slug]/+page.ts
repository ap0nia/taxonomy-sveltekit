import { error } from '@sveltejs/kit'
import { allBlogs } from 'contentlayer/generated'

import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
  const slug = event.params.slug

  const blog = allBlogs.find((b) => b.slug === slug)

  const blogModule = await import(`../../../../content/blog/${slug}.md`).catch((error) => {
    console.error('Failed to load markdown module. ', error)
  })

  if (blog == null || blogModule == null) {
    return error(404)
  }

  return {
    component: blogModule.default,
    metadata: blogModule.metadata,
    blog,
  }
}
