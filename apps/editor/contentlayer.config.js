// @ts-check

import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Documentation = defineDocumentType(() => ({
  name: 'Documentation',
  filePathPattern: `documentation/**/*.md`,
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    published: {
      type: 'boolean',
      default: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (documentation) => {
        return documentation._raw.sourceFilePath.slice('documentation/'.length).replace(/\.md$/, '')
      },
    },
    url: {
      type: 'string',
      resolve: (documentation) => {
        return `/${documentation._raw.sourceFilePath.replace(/\.md$/, '')}`
      },
    },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (documentation) => {
        return documentation._raw.sourceFilePath.slice('blog/'.length).replace(/\.md$/, '')
      },
    },
    url: {
      type: 'string',
      resolve: (documentation) => {
        return `/${documentation._raw.sourceFilePath.replace(/\.md$/, '')}`
      },
    },
  },
}))

const config = makeSource({
  contentDirPath: './src/content',
  documentTypes: [Blog, Documentation],
})

export default config
