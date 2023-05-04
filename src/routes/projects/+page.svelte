<script lang="ts">
  import CasualLine from "$components/CasualLine.svelte";
  import ProjectComponent from "$components/ProjectComponent.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
</svelte:head>

<main
  class="bg-new-white-200 px-8 transition-all dark:bg-stone-900 md:px-16 lg:px-24 -translate-y-20 md:translate-y-0">
  <div
    class="h-screen w-full items-center overflow-auto md:flex-row md:items-start">
    <h1
      class="mt-8 pb-2 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Browse Datapacks
    </h1>
    <br />
    <div class="md-5 flex items-center">
      <p class="font-bold dark:text-white">Sort:</p>
      <a
        href="?sort=updated"
        class="btn-sm-start {data.sortMode == 'updated'
          ? 'bg-orange-500'
          : 'bg-orange-500 bg-opacity-0 text-orange-500 transition-all hover:bg-opacity-20'}"
        >Updated</a>
      <a
        href="?sort=trending"
        class="btn-sm-start {data.sortMode == 'trending'
          ? 'bg-orange-500'
          : 'bg-orange-500 bg-opacity-0 text-orange-500 transition-all hover:bg-opacity-20'}"
        >Trending</a>
    </div>
    <CasualLine />
    <div class="mt-4 flex w-full flex-col items-center">
      {#if data.projects}
        {#each data.projects as project}
          <ProjectComponent project="{project}" />
        {/each}
      {/if}
    </div>
  </div>
</main>
