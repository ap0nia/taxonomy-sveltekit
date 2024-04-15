<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils/cn'

  type $$Props = SelectPrimitive.SeparatorProps

  let className: $$Props['class'] = undefined

  export { className as class }
</script>

<SelectPrimitive.Separator class={cn('-mx-1 my-1 h-px bg-base-200', className)} {...$$restProps} />
