<script lang="ts">
  import ChevronLeftIcon from '~icons/mdi/chevron-left'
  import { dayjs } from '$lib/dayjs'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<main class="w-full">
  <article class="prose relative mx-auto px-4 py-8">
    <a href="/blog" class="btn btn-ghost absolute -left-52 top-14 hidden xl:inline-flex">
      <ChevronLeftIcon class="mr-2 h-4 w-4" />
      <span>See all posts</span>
    </a>

    <div class="space-y-4">
      <div class="space-y-2">
        {#if data.blog.date}
          <time dateTime={data.blog.date} class="block text-sm">
            Published on {dayjs(data.blog.date).format('LL')}
          </time>
        {/if}

        {#if data.blog.title}
          <h1 class="font-heading text-4xl lg:text-5xl">
            {data.blog.title}
          </h1>
        {/if}
      </div>

      {#if data.blog.image}
        <img
          src={data.blog.image}
          alt={data.blog.title}
          width={720}
          height={405}
          class="my-8 rounded-md border transition-colors"
        />
      {/if}
    </div>

    <svelte:component this={data.component} />

    <div class="divider"></div>

    <div class="flex justify-center my-8">
      <a href="/blog" class="btn btn-ghost">
        <ChevronLeftIcon class="mr-2 h-4 w-4" />
        <span>See all posts</span>
      </a>
    </div>
  </article>
</main>
