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

  /**
   * @taxonomy/vercel-og Uses resvg to generate SVGs, but has issues with bundling.
   *
   * @see https://github.com/sveltejs/kit/issues/11416#issuecomment-1969378502
   */
  build: {
    rollupOptions: {
      external: ['@resvg/resvg-js'],
    },
  },
})

export default config
