<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="mb-8">
  <h2 class="mb-1 text-xl">
    <a href={data.documentation.url} class="text-blue-700 hover:text-blue-900 dark:text-blue-400">
      {data.documentation.title}
    </a>
  </h2>
  <time dateTime={data.documentation.date} class="mb-2 block text-xs text-gray-600">
    {data.documentation.date}
  </time>
  <div class="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.documentation.body.html}
  </div>
</div>
