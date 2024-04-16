// @ts-check

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import adapter from '@svelte.kit/adapter-aws'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

import { mdsvex } from 'mdsvex'

/**
 * Absolute path to this file.
 * Used for resolving relative paths to template files in this project.
 */
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const sentryBundlerPluginCore = '@sentry/bundler-plugin-core'

/**
 * @type{import('@sveltejs/kit').Config}
 */
const config = {
  kit: {
    adapter: adapter({
      stream: true,
      lambdaUpload: (directory) => {
        const lambdaNodeModules = path.join(directory, 'node_modules')
        const nodeModules = path.join(__dirname, 'node_modules')

        const from = path.join(nodeModules, sentryBundlerPluginCore)
        const to = path.join(lambdaNodeModules, sentryBundlerPluginCore)

        fs.cpSync(from, to, { recursive: true })

        fs.cpSync('../../credentials.json', path.join(directory, 'credentials.json'))
      },
    }),
    env: {
      dir: '../../',
    },
    alias: {
      $server: './src/server',
      'contentlayer/generated': './.contentlayer/generated',
    },
  },
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
    }),
  ],
}

export default config
