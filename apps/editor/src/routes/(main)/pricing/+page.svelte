<script lang="ts">
  import CheckIcon from '~icons/mdi/check'
  import { messages } from '$lib/config/language'
</script>

<main class="container md:max-w-5xl px-4 py-12 lg:py-24 mx-auto space-y-4">
  <div class="space-y-2">
    <h2 class="font-heading text-3xl md:text-6xl">{$messages('simple_pricing')}</h2>
    <p class="sm:text-lg">{$messages('unlock_all_features')}.</p>
  </div>

  <div class="w-full p-10 grid md:grid-cols-[1fr_200px] items-start gap-10 rounded-lg border">
    <div class="grid gap-6">
      <h3 class="font-bold text-xl sm:text-2xl">{$messages('whats_included_pro')}</h3>

      <ul class="grid gap-3 text-sm sm:grid-cols-2">
        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>{$messages('unlimited_posts')}</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>{$messages('unlimited_users')}</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>{$messages('custom_domain')}</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>{$messages('dashboard_analytics')}</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>{$messages('access_discord')}</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>{$messages('premium_support')}</span>
        </li>
      </ul>
    </div>

    <div class="flex flex-col gap-4 text-center">
      <div>
        <h4 class="text-7xl font-bold">$19</h4>
        <p class="text-sm font-medium">{$messages('billed_monthly')}</p>
      </div>
      <a href="/auth/login" class="btn btn-primary">{$messages('get_started')}</a>
    </div>
  </div>

  <div class="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
    <p class="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
      <span>{$messages('is_demo_app')}.</span>
      <strong>{$messages('you_can_test')}.</strong>
    </p>
  </div>
</main>
