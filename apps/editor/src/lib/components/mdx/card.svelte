<script lang="ts">
  import { cn } from '$lib/utils/cn'

  let className = ''

  export let href = ''

  export let disabled = false

  export { className as class }
</script>

<div
  class={cn(
    'group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg',
    disabled && 'cursor-not-allowed opacity-60',
    className,
  )}
  {...$$restProps}
>
  <div class="flex flex-col justify-between space-y-4">
    <div class="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
      <slot />
    </div>
  </div>
  {#if href}
    <a href={disabled ? '#' : href} class="absolute inset-0">
      <span class="sr-only">View</span>
    </a>
  {/if}
</div>
