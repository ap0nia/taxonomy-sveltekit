<script lang="ts">
  import Footer from '$lib/components/layout/documentation-footer.svelte'
  import Header from '$lib/components/layout/documentation-header.svelte'
</script>

<div class="flex flex-col min-h-screen">
  <Header />

  <div class="container mx-auto flex-1">
    <slot />
  </div>

  <Footer />
</div>
