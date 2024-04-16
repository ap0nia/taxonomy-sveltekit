<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  import { cn } from '$lib/utils/cn'

  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}

  let className: $$Props['class'] = ''

  export { className as class }
</script>

<h4 class={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)} {...$$restProps}>
  <slot />
</h4>
