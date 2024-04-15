<script lang="ts">
  import * as Select from '@taxonomy/ui/select/index.js'
  import { Select as SelectPrimitive } from 'bits-ui'

  import CheckIcon from '~icons/mdi/check'
  import { theme, themes } from '$lib/config/themes'
  import { cn } from '$lib/utils/cn'

  export let triggerClasses = ''

  export let contentClasses = ''
</script>

<!--
@component

A select menu that can dynamically change the website's theme.
-->

<Select.Root bind:selected={$theme}>
  <Select.Trigger class={triggerClasses}>
    <Select.Value placeholder="Select a theme" />
  </Select.Trigger>

  <Select.Content class={cn('max-h-80 p-2 overflow-y-auto', contentClasses)}>
    <Select.Group>
      {#each Object.keys(themes) as theme}
        <Select.Item value={theme} asChild let:builder>
          <button
            {...builder}
            use:builder.action
            data-set-theme={theme}
            data-act-class="[&_svg]:visible"
            class="outline-base-content text-start outline-offset-4 w-full my-1"
          >
            <span
              data-theme={theme}
              class="border bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
            >
              <span class="grid grid-cols-5 grid-rows-3">
                <span class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                  <SelectPrimitive.ItemIndicator>
                    <CheckIcon />
                  </SelectPrimitive.ItemIndicator>

                  <span class="flex-grow text-sm">
                    {theme}
                  </span>

                  <span class="flex h-full shrink-0 flex-wrap gap-1">
                    <span class="bg-primary rounded-badge w-2" />
                    <span class="bg-secondary rounded-badge w-2" />
                    <span class="bg-accent rounded-badge w-2" />
                    <span class="bg-neutral rounded-badge w-2" />
                  </span>
                </span>
              </span>
            </span>
          </button>
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
