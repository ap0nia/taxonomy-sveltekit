<script lang="ts">
  // Imports itself so it can create a tree component recursively.
  import Tree from '$lib/components/mdx/table-of-contents.svelte'
  import type { TableOfContents } from '$lib/utils/markdown-table-of-contents'

  export let tableOfContents: TableOfContents

  export let activeItem = ''

  export let level = 1
</script>

{#if tableOfContents.items?.length && level < 3}
  <ul class="m-0 list-none" class:pl-4={level !== 1}>
    {#each tableOfContents.items as item}
      <li class="mt-0 pt-2">
        <a
          href={item.url}
          class="inline-block no-underline {item.url === `#${activeItem}`
            ? 'font-medium text-primary'
            : 'text-sm text-muted-foreground'}"
        >
          {item.title}
        </a>
        {#if item.items?.length}
          <Tree tableOfContents={item} level={level + 1} {activeItem} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
