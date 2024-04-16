<script lang="ts">
  import * as Avatar from '@taxonomy/ui/avatar/index.js'
  import * as DropdownMenu from '@taxonomy/ui/dropdown-menu/index.js'
  import * as Sheet from '@taxonomy/ui/sheet/index.js'

  import MenuRoundedIcon from '~icons/material-symbols/menu-rounded'
  import AccountCircleIcon from '~icons/mdi/account-circle'
  import LogoutIcon from '~icons/mdi/logout'
  import UserIcon from '~icons/mdi/user'
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import Logo from '$lib/components/icons/logo.svelte'
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme/select.svelte'
  import ThemeToggle from '$lib/components/theme/toggle.svelte'
  import { messages } from '$lib/config/language'
  import { headerLinks } from '$lib/config/links/header'

  let open = false

  function closeDrawer() {
    open = false
  }

  afterNavigate(() => {
    closeDrawer()
  })

  $: user = $page.data.user
</script>

<!--
  The sheet root wraps the entire header so the trigger can be part of the nav,
  but the content is outside.

  This prevents layout shifts when the sheet content is part of the header.
-->
<Sheet.Root bind:open>
  <header class="flex justify-center border-b">
    <div class="navbar max-w-7xl justify-between gap-4">
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
        <ul class="menu menu-horizontal hidden px-1 md:flex">
          {#each headerLinks as { href, message } (href)}
            <li>
              <a {href}>{$messages(message)}</a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="navbar-end flex items-center gap-2">
        <div class="p-2">
          <div class="join ring-1 ring-base-content">
            <div class="join-item lg:rounded-r-0">
              <ThemeToggle class="lg:rounded-r-none" />
            </div>

            <div class="divider divider-horizontal join-item m-0 w-0 hidden lg:flex" />

            <div class="join-item hidden lg:block">
              <ThemeSelect triggerClasses="min-w-32 ring-0 rounded-l-none" contentClasses="!w-56" />
            </div>
          </div>
        </div>

        <LanguageSelect />

        {#if user}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <button use:builder.action {...builder} class="btn btn-ghost btn-circle">
                <Avatar.Root>
                  <!-- referrerpolicy need to load images from Google -->
                  <!-- @see https://stackoverflow.com/a/61042200 -->
                  <Avatar.Image src={user.avatar} alt="profile" referrerpolicy="no-referrer" />
                  <Avatar.Fallback>
                    <AccountCircleIcon class="w-8 h-8" />
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content class="w-40" align="end">
              <DropdownMenu.Label class="truncate">
                {user.name}
              </DropdownMenu.Label>

              <DropdownMenu.Separator />

              <DropdownMenu.Group>
                <DropdownMenu.Item href="/dashboard">
                  <UserIcon />
                  <span>Profile</span>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild let:builder let:classes>
                  <form action="/auth/logout" method="POST" class="w-full">
                    <button type="submit" use:builder.action {...builder} class="{classes} w-full">
                      <LogoutIcon />
                      <span>Logout</span>
                    </button>
                  </form>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {:else}
          <a href="/auth/login" class="btn btn-primary btn-sm">{$messages('login')}</a>
          <a href="/auth/sign-up" class="btn btn-secondary btn-sm">{$messages('sign_up')}</a>
        {/if}
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

    <div class="divider" />

    <ul class="menu">
      {#each headerLinks as { href, label } (href)}
        <li>
          <a {href}>{label}</a>
        </li>
      {/each}
    </ul>

    <div class="divider" />

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
