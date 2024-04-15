import { writable } from 'svelte/store'

export const theme = writable({ value: '', label: '' })

export const themes = {
  light: 'light',
  dark: 'dark',
  cupcake: 'light',
  bumblebee: 'light',
  emerald: 'light',
  corporate: 'light',
  synthwave: 'dark',
  retro: 'light',
  cyberpunk: 'light',
  valentine: 'light',
  halloween: 'dark',
  garden: 'light',
  forest: 'dark',
  aqua: 'light',
  lofi: 'light',
  pastel: 'light',
  fantasy: 'light',
  wireframe: 'light',
  black: 'dark',
  luxury: 'dark',
  dracula: 'dark',
  cmyk: 'light',
  autumn: 'light',
  business: 'dark',
  acid: 'light',
  lemonade: 'light',
  night: 'dark',
  coffee: 'dark',
  winter: 'light',
  dim: 'dark',
  nord: 'light',
  sunset: 'dark',
} as const

/**
 * The default key used by theme-change in localstorage.
 * @see https://github.com/saadeghi/theme-change/blob/master/src/toggle.js
 */
export const DEFAULT_THEME_KEY = 'theme'

export const TOGGLE_ELEMENT_SELECTOR = '[data-toggle-theme]'

export const TOGGLE_ELEMENT_DATA_KEY = 'data-key'

export const DATA_THEME_ATTRIBUTE = 'data-theme'

export const MODE_WATCHER_KEY = 'mode-watcher-mode'

/**
 * DTO that can be stringified and inlined in a call to {@link setModeFromTheme}
 * within the HTML document.
 *
 * Must only contain JSON serializable elements.
 */
export const THEME_CONSTANTS = {
  themes,
  DEFAULT_THEME_KEY,
  TOGGLE_ELEMENT_SELECTOR,
  TOGGLE_ELEMENT_DATA_KEY,
  DATA_THEME_ATTRIBUTE,
  MODE_WATCHER_KEY,
}

/**
 * Infers the DaisyUI theme based on the current mode for mode-watcher.
 *
 * Should be used whenever a theme is selected via mode-watcher.
 */
export function setThemeFromMode(currentMode?: string) {
  if (typeof document === 'undefined') return

  const toggleElement = document.querySelector(TOGGLE_ELEMENT_SELECTOR)

  const customKey = toggleElement ? toggleElement.getAttribute(TOGGLE_ELEMENT_DATA_KEY) : null

  const key = customKey ?? DEFAULT_THEME_KEY

  const mode = currentMode ?? localStorage.getItem(MODE_WATCHER_KEY) ?? 'system'

  const isLightModel =
    mode === 'light' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches)

  const themeName = isLightModel ? 'light' : 'dark'

  document.documentElement.setAttribute(DATA_THEME_ATTRIBUTE, themeName)

  localStorage.setItem(key, themeName)
}

/**
 * Infers the mode for mode-watcher based on the document and/or settings from theme-change.
 *
 * Should be used on page-load and whenever a theme is selected via theme-change.
 *
 * JSON serializable DTO must be provided to be compatible with HTML script on page-load.
 */
export function setModeFromTheme(constants: typeof THEME_CONSTANTS, currentMode?: string) {
  if (typeof document === 'undefined') return

  var toggleElement = document.querySelector(constants.TOGGLE_ELEMENT_SELECTOR)

  var customKey = toggleElement
    ? toggleElement.getAttribute(constants.TOGGLE_ELEMENT_DATA_KEY)
    : null

  var key = customKey ?? constants.DEFAULT_THEME_KEY

  var savedTheme = localStorage.getItem(key)

  if (savedTheme != null) {
    document.documentElement.setAttribute(constants.DATA_THEME_ATTRIBUTE, savedTheme)
  }

  var savedMode =
    savedTheme != null ? constants.themes[savedTheme as keyof typeof constants.themes] : undefined

  var mode =
    savedMode != null
      ? savedMode
      : currentMode ?? localStorage.getItem(constants.MODE_WATCHER_KEY) ?? 'system'

  var isLightModel =
    mode === 'light' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches)

  if (isLightModel) {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = 'light'
  } else {
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'
  }

  localStorage.setItem('mode-watcher-mode', mode)

  return savedTheme
}
