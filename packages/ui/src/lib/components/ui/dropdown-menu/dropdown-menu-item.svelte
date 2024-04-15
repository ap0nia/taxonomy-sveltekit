<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'

  import { cn } from '$lib/utils/cn'

  type $$Props = DropdownMenuPrimitive.ItemProps & {
    inset?: boolean
  }

  type $$Events = DropdownMenuPrimitive.ItemEvents

  let className: $$Props['class'] = undefined

  export let inset: $$Props['inset'] = undefined

  export { className as class }

  $: classes = cn(
    'btn btn-sm btn-ghost no-animation',
    'data-[disabled]:btn-disabled data-[highlighted]:btn-active',
    'relative flex justify-start font-normal outline-none cursor-default',
    inset ? 'pl-8' : 'px-2',
    className,
  )
</script>

<DropdownMenuPrimitive.Item
  class={classes}
  {...$$restProps}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
  let:builder
>
  <slot {builder} {classes} />
</DropdownMenuPrimitive.Item>
