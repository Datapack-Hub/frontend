<script lang="ts">
  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Privacy | Datapack Hub</title>
  <meta name="description" content="Our privacy policy" />
</svelte:head>

<main
  id="main-content"
  class="bg-slate-50 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="pt-20"></div>
  <MarkdownComponent source="{data.policy}" />
  <div class="pb-10"></div>
</main>
