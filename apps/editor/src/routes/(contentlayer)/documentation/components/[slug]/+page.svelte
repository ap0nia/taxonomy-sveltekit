<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div>
  <svelte:component this={data.component}></svelte:component>
</div>
