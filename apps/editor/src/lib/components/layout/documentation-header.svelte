<script lang="ts">
  import * as Sheet from '@taxonomy/ui/sheet/index.js'

  import MenuRoundedIcon from '~icons/material-symbols/menu-rounded'
  import { afterNavigate } from '$app/navigation'
  import Logo from '$lib/components/icons/logo.svelte'
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme/select.svelte'
  import ThemeToggle from '$lib/components/theme/toggle.svelte'
  import { messages } from '$lib/config/language'
  import { headerLinks } from '$lib/config/links/documentation-header'

  let open = false

  function closeDrawer() {
    open = false
  }

  afterNavigate(() => {
    closeDrawer()
  })
</script>

<!--
  The sheet root wraps the entire header so the trigger can be part of the nav,
  but the content is outside.

  This prevents layout shifts when the sheet content is part of the header.
-->
<Sheet.Root bind:open>
  <header class="flex justify-center border-b">
    <div class="navbar max-w-7xl gap-4">
      <div class="navbar-start gap-2 w-auto">
        <Sheet.Trigger class="block sm:hidden btn btn-sm btn-ghost">
          <MenuRoundedIcon class="h-6 w-6 text-primary" />
        </Sheet.Trigger>

        <a href="/" class="flex items-center gap-1">
          <Logo class="w-6 h-6 text-primary" />
          <span class="text-primary font-bold hidden sm:block">Taxonomy</span>
        </a>
      </div>

      <div class="navbar-center">
        <ul class="menu menu-horizontal hidden px-1 sm:flex gap-1">
          {#each headerLinks as { href, message } (href)}
            <li>
              <a {href}>{$messages(message)}</a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="navbar-end flex items-center gap-2 flex-1">
        <div class="join ring-1 ring-base-content">
          <div class="join-item lg:rounded-r-0">
            <ThemeToggle class="h-10 lg:rounded-r-none" />
          </div>

          <div class="divider divider-horizontal join-item m-0 w-0 hidden xl:flex" />

          <div class="join-item hidden sm:block">
            <ThemeSelect triggerClasses="min-w-32 ring-0 rounded-l-none" contentClasses="!w-56" />
          </div>
        </div>

        <LanguageSelect />
      </div>
    </div>
  </header>

  <Sheet.Content
    side="left"
    class="fixed z-50 gap-4 bg-base-100 p-6 shadow-lg inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm"
  >
    <div>
      <a href="/" class="flex items-center gap-1">
        <Logo class="w-6 h-6 text-primary" />
        <span class="text-primary font-bold">Taxonomy</span>
      </a>
    </div>

    <div class="p-2">
      <div class="join ring-1 ring-base-content">
        <div class="join-item rounded-r-0">
          <ThemeToggle class="rounded-r-none" />
        </div>

        <div class="divider divider-horizontal join-item m-0 w-0"></div>

        <div class="join-item">
          <ThemeSelect triggerClasses="min-w-32 ring-0 rounded-l-none" contentClasses="!w-56" />
        </div>
      </div>
    </div>
  </Sheet.Content>
</Sheet.Root>
