<script lang="ts">
  import '../app.css'

  import ThemeWatcher from '$lib/components/theme/watcher.svelte'
  import { title } from '$lib/config/site'
  import { theme } from '$lib/config/themes'

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

<slot />
