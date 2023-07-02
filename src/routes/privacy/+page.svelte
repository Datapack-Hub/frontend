<script lang="ts">
  import MarkdownComponent from "$lib/components/MarkdownComponent.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Rules | Datapack Hub</title>
</svelte:head>

<main
  class="bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="pt-20"></div>
  <MarkdownComponent source="{data.policy}" />
  <div class="pb-10"></div>
</main>
