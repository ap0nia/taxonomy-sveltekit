<script lang="ts">
  import ArrowBackIcon from '~icons/mdi/arrow-back'
</script>

<div class="w-full min-h-screen flex lg:grid lg:grid-cols-2">
  <div class="absolute top-0 left-0 p-4">
    <a href="/" class="btn">
      <ArrowBackIcon class="w-6 h-6" />
      <span>Back</span>
    </a>
  </div>

  <slot />

  <div class="hidden bg-base-200 lg:block"></div>
</div>
