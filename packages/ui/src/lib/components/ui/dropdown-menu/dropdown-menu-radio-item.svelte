<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'

  import CircleIcon from '~icons/mdi/circle'
  import { cn } from '$lib/utils/cn'

  type $$Props = DropdownMenuPrimitive.RadioItemProps
  type $$Events = DropdownMenuPrimitive.RadioItemEvents

  let className: $$Props['class'] = undefined

  export let value: $$Props['value']

  export { className as class }

  let element: HTMLDivElement

  // Melt-UI appends a disabled="false" attribute that confuses Daisy-UI into thinking the element is disabled.
  $: if (element) {
    const disabled = element.getAttribute('disabled')
    if (disabled === 'false') {
      element.removeAttribute('disabled')
    }
  }
</script>

<DropdownMenuPrimitive.RadioItem
  {value}
  {...$$restProps}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
  asChild
  let:builder
>
  <div
    bind:this={element}
    use:builder.action
    {...{ ...$$restProps, ...builder }}
    class={cn(
      'btn btn-sm btn-ghost no-animation',
      'data-[disabled]:btn-disabled data-[highlighted]:btn-active',
      'relative pl-8 flex justify-start outline-none cursor-default font-normal',
      className,
    )}
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.RadioIndicator>
        <CircleIcon class="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.RadioIndicator>
    </span>
    <slot />
  </div>
</DropdownMenuPrimitive.RadioItem>
