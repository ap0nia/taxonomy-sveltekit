<script lang="ts">
  import Select from './select.svelte'
  import Toggle from './toggle.svelte'
</script>

<!--
@component

A theme control that can toggle between light/dark mode,
or select a specific named theme.
-->

<div class="join ring-1 ring-base-content">
  <div class="join-item rounded-r-0">
    <Toggle class="rounded-r-none" />
  </div>

  <div class="divider divider-horizontal join-item m-0 w-0"></div>

  <div class="join-item">
    <Select triggerClasses="min-w-32 ring-0 rounded-l-none" contentClasses="!w-56" />
  </div>
</div>
