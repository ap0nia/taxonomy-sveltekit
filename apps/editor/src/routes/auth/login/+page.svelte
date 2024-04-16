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
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-bold">Login</h1>
    <p class="text-balance opacity-80">Enter your email below to login to your account</p>
  </div>

  {#if error}
    <div role="alert" class="alert alert-error">
      <button on:click={closeError} class="btn btn-xs btn-circle">
        <CloseIcon />
      </button>
      <span>{error}</span>
    </div>
  {/if}

  <div class="w-full space-y-4">
    <form
      on:submit={handleSubmit}
      action="/auth/login/credentials"
      method="POST"
      class="flex flex-col gap-4"
    >
      <label class="space-y-2">
        <p>Email</p>
        <input name="username" type="text" required class="input input-bordered w-full" />
      </label>

      <label class="space-y-2">
        <div class="flex items-center justify-between">
          <p>Password</p>
          <a href="/auth/forgot" class="link link-hover text-sm">Forgot your password?</a>
        </div>
        <input name="password" type="password" required class="input input-bordered w-full" />
      </label>

      <button type="submit" class="btn btn-primary w-full">
        <span class:loading>Login</span>
      </button>
    </form>

    <div class="divider my-0"></div>

    <div class="space-y-2">
      <a href="/auth/login/github" class="btn w-full bg-slate-50 hover:bg-slate-300">
        <GitHubIcon class="w-6 h-6" />
        <span class="text-slate-900">Login with GitHub</span>
      </a>
      <a href="/auth/login/google" class="btn w-full bg-slate-50 hover:bg-slate-300">
        <GoogleIcon class="w-6 h-6" />
        <span class="text-slate-900">Login with Google</span>
      </a>
    </div>
  </div>

  <div class="mt-4 text-center text-sm">
    Don&apos;t have an account?
    <a href="/auth/sign-up" class="link link-hover">Sign up</a>
  </div>
</main>
