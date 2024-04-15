// @ts-check

import prettierPluginSvelte from 'prettier-plugin-svelte'
// import * as prettierPluginTailwindCSS from 'prettier-plugin-tailwindcss'

/**
 * @type{import('prettier').Config}
 */
const config = {
  semi: false,
  printWidth: 100,
  singleQuote: true,
  plugins: [
    prettierPluginSvelte,
    /* prettierPluginTailwindCSS */
  ],
}

export default config
