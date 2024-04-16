<script lang="ts">
  import CheckIcon from '~icons/mdi/check'
</script>

<main class="container md:max-w-5xl px-4 py-12 lg:py-24 mx-auto space-y-4">
  <div class="space-y-2">
    <h2 class="font-heading text-3xl md:text-6xl">Simple, transparent pricing</h2>
    <p class="sm:text-lg">Unlock all features including unlimited posts for your blog.</p>
  </div>

  <div class="w-full p-10 grid md:grid-cols-[1fr_200px] items-start gap-10 rounded-lg border">
    <div class="grid gap-6">
      <h3 class="font-bold text-xl sm:text-2xl">What&apos;s included in the PRO plan</h3>

      <ul class="grid gap-3 text-sm sm:grid-cols-2">
        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>Unlimited Posts</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>Unlimited Users</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>Custom domain</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>Dashboard Analytics</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>Access to Discord</span>
        </li>

        <li class="flex items-center">
          <CheckIcon class="mr-2 h-4 w-4" />
          <span>Premium Support</span>
        </li>
      </ul>
    </div>

    <div class="flex flex-col gap-4 text-center">
      <div>
        <h4 class="text-7xl font-bold">$19</h4>
        <p class="text-sm font-medium">Billed Monthly</p>
      </div>
      <a href="/auth/login" class="btn btn-primary">Get Started</a>
    </div>
  </div>

  <div class="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
    <p class="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
      Taxonomy is a demo app.{' '}
      <strong>You can test the upgrade and won&apos;t be charged.</strong>
    </p>
  </div>
</main>
