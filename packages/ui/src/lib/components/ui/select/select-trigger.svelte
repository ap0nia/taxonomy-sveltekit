<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui'
  import ChevronDown from 'lucide-svelte/icons/chevron-down'
  import { cn } from '$lib/utils/cn'

  type $$Props = SelectPrimitive.TriggerProps
  type $$Events = SelectPrimitive.TriggerEvents

  let className: $$Props['class'] = undefined

  export { className as class }
</script>

<SelectPrimitive.Trigger
  class={cn(
    'btn btn-sm btn-ghost border no-animation',
    'h-10 flex items-center justify-between',
    'ring-1 ring-base-content focus:ring focus:ring-offset-2',
    'data-[disabled]:btn-disabled data-[highlighted]:btn-active data-[state=open]:btn-active',
    className,
  )}
  {...$$restProps}
  let:builder
  on:click
  on:keydown
>
  <slot {builder} />
  <div>
    <ChevronDown class="h-4 w-4 opacity-50" />
  </div>
</SelectPrimitive.Trigger>
