<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  import { cn } from '$lib/utils/cn'

  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}

  let className: $$Props['class'] = ''

  export { className as class }
</script>

<h1 class={cn('mt-2 scroll-m-20 text-4xl font-bold tracking-tight', className)} {...$$restProps}>
  <slot />
</h1>
