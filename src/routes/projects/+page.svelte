<script lang="ts">
  import ProjectComponent from "$components/interactable/ProjectComponent.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-8 md:px-16 lg:px-24"
>
  <div
    class="items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-16 overflow-auto"
  >
      <h1
        class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2"
      >
        Browse Datapacks
      </h1>
      <br />
      <div class="flex items-center md-5">
        <p class="dark:text-white font-bold">Sort:</p>
        <a
          href="?sort=updated"
          class="btn-sm-start {data.sortMode == "updated" ? "bg-orange-500" : "bg-opacity-0 text-orange-500 bg-orange-500 hover:bg-opacity-20 transition-all"}"
          >Updated</a
        >
        <a
          href="?sort=trending"
          class="btn-sm-start {data.sortMode == "trending" ? "bg-orange-500" : "bg-opacity-0 text-orange-500 bg-orange-500 hover:bg-opacity-20 transition-all"}"
          >Trending</a
        >
      </div>
      <div class=" border-b-[1px] border-stone-700 mt-4"></div>
      <div class="flex flex-col items-center w-full mt-4">
        {#if data.projects}          
          {#each data.projects as project}
            <ProjectComponent {project} />
          {/each}
        {/if}
      </div>
  </div>
</main>
