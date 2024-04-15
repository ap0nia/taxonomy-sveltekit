<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'

  import { cn, flyAndScale } from '$lib/utils/cn'

  type $$Props = DropdownMenuPrimitive.ContentProps
  type $$Events = DropdownMenuPrimitive.ContentEvents

  let className: $$Props['class'] = undefined

  export let sideOffset: $$Props['sideOffset'] = 4

  export let transition: $$Props['transition'] = flyAndScale

  export let transitionConfig: $$Props['transitionConfig'] = undefined

  export { className as class }
</script>

<DropdownMenuPrimitive.Content
  class={cn(
    'bg-base-100 text-base-content',
    'z-50 min-w-48 p-1 shadow-md border rounded-md focus:outline-none',
    className,
  )}
  {transition}
  {transitionConfig}
  {sideOffset}
  {...$$restProps}
  on:keydown
>
  <slot />
</DropdownMenuPrimitive.Content>
