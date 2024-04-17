<script lang="ts">
  import DocumentationSidebarNavItems from '$lib/components/layout/documentation-sidebar-nav-items.svelte'
  import type { SidebarNavItem } from '$lib/config/documentation'

  export let items: SidebarNavItem[] = []
</script>

{#each items as item}
  <div class="pb-8">
    <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-medium">
      {item.title}
    </h4>
    {#if item.items}
      <DocumentationSidebarNavItems items={item.items} />
    {/if}
  </div>
{/each}
