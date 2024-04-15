<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'

  import CheckIcon from '~icons/mdi/check'
  import { cn } from '$lib/utils/cn'

  type $$Props = DropdownMenuPrimitive.CheckboxItemProps
  type $$Events = DropdownMenuPrimitive.CheckboxItemEvents

  let className: $$Props['class'] = undefined

  export let checked: $$Props['checked'] = undefined

  export { className as class }
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:checked
  class={cn(
    'btn btn-sm btn-ghost no-animation',
    'data-[disabled]:btn-disabled data-[highlighted]:btn-active',
    'relative pl-8 flex justify-start outline-none cursor-default font-normal',
    className,
  )}
  {...$$restProps}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <DropdownMenuPrimitive.CheckboxIndicator>
      <CheckIcon class="h-4 w-4" />
    </DropdownMenuPrimitive.CheckboxIndicator>
  </span>
  <slot />
</DropdownMenuPrimitive.CheckboxItem>
