<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  import { cn } from '$lib/utils/cn'

  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}

  let className: $$Props['class'] = ''

  export { className as class }
</script>

<h6
  class={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)}
  {...$$restProps}
>
  <slot />
</h6>
