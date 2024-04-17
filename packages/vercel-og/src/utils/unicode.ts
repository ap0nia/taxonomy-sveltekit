const U200D = String.fromCharCode(8205)
const UFE0Fg = /\uFE0F/g

export function getIconCode(char: string) {
  return toCodePoint(char.indexOf(U200D) < 0 ? char.replace(UFE0Fg, '') : char)
}

export function toCodePoint(unicodeSurrogates: string) {
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
