// @ts-check

import typography from '@tailwindcss/typography'
import uiConfig from '@taxonomy/ui/tailwind.config'

import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'
import { fontFamily } from 'tailwindcss/defaultTheme'

const defaultThemes = /** @type {import('daisyui').Theme[]} */ (Object.keys(themes))

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  ...uiConfig,
  content: ['./src/**/*.{html,js,svelte,ts,md}', '../../packages/ui/src/**/*.{html,js,svelte,ts}'],
  plugins: [daisyui, typography],
  theme: {
    extend: {
      animation: uiConfig.theme?.extend?.animation,
      keyframes: uiConfig.theme?.extend?.keyframes,
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
      },
    },
  },

  /**
   * @type {import('daisyui').Config}
   */
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
