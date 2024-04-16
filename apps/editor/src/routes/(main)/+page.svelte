<script lang="ts">
  import AuthIcon from '~icons/simple-icons/auth0'
  import NextjsIcon from '~icons/simple-icons/nextdotjs'
  import PlanetScaleIcon from '~icons/simple-icons/planetscale'
  import ReactIcon from '~icons/simple-icons/react'
  import StripeIcon from '~icons/simple-icons/stripe'
  import TailwindIcon from '~icons/simple-icons/tailwindcss'
  import { messages } from '$lib/config/language'
  import { socials } from '$lib/config/site'
</script>

<div class="w-full my-8">
  <!-- Hero -->
  <section class="hero py-8 md:py-12 lg:py-32">
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
            class="btn btn-outline lg:btn-wide">{$messages('view_code')}</a
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="max-w-4xl mx-auto px-4 py-12 space-y-8">
    <div class="max-w-3xl mx-auto">
      <h2 class="font-heading text-center text-3xl sm:text-3xl md:text-6xl">
        {$messages('features')}
      </h2>
      <p class="text-lg text-center">
        {$messages('about_this_project')}
      </p>
    </div>

    <div class="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div class="card border">
        <div class="card-body">
          <NextjsIcon class="w-12 h-12 fill-current" />
          <h2 class="font-bold">Next.js 13</h2>
          <p class="text-sm">{$messages('next_13')}</p>
        </div>
      </div>
      <div class="card border">
        <div class="card-body">
          <ReactIcon class="w-12 h-12 fill-red-400" />
          <h2 class="font-bold">React 18</h2>
          <p class="text-sm">{$messages('react_18')}</p>
        </div>
      </div>
      <div class="card border">
        <div class="card-body">
          <PlanetScaleIcon class="w-12 h-12 fill-current" />
          <h2 class="font-bold">{$messages('database_label')}</h2>
          <p class="text-sm">{$messages('database')}</p>
        </div>
      </div>
      <div class="card border">
        <div class="card-body">
          <TailwindIcon class="w-12 h-12 fill-current" />
          <h2 class="font-bold">{$messages('components_label')}</h2>
          <p class="text-sm">{$messages('ui_components')}</p>
        </div>
      </div>
      <div class="card border">
        <div class="card-body">
          <AuthIcon class="w-12 h-12 fill-current" />
          <h2 class="font-bold">{$messages('authentication_label')}</h2>
          <p class="text-sm">{$messages('authentication')}</p>
        </div>
      </div>
      <div class="card border">
        <div class="card-body">
          <StripeIcon class="w-12 h-12 fill-current" />
          <h2 class="font-bold">{$messages('subscriptions_label')}</h2>
          <p class="text-sm">{$messages('subscriptions')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Proudly open source -->
  <section
    id="open-source"
    class="container mx-auto px-4 py-8 md:py-12 lg:py-24 text-center space-y-4"
  >
    <h2 class="font-heading text-3xl sm:text-3xl md:text-6xl">
      {$messages('proudly_open_source')}
    </h2>
    <p class="sm:text-lg">
      <span>{$messages('is_open_source')}</span>
      <br />
      <span>{$messages('code_is_available_on')} </span>
      <a href={socials.github.url} target="_blank" rel="noreferrer" class="link"> GitHub </a>
      <span>.</span>
    </p>
  </section>
</div>
