<script lang="ts">
  // import Footer from '$lib/components/layout/footer.svelte'
  import Header from '$lib/components/layout/header.svelte'
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
