<script lang="ts">
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'

  onMount(() => {
    themeChange(false)
  })

  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ]
</script>

{#each themes as theme}
  <button
    class="outline-base-content text-start outline-offset-4"
    data-set-theme={theme}
    data-act-class="[&_svg]:visible"
  >
    <span
      data-theme={theme}
      class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
    >
      <span class="grid grid-cols-5 grid-rows-3">
        <span class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="invisible h-3 w-3 shrink-0"
          >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
          <span class="flex-grow text-sm">
            {theme}
          </span>
          <span class="flex h-full shrink-0 flex-wrap gap-1">
            <span class="bg-primary rounded-badge w-2" />
            <span class="bg-secondary rounded-badge w-2" />
            <span class="bg-accent rounded-badge w-2" />
            <span class="bg-neutral rounded-badge w-2" />
          </span>
        </span>
      </span>
    </span>
  </button>
{/each}

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
