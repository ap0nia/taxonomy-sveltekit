<script lang="ts">
  import Cookie from 'js-cookie'
  import { mode, ModeWatcher, setMode } from 'mode-watcher'

  import { setModeFromTheme, theme, THEME_CONSTANTS, THEME_KEY, themes } from '$lib/config/themes'

  /**
   * Inline function that runs when the page loads to initialize
   * the correct DaisyUI theme and mode-watcher mode.
   */
  const initializationFunction = setModeFromTheme.toString()

  /**
   * Arguments to the initialization function,
   * stringified so it can be inlined as raw HTML.
   */
  const initializationArgs = JSON.stringify(THEME_CONSTANTS)

  const initializationCall = `(${initializationFunction})(${initializationArgs})`

  /**
   * Whenever theme changes, derive the mode for mode-watcher.
   */
  $: themeMode = themes[$theme.value as keyof typeof themes]

  $: if ($mode != null && !$theme.value) {
    theme.set({ value: $mode, label: $mode })
  }

  /**
   * Update mode-watcher's mode accordingly.
   */
  $: if (themeMode) {
    setMode(themeMode)
  }

  /**
   * Update the stored theme cookie whenever the theme store changes.
   */
  $: Cookie.set(THEME_KEY, $theme.value, { expires: 365 })
</script>

<ModeWatcher />

<!--
@component

Initializes the theme and watches for changes to the theme.

The website prioritizes DaisyUI theme over mode-watcher mode.
-->

<svelte:head>
  <!-- eslint-disable svelte/no-at-html-tags -->
  {@html `<script nonce="%sveltekit.nonce%">` + initializationCall + `</script>`}
</svelte:head>
