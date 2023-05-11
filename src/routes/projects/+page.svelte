<script lang="ts">
  import CasualLine from "$lib/components/CasualLine.svelte";
  import ProjectComponent from "$lib/components/ProjectComponent.svelte";
  import { apiURL } from "$lib/globals/functions";
  import type { PageData } from "./$types";

  import IconSearch from "~icons/tabler/Search.svelte";

  let query: string;

  async function search() {
    let searchResult = await fetch(apiURL + `/projects/search?query=${query}`);
    data.projects = (await searchResult.json()).result as Project[];
  }

  export let data: PageData;
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
</svelte:head>

<main class="px-8 md:px-16 lg:px-24">
  <div
    class="-translate-y-20 items-center pt-0 md:translate-y-0 md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-2 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Browse Datapacks
    </h1>
    <div class="my-4 flex">
      <div
        class="flex w-64 items-center rounded-full bg-new-white-300 px-2 py-1 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500 dark:bg-stone-600">
        <IconSearch color="white" on:click="{search}" />
        <input
          placeholder="Search Datapacks"
          type="text"
          bind:value="{query}"
          id="query"
          maxlength="75"
          class="ml-2 bg-new-white-300 font-brand placeholder:text-stone-400 focus:outline-none dark:bg-stone-600 dark:text-white"
          on:input="{search}" />
      </div>
      <div class="px-2"></div>
      <div class="flex items-center">
        <a
          href="/projects"
          class="mx-1 h-6 w-6 rounded-full bg-orange-600 px-1 text-center dark:text-white"
          >1</a>
        <a
          href="/projects"
          class="mx-1 h-6 w-6 rounded-full bg-orange-600 px-1 text-center dark:text-white"
          >2</a>
        <a
          href="/projects"
          class="mx-1 h-6 w-6 rounded-full bg-orange-600 px-1 text-center dark:text-white"
          >3</a>
        <a
          href="/projects"
          class="mx-1 h-6 w-6 rounded-full bg-orange-600 px-1 text-center dark:text-white"
          >4</a>
        <a
          href="/projects"
          class="mx-1 h-6 w-6 rounded-full bg-orange-600 px-1 text-center dark:text-white"
          >5</a>
      </div>
    </div>
    <CasualLine />
    <div class="mt-4 flex">
      <div class="w-1/5 rounded-xl bg-stone-800"></div>
      <div class="mx-3 w-full">
        {#if data.projects}
          {#if data.projects.length >= 1}
            {#each data.projects as project}
              <ProjectComponent project="{project}" />
            {/each}
          {:else}
            <h2 class="font-brand dark:text-white">No results found</h2>
          {/if}
        {:else}
          <h2 class="font-brand dark:text-white">No results found</h2>
        {/if}
      </div>
    </div>
  </div>
</main>
