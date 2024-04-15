<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'

  import { cn, flyAndScale } from '$lib/utils/cn'

  type $$Props = DropdownMenuPrimitive.SubContentProps
  type $$Events = DropdownMenuPrimitive.SubContentEvents

  let className: $$Props['class'] = undefined

  export let transition: $$Props['transition'] = flyAndScale

  export let transitionConfig: $$Props['transitionConfig'] = {
    x: -10,
    y: 0,
  }

  export { className as class }
</script>

<DropdownMenuPrimitive.SubContent
  {transition}
  {transitionConfig}
  class={cn(
    'z-50 min-w-32 p-1 bg-base-100 text-base-content border rounded-md shadow-lg focus:outline-none',
    className,
  )}
  {...$$restProps}
  on:keydown
  on:focusout
  on:pointermove
>
  <slot />
</DropdownMenuPrimitive.SubContent>
