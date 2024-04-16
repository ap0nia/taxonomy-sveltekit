<script lang="ts">
  import Logo from '$lib/components/icons/logo.svelte'
  import { messages } from '$lib/config/language'
</script>

<footer class="footer items-center p-4 bg-base-200">
  <aside class="flex items-center">
    <Logo class="w-6 h-6" />
    <p>
      <span>{$messages('built_by')}</span>
      <a href="/" target="_blank" rel="noreferrer" class="link font-medium"> shadcn</a>
      <span>. {$messages('hosted_on')}</span>
      <a href="/" target="_blank" rel="noreferrer" class="link font-medium"> Vercel</a>
      <span>. {$messages('illustrations_by')}</span>
      <a href="/" target="_blank" rel="noreferrer" class="link font-medium"> Popsy</a>
      <span>. {$messages('source_code_available')}</span>
      <a href="/" target="_blank" rel="noreferrer" class="link font-medium"> GitHub</a>
      <span>.</span>
    </p>
  </aside>
</footer>
