<script lang="ts">
  import { allDocumentations } from 'contentlayer/generated'
</script>

<div class="w-full">
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-xl py-8">
    <h1 class="mb-8 text-center text-2xl font-black">Contentlayer Example</h1>
    {#each allDocumentations as documentation}
      <div class="mb-8">
        <h2 class="mb-1 text-xl">
          <a href={documentation.url} class="text-blue-700 hover:text-blue-900 dark:text-blue-400">
            {documentation.title}
          </a>
        </h2>
        <time dateTime={documentation.date} class="mb-2 block text-xs text-gray-600">
          {documentation.date}
        </time>
      </div>
    {/each}
  </div>
</div>
