<script lang="ts">
  import { allBlogs } from 'contentlayer/generated'

  import { dayjs } from '$lib/dayjs'

  const blogs = allBlogs
    .filter((post) => post.published)
    .sort((a, b) => {
      return dayjs(a.date).isBefore(b.date) ? -1 : 1
    })
</script>

<div class="container max-w-4xl py-6 lg:py-10 mx-auto">
  <div class="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
    <div class="flex-1 space-y-4">
      <h1 class="inline-block font-heading text-4xl tracking-tight lg:text-5xl">Blog</h1>
      <p class="text-xl text-muted-foreground">
        A blog built using Contentlayer. Posts are written in MDX.
      </p>
    </div>
  </div>
  <hr class="my-8" />

  {#if blogs.length}
    <div class="grid gap-10 sm:grid-cols-2">
      {#each blogs as post (post._id)}
        <article class="group relative flex flex-col space-y-2">
          {#if post.image}
            <img
              src={post.image}
              alt={post.title}
              width={804}
              height={452}
              class="rounded-md border bg-muted transition-colors"
            />
          {/if}

          <h2 class="text-2xl font-extrabold">{post.title}</h2>

          {#if post.description}
            <p class="text-muted-foreground">{post.description}</p>
          {/if}

          {#if post.date}
            <p class="text-sm text-muted-foreground">
              {dayjs(post.date).format('LL')}
            </p>
          {/if}

          <a href={post.url} class="absolute inset-0">
            <span class="sr-only">View Article</span>
          </a>
        </article>
      {/each}
    </div>
  {:else}
    <p>No posts published.</p>
  {/if}
</div>
