<script lang="ts">
  import Logo from '$lib/components/icons/logo.svelte'
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme/select.svelte'
  import ThemeToggle from '$lib/components/theme/toggle.svelte'
  import { messages } from '$lib/config/language'
</script>

<footer class="p-4 bg-base-200">
  <div class="footer w-full max-w-7xl mx-auto justify-between items-center">
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

    <div class="p-2 flex justify-center w-full flex-wrap">
      <div class="join ring-1 ring-base-content">
        <div class="join-item rounded-r-0">
          <ThemeToggle class="rounded-r-none" />
        </div>

        <div class="divider divider-horizontal join-item m-0 w-0" />

        <div class="join-item">
          <ThemeSelect triggerClasses="min-w-32 ring-0 rounded-l-none" contentClasses="!w-56" />
        </div>
      </div>

      <LanguageSelect />
    </div>
  </div>
</footer>
