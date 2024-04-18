<script lang="ts">
  import ChevronLeftIcon from '~icons/mdi/chevron-left'
  import TableOfContents from '$lib/components/mdx/table-of-contents.svelte'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<main class="w-full">
  <article class="prose relative mx-auto px-4 py-8">
    <a href="/guides" class="btn btn-ghost absolute -left-52 top-14 hidden xl:inline-flex">
      <ChevronLeftIcon class="mr-2 h-4 w-4" />
      <span>See all guides</span>
    </a>

    <div class="space-y-4">
      <h1>
        {data.guide.title}
      </h1>

      {#if data.guide.description}
        <p>{data.guide.description}</p>
      {/if}
    </div>

    <svelte:component this={data.component} />

    <hr class="my-4" />

    <svelte:component this={data.component} />

    <hr class="my-4 md:my-6" />

    <div class="hidden text-sm xl:block">
      <div class="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
        <TableOfContents tableOfContents={data.tableOfContents} />
      </div>
    </div>

    <div class="flex justify-center my-8">
      <a href="/guides" class="btn btn-ghost">
        <ChevronLeftIcon class="mr-2 h-4 w-4" />
        <span>See all guides</span>
      </a>
    </div>
  </article>
</main>
