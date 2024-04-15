<script lang="ts">
  import ThemeControl from '$lib/components/theme-control.svelte'
  import ThemeWatcher from '$lib/components/theme-watcher.svelte'
</script>

<ThemeWatcher />

<div class="p-8">
  <ThemeControl />
</div>

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
