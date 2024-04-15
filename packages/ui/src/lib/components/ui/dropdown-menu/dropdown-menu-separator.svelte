<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui'

  import { cn } from '$lib/utils/cn'

  type $$Props = DropdownMenuPrimitive.SeparatorProps

  let className: $$Props['class'] = undefined

  export { className as class }
</script>

<DropdownMenuPrimitive.Separator class={cn('divider h-px my-1', className)} {...$$restProps} />
