// @ts-check

import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

/**
 * @type{import('postcss-load-config').Config}
 */
const config = {
  plugins: [autoprefixer(), tailwindcss()],
}

export default config
