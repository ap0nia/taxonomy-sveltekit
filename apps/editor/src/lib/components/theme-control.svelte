<script lang="ts">
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggleButton from '$lib/components/theme-toggle-button.svelte'
</script>

<!--
@component

A theme control that can toggle between light/dark mode,
or select a specific named theme.
-->

<div class="join ring-1 ring-base-content">
  <div class="join-item rounded-r-0">
    <ThemeToggleButton class="rounded-r-none" />
  </div>

  <div class="divider divider-horizontal join-item m-0 w-0"></div>

  <div class="join-item">
    <ThemeSelect triggerClasses="ring-0 rounded-l-none" />
  </div>
</div>
