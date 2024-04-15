<script lang="ts">
  import '../app.css'

  import { theme } from '$lib/config/themes'

  import type { LayoutData } from './$types'

  export let data: LayoutData

  /**
   * Set the global theme based on the saved cookie value when the page is rendered for the first time.
   */
  theme.set({ value: data.theme ?? '', label: data.theme ?? '' })
</script>

<slot />
