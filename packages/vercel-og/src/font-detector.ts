export type FontRange = Array<number | Array<number>>

export class FontDetector {
  rangesByLanguage: Record<string, FontRange> = {}

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

    for (const [, _language = '', range] of matches) {
      const lang = _language.replaceAll(' ', '+')

      if (!this.rangesByLanguage[lang]) {
        this.rangesByLanguage[lang] = []
      }

      this.rangesByLanguage[lang]?.push(...convert(range))
    }
  }
}

function checkSegmentInRange(segment: string, range: FontRange) {
  const codePoint = segment.codePointAt(0)

  if (!codePoint) return false

  return range.some((val) => {
    return typeof val === 'number'
      ? codePoint === val
      : Number(val[0]) <= codePoint && codePoint <= Number(val[1])
  })
}

function convert(input: string = '') {
  return input.split(', ').map((range) => {
    range = range.replaceAll('U+', '')

    const [start = 0, end] = range.split('-').map((hex) => parseInt(hex, 16))

    if (end == null || isNaN(end)) {
      return start
    }

    return [start, end]
  })
}
