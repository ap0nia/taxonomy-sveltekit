// @ts-check

import { sveltekit } from '@sveltejs/kit/vite'

import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
  ],
})

export default config
