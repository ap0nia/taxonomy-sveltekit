// @ts-check

import { paraglide } from '@inlang/paraglide-js-adapter-sveltekit/vite'
import { sveltekit } from '@sveltejs/kit/vite'

import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  plugins: [
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide',
    }),
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  server: {
    fs: {
      allow: ['.contentlayer'],
    },
  },
})

export default config
