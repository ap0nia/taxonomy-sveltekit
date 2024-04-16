<script lang="ts">
  import { cn } from '$lib/utils/cn'

  export let type: 'default' | 'warning' | 'danger' = 'default'

  export let icon = ''
</script>

<div
  class={cn('my-6 flex items-start rounded-md border border-l-4 p-4', {
    'border-red-900 bg-red-50': type === 'danger',
    'border-yellow-900 bg-yellow-50': type === 'warning',
  })}
  {...$$restProps}
>
  {#if icon}
    <span class="mr-4 text-2xl">{icon}</span>
  {/if}

  <div>
    <slot />
  </div>
</div>
