<script lang="ts">
  import CasualLine from "$lib/components/CasualLine.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import { apiURL } from "$lib/globals/consts";
  import autoAnimate from "@formkit/auto-animate";
  import debounce from "lodash-es/debounce";
  import type { PageData } from "./$types";

  import IconSearch from "~icons/tabler/Search.svelte";
  import type { Project } from "$lib/globals/schema";
  import { projectSchema } from "$lib/globals/schema";

  let query: string;
  let dataCopy: Project[];

  let search = debounce(async () => {
    let searchResult = await fetch(apiURL + `/projects/search?query=${query}`);
    dataCopy = await projectSchema
      .array()
      .parseAsync((await searchResult.json()).result);
  }, 300);

  export let data: PageData;
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
</svelte:head>

<main
  class="-translate-y-20 items-center pt-0 md:translate-y-0 md:flex-row md:items-start md:pt-20 sm:px-8 md:px-16 lg:px-24">
  <div
    class="my-4 flex flex-col items-center justify-center sm:flex-row md:justify-normal space-x-2">
    <div class="flex-grow">
      <div
        class="flex w-64 items-center rounded-full bg-pearl-lusta-200 px-2 py-1 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500 dark:bg-stone-700">
        <IconSearch color="white" on:click="{search}" />
        <input
          placeholder="Search Datapacks..."
          type="text"
          bind:value="{query}"
          id="query"
          maxlength="75"
          class="ml-2 bg-pearl-lusta-200 text-pearl-lusta-950 placeholder:text-stone-400 focus:outline-none dark:bg-stone-700 dark:text-white"
          on:input="{search}" />
      </div>
    </div>
    <div class="flex items-center space-x-1">
      <p class="dark:text-white mr-2">Page:</p>
      {#if Array(data.pages).length < 5}
        {#each Array(data.pages) as _, i}
          {#if data.page == i + 1}
            <a
              href="/projects?page={i + 1}"
              class="mt-4 h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
              >{i + 1}</a>
          {:else}
            <a
              href="/projects?page={i + 1}"
              class="mt-4 h-8 w-8 rounded-md bg-dph-orange/25 hover:bg-dph-orange/40 p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
              >{i + 1}</a>
          {/if}
        {/each}
      {:else}
        <a
          href="/projects?page={data.page - 2}"
          class="mt-4 h-8 w-8 rounded-md bg-dph-orange/25 hover:bg-dph-orange/40 p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >{data.page - 2}</a>
        <a
          href="/projects?page={data.page - 1}"
          class="mt-4 h-8 w-8 rounded-md bg-dph-orange/25 hover:bg-dph-orange/40 p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >{data.page - 1}</a>
        <a
          href="/projects?page={data.page}"
          class="mt-4 h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >{data.page}</a>
        {#if data.pages > data.page}
          <a
            href="/projects?page={data.page + 1}"
            class="mt-4 h-8 w-8 rounded-md bg-dph-orange/25 hover:bg-dph-orange/40 p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
            >{data.page + 1}</a>
        {/if}
        {#if data.pages > data.page + 1}
          <a
            href="/projects?page={data.page + 2}"
            class="mt-4 h-8 w-8 rounded-md bg-dph-orange/25 hover:bg-dph-orange/40 p-1 text-center font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
            >{data.page + 2}</a>
        {/if}
      {/if}
    </div>
  </div>
  <CasualLine />
  <div class="py-4 flex flex-col">
    {#if !data.projects || !(data.projects.length >= 1)}
      <h2 class=" text-pearl-lusta-950 dark:text-white">No results found</h2>
    {:else}
      <ul class="space-y-2 mx-3" use:autoAnimate>
        <h2 class=" text-pearl-lusta-950 dark:text-white">
          Showing {data.projects.length} projects:
        </h2>
        {#each data.projects as project}
          <!-- uncomment these to see the featured stuff on the thingy thing -->
          <!-- {#if Math.random() < 0.2} -->
          <!-- <FeaturedProjectComponent project="{project}" /> -->
          <!-- {:else} -->
          <ProjectComponent project="{project}" />
          <!-- {/if} -->
        {/each}
      </ul>
    {/if}
  </div>
</main>
