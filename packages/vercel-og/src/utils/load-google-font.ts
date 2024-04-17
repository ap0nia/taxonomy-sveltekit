export type LoadGoogleFontOptions = {
  family: string
  weight?: number
  text?: string
}

export async function loadGoogleFont(options: LoadGoogleFontOptions) {
  if (options.family == null || options.text == null) return

  const API = `https://fonts.googleapis.com/css2?family=${options.family}&text=${encodeURIComponent(
    options.text,
  )}`

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

  const response = await fetch(resource[1])

  if (!response.ok) {
    throw new Error('Failed to download dynamic font. Status: ' + response.status)
  }

  return response.arrayBuffer()
}
