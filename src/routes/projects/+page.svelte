<script lang="ts">
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import { apiURL } from "$lib/globals/consts";
  import autoAnimate from "@formkit/auto-animate";
  import type { PageData } from "./$types";

  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import { projectSchema } from "$lib/globals/schema";
  import { isDark } from "$lib/globals/stores";
  import { debounce } from "radash";
  import IconSearch from "~icons/tabler/Search.svelte";

  export let data: PageData;

  let query: string;
  $: dataCopy = data.projects ?? [];
  let sort = "Updated";

  let featured = data.featured?.splice(0, 1);

  let search = debounce({ delay: 300 }, async () => {
    let searchResult = await fetch(
      `${apiURL}/projects/search?query=${query}&sort=${sort.toLowerCase()}`
    );
    dataCopy = await projectSchema
      .array()
      .parseAsync((await searchResult.json()).result);
  });

  async function resort() {
    let searchResult = await fetch(
      `${apiURL}/projects/?sort=${sort.toLowerCase()}`
    );
    dataCopy = await projectSchema
      .array()
      .parseAsync((await searchResult.json()).result);
  }
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
</svelte:head>

<main
  class=" items-center pt-0 md:flex-row md:items-start md:pt-20 sm:px-8 md:px-16 lg:px-24">
  <div
    class="py-4 flex flex-col items-center justify-center md:flex-row md:justify-normal space-x-2">
    <div class="flex-grow flex flex-col sm:flex-row space-x-2 items-center">
      <div
        class="flex items-center rounded-full bg-pearl-lusta-200 px-2 py-1 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500 dark:bg-stone-700 mr-0 sm:mr-4">
        <IconSearch color="{$isDark ? 'white' : 'black'}" on:click="{search}" />
        <input
          placeholder="Search Datapacks..."
          type="text"
          bind:value="{query}"
          id="query"
          maxlength="75"
          class=" ml-2 bg-pearl-lusta-200 text-pearl-lusta-950 placeholder:text-stone-400 focus:outline-none dark:bg-stone-700 dark:text-white"
          on:input="{search}" />
      </div>
      <div class="block mt-2 sm:mt-0 sm:flex space-x-2 items-center">
        <p class="dark:text-white text-center">Sort By:</p>
        <select
          class="flex h-8 pl-3 items-center rounded-full bg-pearl-lusta-200 px-2 py-1 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500 dark:bg-stone-700 dark:text-white"
          bind:value="{sort}"
          on:change="{resort}">
          {#each ["Updated", "Downloads"] as cat}
            <option value="{cat}">
              {cat}
            </option>
          {/each}
        </select>
      </div>
    </div>
    <div class="flex items-center space-x-1 mt-4 md:mt-0">
      <p class="dark:text-white mr-2">Page:</p>
      {#if data.page - 2 > 1}
        <a
          href="/projects?page={data.page - 2}"
          class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >{data.page - 2}</a>
      {/if}
      {#if data.page - 1 > 1}
        <a
          href="/projects?page={data.page - 1}"
          class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >{data.page - 1}</a>
      {/if}
      <a
        href="/projects?page={data.page}"
        class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
        >{data.page}</a>
      {#if data.page + 1 < data.pages}
        <a
          href="/projects?page={data.page + 1}"
          class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >{data.page + 1}</a>
      {/if}
      {#if data.page + 2 < data.pages}
        <a
          href="/projects?page={data.page + 2}"
          class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >{data.page + 2}</a>
      {/if}
    </div>
  </div>
  <CasualLine />
  <div class="py-4 flex flex-col">
    {#if !dataCopy || !(dataCopy.length >= 1)}
      <h2 class=" text-pearl-lusta-950 dark:text-white">No results found</h2>
    {:else}
      <h2 class=" text-pearl-lusta-950 dark:text-white mx-3">
        Showing {dataCopy.length} projects:
      </h2>
      <ul class="space-y-2 mx-3 mt-2" use:autoAnimate>
        {#each featured ?? [] as feat}
          <FeaturedProjectComponent project="{feat}" type="featured" />
        {/each}
        {#key dataCopy}
          {#each dataCopy as project}
            <li>
              <ProjectComponent project="{project}" />
            </li>
            <!-- {/if} -->
          {/each}
        {/key}
      </ul>
    {/if}
  </div>
  <div class="py-16"></div>
</main>
