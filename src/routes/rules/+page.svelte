<script lang="ts">
  import MarkdownComponent from "$lib/components/MarkdownRenderer.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Rules | Datapack Hub</title>
  <meta name="description" content="Our site rules" />
</svelte:head>

<main
  id="main-content"
  class="bg-slate-50 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="pt-20"></div>
  <MarkdownComponent source="{data.rules}" />
  <div class="pb-64"></div>
</main>
