<script lang="ts">
  import GitHubIcon from '~icons/logos/github-icon'
  import GoogleIcon from '~icons/logos/google-icon'
  import CloseIcon from '~icons/mdi/close'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  let loading = false

  function handleSubmit() {
    loading = true
  }

  async function closeError() {
    await goto('/auth/login', { keepFocus: true })
  }

  $: error = $page.url.searchParams.get('error')
</script>

<main class="max-w-lg mx-auto p-8 grow flex flex-col items-center justify-center gap-2">
  <div class="space-y-2">
    <h1 class="text-3xl font-bold">Sign Up</h1>
    <p class="text-balance opacity-80">Enter your email below to sign up for an account</p>
  </div>

  {#if error}
    <div role="alert" class="alert alert-error">
      <button
        on:click={closeError}
        class="btn btn-xs btn-ghost btn-circle btn-outline btn-error-content"
      >
        <CloseIcon />
      </button>
      <span>{error}</span>
    </div>
  {/if}

  <div class="w-full space-y-4">
    <form
      on:submit={handleSubmit}
      action="/auth/sign-up/credentials"
      method="POST"
      class="flex flex-col gap-4"
    >
      <label class="grid gap-2">
        <p>Email</p>
        <input required name="username" type="text" class="input input-bordered" />
      </label>

      <label class="grid gap-2">
        <p>Password</p>
        <input required name="password" type="password" class="input input-bordered" />
      </label>

      <button type="submit" class="btn btn-primary w-full">
        <span class:loading>Sign Up</span>
      </button>
    </form>

    <div class="divider my-0"></div>

    <div class="space-y-2">
      <a href="/auth/login/github" class="btn w-full bg-slate-50 hover:bg-slate-300">
        <GitHubIcon class="w-6 h-6" />
        <span class="text-slate-900">Sign Up with GitHub</span>
      </a>
      <a href="/auth/login/google" class="btn w-full bg-slate-50 hover:bg-slate-300">
        <GoogleIcon class="w-6 h-6" />
        <span class="text-slate-900">Sign Up with Google</span>
      </a>
    </div>
  </div>

  <div class="mt-4 text-center text-sm">
    Already have an account?
    <a href="/auth/login" class="link link-hover">Login</a>
  </div>
</main>
