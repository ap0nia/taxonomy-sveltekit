/**
 * APIs for resolving emojis.
 */
export const emojiApis = {
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

export type EmojiApi = keyof typeof emojiApis

export type LoadEmojiOptions = {
  /**
   * Custom fetch function to use.
   */
  fetch?: typeof fetch
}

export function loadEmoji(code: string, api: EmojiApi = 'twemoji', options?: LoadEmojiOptions) {
  const resolvedApi = emojiApis[api] ?? emojiApis.twemoji

  const resolvedFetch = options?.fetch ?? fetch

  if (typeof resolvedApi === 'function') {
    return resolvedFetch(resolvedApi(code))
  }

  return resolvedFetch(`${resolvedApi}${code.toUpperCase()}.svg`)
}
