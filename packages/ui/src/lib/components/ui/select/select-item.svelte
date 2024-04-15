<script lang="ts">
  import Check from 'lucide-svelte/icons/check'
  import { Select as SelectPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils/cn'

  type $$Props = SelectPrimitive.ItemProps
  type $$Events = SelectPrimitive.ItemEvents

  let className: $$Props['class'] = undefined

  export let value: $$Props['value']

  export let label: $$Props['label'] = undefined

  export let disabled: $$Props['disabled'] = undefined

  export { className as class }
</script>

<SelectPrimitive.Item
  {value}
  {disabled}
  {label}
  class={cn(
    'btn btn-sm btn-ghost no-animation',
    'relative flex justify-start pl-8',
    'font-normal outline-none cursor-default',
    'data-[disabled]:btn-disabled data-[highlighted]:btn-active',
    className,
  )}
  {...$$restProps}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerleave
  on:pointermove
  let:builder
>
  {#if !$$props['asChild']}
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check class="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
  {/if}

  <slot {builder}>
    {label || value}
  </slot>
</SelectPrimitive.Item>
