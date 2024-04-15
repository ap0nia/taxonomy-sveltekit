<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui'
  import { fly } from 'svelte/transition'

  import CloseIcon from '~icons/mdi/close'
  import { cn } from '$lib/utils/cn'

  import { SheetOverlay, SheetPortal, sheetTransitions, sheetVariants, type Side } from '.'

  type $$Props = SheetPrimitive.ContentProps & {
    side?: Side
  }

  let className: $$Props['class'] = undefined

  export let side: $$Props['side'] = 'right'

  export { className as class }

  export let inTransition: $$Props['inTransition'] = fly

  export let inTransitionConfig: $$Props['inTransitionConfig'] =
    sheetTransitions[side ?? 'right'].in

  export let outTransition: $$Props['outTransition'] = fly

  export let outTransitionConfig: $$Props['outTransitionConfig'] =
    sheetTransitions[side ?? 'right'].out
</script>

<SheetPortal>
  <SheetOverlay />
  <SheetPrimitive.Content
    {inTransition}
    {inTransitionConfig}
    {outTransition}
    {outTransitionConfig}
    class={cn(sheetVariants({ side }), className)}
    {...$$restProps}
  >
    <slot />
    <SheetPrimitive.Close class={cn('absolute right-4 top-4', 'btn btn-xs')}>
      <CloseIcon class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </SheetPrimitive.Close>
  </SheetPrimitive.Content>
</SheetPortal>
