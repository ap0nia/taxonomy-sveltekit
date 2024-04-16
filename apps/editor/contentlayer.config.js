// @ts-check

import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Documentation = defineDocumentType(() => ({
  name: 'Documentation',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (documentation) => `/documentation/${documentation._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (documentation) => documentation._raw.flattenedPath,
    },
  },
}))

const config = makeSource({ contentDirPath: './src/content', documentTypes: [Documentation] })

export default config
