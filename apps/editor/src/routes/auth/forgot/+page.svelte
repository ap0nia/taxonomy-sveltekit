<script lang="ts">
  import { fade } from 'svelte/transition'

  import CloseIcon from '~icons/mdi/close'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  let loading = false
  let message = ''

  async function closeError() {
    await goto('/auth/forgot', { keepFocus: true })
  }

  function closeMessage() {
    message = ''
  }

  $: error = $page.url.searchParams.get('error')
</script>

<main class="max-w-lg mx-auto p-8 grow flex flex-col items-center justify-center gap-2">
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-bold">Reset Email</h1>
    <p class="text-balance opacity-80">Enter your email to reset your password.</p>
  </div>

  {#if error}
    <div role="alert" class="alert alert-error">
      <button on:click={closeError} class="btn btn-xs btn-circle">
        <CloseIcon />
      </button>
      <span>{error}</span>
    </div>
  {/if}

  {#if message}
    <div role="alert" class="alert alert-info" transition:fade>
      <button on:click={closeMessage} class="btn btn-xs btn-circle">
        <CloseIcon />
      </button>
      <span>{message}</span>
    </div>
  {/if}

  <form class="w-full flex flex-col gap-4">
    <input required name="username" type="text" class="input input-bordered w-full" />

    <button type="submit" class="btn btn-primary w-full">
      <span class:loading>Submit</span>
    </button>
  </form>

  <a href="/auth/login" class="link link-hover text-sm text-center">Back to Login</a>
</main>
