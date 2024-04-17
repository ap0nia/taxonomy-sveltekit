<script lang="ts">
  import '../app.css'

  import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit'

  import ThemeWatcher from '$lib/components/theme/watcher.svelte'
  import { title } from '$lib/config/site'
  import { theme } from '$lib/config/themes'
  import { i18n } from '$lib/i18n.js'

  import type { LayoutData } from './$types'

  export let data: LayoutData

  /**
   * Set the global theme based on the saved cookie value when the page is rendered for the first time.
   */
  theme.set({ value: data.theme ?? '', label: data.theme ?? '' })
</script>

<ThemeWatcher />

<svelte:head>
  <title>{title}</title>
</svelte:head>

<ParaglideJS {i18n}>
  <slot />
</ParaglideJS>
