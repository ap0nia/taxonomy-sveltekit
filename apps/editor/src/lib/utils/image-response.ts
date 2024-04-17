/**
 * Slightly modified version of @vercel/og
 *
 * @see https://vercel.com/docs/functions/og-image-generation/og-image-api for API reference.
 */
import { Resvg } from '@resvg/resvg-js'
import satori, { type SatoriOptions } from 'satori'
import type { html } from 'satori-html'

const assetCache = new Map()

const apis = {
  twemoji: (code: string) =>
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/' + code.toLowerCase() + '.svg',
  openmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/',
  blobmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/',
  noto: 'https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/',
  fluent: (code: string) =>
    'https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/' +
    code.toLowerCase() +
    '_color.svg',
  fluentFlat: (code: string) =>
    'https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/' +
    code.toLowerCase() +
    '_flat.svg',
}

export declare type EmojiType = keyof typeof apis

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
   * @default Noto Sans Latin Regular.
   */
  fonts?: SatoriOptions['fonts']

  /**
   * Using a specific Emoji style. Defaults to `twemoji`.
   *
   * @link https://github.com/vercel/og#emoji
   * @type {EmojiType}
   * @default 'twemoji'
   */
  emoji?: EmojiType
}

function loadEmoji(code: string, type?: keyof typeof apis) {
  if (!type || !apis[type]) {
    type = 'twemoji'
  }

  const api = apis[type]

  if (typeof api === 'function') {
    return fetch(api(code))
  }

  return fetch(`${api}${code.toUpperCase()}.svg`)
}

var U200D = String.fromCharCode(8205)
var UFE0Fg = /\uFE0F/g

function toCodePoint(unicodeSurrogates: string) {
  const r = []

  let p = 0
  let i = 0

  while (i < unicodeSurrogates.length) {
    const current = unicodeSurrogates.charCodeAt(i++)

    if (p) {
      r.push((65536 + ((p - 55296) << 10) + (current - 56320)).toString(16))
      p = 0
    } else if (55296 <= current && current <= 56319) {
      p = current
    } else {
      r.push(current.toString(16))
    }
  }
  return r.join('-')
}

function getIconCode(char: string) {
  return toCodePoint(char.indexOf(U200D) < 0 ? char.replace(UFE0Fg, '') : char)
}

export type ImageResponseOptions = ImageOptions & ConstructorParameters<typeof Response>[1]

export type VNode = ReturnType<typeof html>

async function loadGoogleFont(font?: string, text?: string) {
  if (!font || !text) return

  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`

  const css = await (
    await fetch(API, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource?.[1] == null) throw new Error('Failed to download dynamic font')

  const res = await fetch(resource[1])

  if (!res.ok) {
    throw new Error('Failed to download dynamic font. Status: ' + res.status)
  }

  return res.arrayBuffer()
}

export type DynamicAssetOptions = {
  emoji?: keyof typeof apis
}

const languageFontMap = {
  'ja-JP': 'Noto+Sans+JP',
  'ko-KR': 'Noto+Sans+KR',
  'zh-CN': 'Noto+Sans+SC',
  'zh-TW': 'Noto+Sans+TC',
  'zh-HK': 'Noto+Sans+HK',
  'th-TH': 'Noto+Sans+Thai',
  'bn-IN': 'Noto+Sans+Bengali',
  'ar-AR': 'Noto+Sans+Arabic',
  'ta-IN': 'Noto+Sans+Tamil',
  'ml-IN': 'Noto+Sans+Malayalam',
  'he-IL': 'Noto+Sans+Hebrew',
  'te-IN': 'Noto+Sans+Telugu',
  devanagari: 'Noto+Sans+Devanagari',
  kannada: 'Noto+Sans+Kannada',
  symbol: ['Noto+Sans+Symbols', 'Noto+Sans+Symbols+2'],
  math: 'Noto+Sans+Math',
  unknown: 'Noto+Sans',
}

function checkSegmentInRange(segment: string, range: any[]) {
  const codePoint = segment.codePointAt(0)

  if (!codePoint) return false

  return range.some((val) => {
    if (typeof val === 'number') {
      return codePoint === val
    } else {
      const [start, end] = val
      return start <= codePoint && codePoint <= end
    }
  })
}

class FontDetector {
  rangesByLanguage: Record<string, Array<Array<string | number> | number | string>> = {}

  async detect(text: string, fonts: string[]) {
    await this.load(fonts)

    const result: Record<string, string> = {}

    for (const segment of text) {
      const language = this.detectSegment(segment, fonts)

      if (language != null) {
        result[language] ||= ''
        result[language] += segment
      }
    }

    return result
  }

  detectSegment(segment: string, fonts: string[]) {
    return fonts.find((font) => {
      const range = this.rangesByLanguage[font]
      return range != null && checkSegmentInRange(segment, range)
    })
  }

  async load(fonts: string[]) {
    const existingLang = Object.keys(this.rangesByLanguage)

    const languageToLoad = fonts.filter((font) => !existingLang.includes(font))

    if (languageToLoad.length === 0) {
      return
    }

    let params = ''

    for (const font of languageToLoad) {
      params += `family=${font}&`
    }

    params += 'display=swap'

    const API = `https://fonts.googleapis.com/css2?${params}`

    const fontFace = await (
      await fetch(API, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        },
      })
    ).text()

    this.addDetectors(fontFace)
  }

  addDetectors(input: string) {
    const regex = /font-family:\s*'(.+?)';.+?unicode-range:\s*(.+?);/gms

    const matches = input.matchAll(regex)

    for (const [, _lang = '', range] of matches) {
      const lang = _lang.replaceAll(' ', '+')

      if (!this.rangesByLanguage[lang]) {
        this.rangesByLanguage[lang] = []
      }

      this.rangesByLanguage[lang]?.push(...convert(range))
    }
  }
}

function convert(input: string = '') {
  return input.split(', ').map((range) => {
    range = range.replaceAll('U+', '')

    const [start = '', end] = range.split('-').map((hex) => parseInt(hex, 16))

    if (end == null || isNaN(end)) {
      return start
    }

    return [start, end]
  })
}

const detector = new FontDetector()

function loadDynamicAsset(options: DynamicAssetOptions) {
  const fn = async (languageCode: string, segment: string) => {
    if (languageCode === 'emoji') {
      return (
        `data:image/svg+xml;base64,` +
        btoa(await (await loadEmoji(getIconCode(segment), options.emoji)).text())
      )
    }

    const codes = languageCode.split('|')

    const names = codes
      .map((c) => languageFontMap[c as keyof typeof languageFontMap])
      .filter(Boolean)
      .flat()

    if (names.length === 0) return names

    try {
      const textByFont = await detector.detect(segment, names)

      const fonts = Object.keys(textByFont)

      const fontData = await Promise.all(
        fonts.map((font) => loadGoogleFont(font, textByFont[font])),
      )

      return fontData.map((data, index) => ({
        name: `satori_${codes[index]}_fallback_${segment}`,
        data,
        weight: 400,
        style: 'normal',
        lang: codes[index] === 'unknown' ? void 0 : codes[index],
      }))
    } catch (e) {
      console.error(`Failed to load dynamic font for ${segment}. Error: ${e}`)
      return
    }
  }

  return async (languageCode: string, segment: string) => {
    const key = JSON.stringify([languageCode, segment])

    const cachedAsset = assetCache.get(key)

    if (cachedAsset) return cachedAsset

    const asset = await fn(languageCode, segment)

    assetCache.set(key, asset)

    return asset
  }
}

export class ImageResponse extends Response {
  static defaultOptions = {
    width: 1200,
    height: 630,
    debug: false,
    fonts: [],
  } satisfies ImageResponseOptions

  static async render(element: VNode, options?: ImageResponseOptions) {
    const resolvedOptions = {
      ...ImageResponse.defaultOptions,
      ...options,
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
        'cache-control': import.meta.env.DEV
          ? 'no-cache, no-store'
          : 'public, immutable, no-transform, max-age=31536000',
        ...options.headers,
      },
      status: options.status,
      statusText: options.statusText,
    })
  }
}
