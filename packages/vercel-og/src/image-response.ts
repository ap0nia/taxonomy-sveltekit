import { Resvg } from '@resvg/resvg-js'
import satori, { type SatoriOptions } from 'satori'
import type { html } from 'satori-html'

import type { EmojiApi } from './emoji'
import { loadDynamicAsset } from './utils/load-dynamic-assets'
import { loadGoogleFont } from './utils/load-google-font'

export type ImageOptions = {
  /**
   * The width of the image.
   *
   * @type {number}
   * @default 1200
   */
  width?: number

  /**
   * The height of the image.
   *
   * @type {number}
   * @default 630
   */
  height?: number

  /**
   * Display debug information on the image.
   *
   * @type {boolean}
   * @default false
   */
  debug?: boolean

  /**
   * A list of fonts to use.
   *
   * @type {{ data: ArrayBuffer; name: string; weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style?: 'normal' | 'italic' }[]}
   * ~~ @default Noto Sans Latin Regular ~~.
   *
   * @default Bitter Google font.
   */
  fonts?: SatoriOptions['fonts']

  /**
   * Using a specific Emoji style (i.e. API). Defaults to `twemoji`.
   *
   * @link https://github.com/vercel/og#emoji
   * @type {EmojiType}
   * @default 'twemoji'
   */
  emoji?: EmojiApi
}

export type ImageResponseOptions = ImageOptions &
  ConstructorParameters<typeof Response>[1] & {
    dev?: boolean
  }

export type VNode = ReturnType<typeof html>

export class ImageResponse extends Response {
  static defaultOptions = {
    width: 1200,
    height: 630,
    debug: false,
    fonts: [],
  } satisfies ImageResponseOptions

  /**
   * Cached default font.
   */
  static defaultFont?: ArrayBuffer

  static async render(element: VNode, options?: ImageResponseOptions) {
    const resolvedOptions = {
      ...ImageResponse.defaultOptions,
      ...options,
    }

    // Attempt to load default font.
    if (resolvedOptions.fonts.length === 0) {
      ImageResponse.defaultFont ??= await loadGoogleFont({
        family: 'Bitter',
        weight: 600,
      })

      if (ImageResponse.defaultFont != null) {
        resolvedOptions.fonts.push({
          name: 'Bitter',
          data: ImageResponse.defaultFont,
          weight: 500,
          style: 'normal',
        })
      }
    }

    const svg = await satori(element, {
      ...resolvedOptions,
      loadAdditionalAsset: loadDynamicAsset({
        emoji: resolvedOptions.emoji,
      }),
    })

    const resvgJS = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: resolvedOptions.width,
      },
    })

    const image = resvgJS.render()

    const png = image.asPng()

    return png
  }

  constructor(element: VNode, options: ImageResponseOptions = {}) {
    const stream = new ReadableStream({
      async start(controller) {
        const renderedImage = await ImageResponse.render(element, options)
        controller.enqueue(renderedImage)
        controller.close()
      },
    })

    super(stream, {
      headers: {
        'content-type': 'image/png',
        'cache-control': options?.dev
          ? 'no-cache, no-store'
          : 'public, immutable, no-transform, max-age=31536000',
        ...options.headers,
      },
      status: options.status,
      statusText: options.statusText,
    })
  }
}
