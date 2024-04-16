<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  import { cn } from '$lib/utils/cn'

  interface $$Props extends HTMLAttributes<HTMLAnchorElement> {}

  let className: $$Props['class'] = ''

  export { className as class }
</script>

<a href="/" class={cn('font-medium underline underline-offset-4', className)} {...$$restProps}>
  <slot />
</a>
