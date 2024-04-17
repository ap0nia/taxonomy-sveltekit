<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<main class="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
  <div class="w-full min-w-0 max-w-full mx-auto prose">
    <div class="space-y-4">
      <h1>
        {data.documentation.title}
      </h1>

      {#if data.documentation.description}
        <p>{data.documentation.description}</p>
      {/if}
    </div>

    <hr class="my-4" />
    <svelte:component this={data.component} />
    <hr class="my-4 md:my-6" />

    <!--
    <DocsPager {doc} />
    -->
  </div>
  <div class="hidden text-sm xl:block">
    <div class="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
      <!--
      <DashboardTableOfContents {toc} />
      -->
    </div>
  </div>
</main>
