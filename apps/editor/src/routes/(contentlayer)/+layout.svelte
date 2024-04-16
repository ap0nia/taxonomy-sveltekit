<script lang="ts">
  import Header from '$lib/components/layout/contentlayer-header.svelte'
</script>

<div class="flex flex-col min-h-screen">
  <Header />

  <div class="flex flex-1">
    <slot />
  </div>

  <!--
  <Footer />
    -->
</div>
