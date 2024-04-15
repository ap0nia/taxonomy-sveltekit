<script lang="ts">
  import { mode, toggleMode } from 'mode-watcher'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  import MoonIcon from '~icons/radix-icons/moon'
  import SunIcon from '~icons/radix-icons/sun'
  import { setThemeFromMode, theme } from '$lib/config/themes'
  import { cn } from '$lib/utils/cn'

  interface $$Props extends HTMLButtonAttributes {}

  let className: $$Props['class'] = ''

  export { className as class }

  /**
   * Manually update the data-theme and theme store when this button is clicked.
   */
  function handleModeToggle() {
    toggleMode()

    setThemeFromMode($mode)

    if ($mode) {
      theme.set({ label: $mode, value: $mode })
    }
  }
</script>

<!--
@component

A button that toggle's mode-watcher's mode and updates the theme accordingly.
-->

<!--
$mode is undefined on the server,
so use the `dark:swap-active` class to allow SSR to render the correct icon.

After the page renders and $mode is defined,
remove the dark:swap-active class so the toggle animation works.
-->
<button
  on:click={handleModeToggle}
  class={cn('btn btn-sm btn-ghost swap swap-rotate h-full', className)}
  class:dark:swap-active={$mode == null}
  {...$$restProps}
>
  <!--
  Don't render a checkbox when $mode is undefined,
  otherwise a wrong initial state may be rendered.
  -->
  {#if $mode != null}
    <input type="checkbox" checked={$mode !== 'light'} class="absolute" />
  {/if}
  <SunIcon class="swap-on text-base-content" />
  <MoonIcon class="swap-off text-base-content" />
  <span class="sr-only">Toggle theme</span>
</button>
