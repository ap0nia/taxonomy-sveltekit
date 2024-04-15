<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'

  import ChevronRightIcon from '~icons/mdi/chevron-right'
  import { cn } from '$lib/utils/cn'

  type $$Props = DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean
  }
  type $$Events = DropdownMenuPrimitive.SubTriggerEvents

  let className: $$Props['class'] = undefined

  export let inset: $$Props['inset'] = undefined

  export { className as class }
</script>

<DropdownMenuPrimitive.SubTrigger
  class={cn(
    'btn btn-sm btn-ghost no-animation',
    'data-[disabled]:btn-disabled data-[highlighted]:btn-active data-[state=open]:btn-active',
    'flex justify-start font-normal outline-none cursor-default',
    inset ? 'pl-8' : 'px-2',
    className,
  )}
  {...$$restProps}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerleave
  on:pointermove
>
  <slot />
  <ChevronRightIcon class="ml-auto h-4 w-4" />
</DropdownMenuPrimitive.SubTrigger>
