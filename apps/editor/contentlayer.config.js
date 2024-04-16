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
      resolve: (documentation) =>
        documentation._raw.sourceFilePath.slice('documentation/'.length).replace(/\.md$/, ''),
    },
    url: {
      type: 'string',
      resolve: (documentation) => `/${documentation._raw.sourceFilePath.replace(/\.md$/, '')}`,
    },
  },
}))

const config = makeSource({ contentDirPath: './src/content', documentTypes: [Documentation] })

export default config
