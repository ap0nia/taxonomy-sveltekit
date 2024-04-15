<script lang="ts">
  import * as Select from '@taxonomy/ui/select/index.js'

  import ThemeOption from '$lib/components/theme-option.svelte'
  import { theme, themes } from '$lib/config/themes'
  import { cn } from '$lib/utils/cn'

  export let triggerClasses = ''

  export let contentClasses = ''
</script>

<!--
@component

A select menu that can dynamically change the website's theme.
-->

<Select.Root bind:selected={$theme}>
  <Select.Trigger class={cn('w-[180px]', triggerClasses)}>
    <Select.Value placeholder="Select a theme" />
  </Select.Trigger>

  <Select.Content class={cn('max-h-80 !w-[180px] overflow-y-auto', contentClasses)}>
    <Select.Group>
      {#each Object.keys(themes) as theme}
        <ThemeOption {theme} />
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
