<script lang="ts">
  import CasualLine from "$components/CasualLine.svelte";
  import ProjectComponent from "$components/ProjectComponent.svelte";
  import { apiURL } from "$globals";
  import type { PageData } from "./$types";

  import IconSearch from '~icons/tabler/Search.svelte'

  async function search() {
    let x = await fetch(apiURL + "/projects/search?query=" + encodeURI((document.getElementById("query") as HTMLInputElement).value))
    data.projects = (await x.json()).result as Project[]
  }

  export let data: PageData;
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
</svelte:head>

<main
  class="px-8 md:px-16 lg:px-24">
  <div
    class="items-center pt-0 md:pt-20 -translate-y-20 md:translate-y-0 md:flex-row md:items-start">
    <h1
      class="mt-8 pb-2 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Browse Datapacks
    </h1>
    <div class="flex my-4">
      <div class="bg-new-white-300 dark:bg-stone-600 rounded-full px-2 py-1 w-64 flex items-center focus-within:outline focus-within:outline-2 focus-within:outline-orange-500">
        <IconSearch color="white"/>
        <form action="get" on:submit|preventDefault="{search}">
          <input placeholder="Search Datapacks" type="text" id="query" class="bg-new-white-300 dark:bg-stone-600 ml-2 dark:text-white focus:outline-none placeholder:text-stone-400 font-brand" on:submit|preventDefault="{search}">
        </form>
      </div>
      <div class="px-2"></div>
      <div class="flex items-center">
        <a href="/projects" class="px-1 dark:text-white bg-orange-600 mx-1 rounded-full w-6 h-6 text-center">1</a>
        <a href="/projects" class="px-1 dark:text-white bg-orange-600 mx-1 rounded-full w-6 h-6 text-center">2</a>
        <a href="/projects" class="px-1 dark:text-white bg-orange-600 mx-1 rounded-full w-6 h-6 text-center">3</a>
        <a href="/projects" class="px-1 dark:text-white bg-orange-600 mx-1 rounded-full w-6 h-6 text-center">4</a>
        <a href="/projects" class="px-1 dark:text-white bg-orange-600 mx-1 rounded-full w-6 h-6 text-center">5</a>
      </div>
    </div>
    <CasualLine />
    <div class="mt-4 flex">
      <div class="w-1/5 bg-stone-800 rounded-xl">
        
      </div>
      <div class="w-full mx-3">
        {#if data.projects}
          {#each data.projects as project}
            <ProjectComponent project="{project}" />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</main>
