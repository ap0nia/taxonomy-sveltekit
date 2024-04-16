<script lang="ts">
  import { messages } from '$lib/config/language'
  import { socials } from '$lib/config/site'
</script>

<div class="w-full my-8">
  <!-- Hero -->
  <section class="hero py-32">
    <div class="hero-content">
      <div class="max-w-5xl space-y-4 text-center">
        <a href={socials.twitter.url} target="_blank" class="badge badge-neutral badge-lg">
          {$messages('follow_on_twitter')}
        </a>

        <h1 class="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {$messages('description')}
        </h1>

        <p class="max-w-3xl mx-auto opacity-70 sm:text-xl leading-normal sm:leading-8">
          {$messages('mission')}
        </p>

        <div class="space-x-4">
          <a href="/auth/login" class="btn btn-primary lg:btn-wide">{$messages('get_started')}</a>
          <a
            href={socials.github.url}
            target="_blank"
            rel="noreferrer"
            class="btn btn-outline lg:btn-wide">GitHub</a
          >
        </div>
      </div>
    </div>
  </section>
</div>
