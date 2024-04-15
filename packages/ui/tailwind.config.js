// @ts-check

import typography from '@tailwindcss/typography'

import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

const defaultThemes = /** @type {import('daisyui').Theme[]} */ (Object.keys(themes))

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [daisyui, typography],
  daisyui: {
    themes: [
      ...defaultThemes,
      {
        light: themes.corporate,
        dark: themes.dracula,
      },
    ],
  },
}

export default config
