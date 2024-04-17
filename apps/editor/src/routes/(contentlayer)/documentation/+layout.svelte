<script lang="ts">
  import Footer from '$lib/components/layout/documentation-footer.svelte'
  import Header from '$lib/components/layout/documentation-header.svelte'
  import DocumentationSidebarNav from '$lib/components/layout/documentation-sidebar-nav.svelte'
  import { docsConfig } from '$lib/config/documentation'
</script>

<div class="flex flex-col min-h-screen">
  <Header />

  <div class="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
    <aside
      class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10"
    >
      <DocumentationSidebarNav items={docsConfig.sidebarNav} />
    </aside>
    <slot />
  </div>

  <Footer />
</div>
