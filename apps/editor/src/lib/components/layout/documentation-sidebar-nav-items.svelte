<script lang="ts">
  import { page } from '$app/stores'
  import type { SidebarNavItem } from '$lib/config/documentation'

  export let items: SidebarNavItem[] = []
</script>

<div class="grid grid-flow-row auto-rows-max text-sm">
  {#each items as item}
    {#if !item.disabled && item.href}
      <a
        href={item.href}
        class="flex w-full items-center rounded-md p-2 hover:underline"
        class:bg-muted={$page.url.pathname === item.href}
        target={item.external ? '_blank' : ''}
        rel={item.external ? 'noreferrer' : ''}
      >
        {item.title}
      </a>
    {:else}
      <span class="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
        {item.title}
      </span>
    {/if}
  {/each}
</div>
