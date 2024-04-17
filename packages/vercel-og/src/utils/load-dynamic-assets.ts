import { type EmojiApi, loadEmoji } from '../emoji'
import { FontDetector } from '../font-detector'
import { languageFontMap } from '../language-font-map'
import { loadGoogleFont } from './load-google-font'
import { getIconCode } from './unicode'

const assetCache = new Map()

const detector = new FontDetector()

export type DynamicAssetOptions = {
  emoji?: EmojiApi
}

export function loadDynamicAsset(options: DynamicAssetOptions) {
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
        fonts.map((family) => loadGoogleFont({ family, text: textByFont[family] })),
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
