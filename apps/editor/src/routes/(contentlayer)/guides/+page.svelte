<script lang="ts">
  import { allGuides } from 'contentlayer/generated'

  import { dayjs } from '$lib/dayjs'

  const guides = allGuides
    .filter((guide) => guide.published)
    .sort((a, b) => {
      return dayjs(a.date).isBefore(b.date) ? -1 : 1
    })
</script>

<div class="container max-w-4xl py-6 lg:py-10 mx-auto">
  <div class="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
    <div class="flex-1 space-y-4">
      <h1 class="inline-block font-heading text-4xl tracking-tight lg:text-5xl">Guides</h1>
      <p class="text-xl text-muted-foreground">
        This section includes end-to-end guides for developing Next.js 13 apps.
      </p>
    </div>
  </div>
  <hr class="my-8" />

  {#if guides.length}
    <div class="grid gap-10 sm:grid-cols-2">
      {#each guides as guide (guide._id)}
        <article
          class="card card-bordered border-base-content group relative p-6 flex flex-col space-y-2"
        >
          <h2 class="text-2xl font-extrabold">{guide.title}</h2>

          {#if guide.description}
            <p class="text-muted-foreground">{guide.description}</p>
          {/if}

          {#if guide.date}
            <p class="text-sm text-muted-foreground">
              {dayjs(guide.date).format('LL')}
            </p>
          {/if}

          <a href={guide.url} class="absolute inset-0">
            <span class="sr-only">View Article</span>
          </a>
        </article>
      {/each}
    </div>
  {:else}
    <p>No guides published.</p>
  {/if}
</div>
