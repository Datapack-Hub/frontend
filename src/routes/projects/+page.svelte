<script lang="ts">
  import CasualLine from "$lib/components/CasualLine.svelte";
  import ProjectComponent from "$lib/components/ProjectComponent.svelte";
  import { apiURL } from "$lib/globals/consts";
  import autoAnimate from "@formkit/auto-animate";
  import debounce from "lodash-es/debounce";
  import type { PageData } from "./$types";

  import IconSearch from "~icons/tabler/Search.svelte";

  let query: string;

  let search = debounce(async () => {
    let searchResult = await fetch(apiURL + `/projects/search?query=${query}`);
    data.projects = (await searchResult.json()).result as Project[];
  }, 300);

  export let data: PageData;
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
</svelte:head>

<main class="px-8 md:px-16 lg:px-24">
  <div
    class="-translate-y-20 items-center pt-0 md:translate-y-0 md:flex-row md:items-start md:pt-20">
    <div
      class="my-4 flex flex-col items-center justify-center sm:flex-row md:justify-normal space-x-2">
      <div
        class="flex w-64 items-center rounded-full bg-pearl-lusta-200 px-2 py-1 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500 dark:bg-stone-700">
        <IconSearch color="white" on:click="{search}" />
        <input
          placeholder="Search Datapacks..."
          type="text"
          bind:value="{query}"
          id="query"
          maxlength="75"
          class="ml-2 bg-pearl-lusta-200 font-brand text-pearl-lusta-950 placeholder:text-stone-400 focus:outline-none dark:bg-stone-700 dark:text-white"
          on:input="{search}" />
      </div>
      <div class="flex items-center">
        <a
          href="/projects"
          class="mx-1 mt-4 h-8 w-8 rounded-full bg-dph-orange p-1 text-center font-brand font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >1</a>
        <a
          href="/projects"
          class="mx-1 mt-4 h-8 w-8 rounded-full bg-dph-orange p-1 text-center font-brand font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >2</a>
        <a
          href="/projects"
          class="mx-1 mt-4 h-8 w-8 rounded-full bg-dph-orange p-1 text-center font-brand font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >3</a>
        <a
          href="/projects"
          class="mx-1 mt-4 h-8 w-8 rounded-full bg-dph-orange p-1 text-center font-brand font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >4</a>
        <a
          href="/projects"
          class="mx-1 mt-4 h-8 w-8 rounded-full bg-dph-orange p-1 text-center font-brand font-bold text-pearl-lusta-950 dark:text-white sm:mt-0"
          >5</a>
      </div>
    </div>
    <CasualLine />
    <div class="mt-4 flex flex-col md:flex-row">
      <div class="md:mb-3 mb-0 w-full rounded-xl bg-stone-800 p-2 lg:w-1/4 xl:w-1/5">
        <p class="w-full text-center font-brand text-xl text-white">
          Search Settings
        </p>
        <p class="w-full text-center font-brand text-white/60">
          TODO: Add these
        </p>
      </div>
      {#if data.projects}
        {#if data.projects.length >= 1}
          <ul class="ml-0 w-full space-y-2 md:ml-3" use:autoAnimate>
            {#each data.projects as project}
              <!-- uncomment these to see the featured stuff on the thingy thing -->
              <!-- {#if Math.random() < 0.2} -->
              <!-- <FeaturedProjectComponent project="{project}" /> -->
              <!-- {:else} -->
              <ProjectComponent project="{project}" />
              <!-- {/if} -->
            {/each}
          </ul>
        {:else}
          <h2 class="font-brand text-pearl-lusta-950 dark:text-white">
            No results found
          </h2>
        {/if}
      {:else}
        <h2 class="font-brand text-pearl-lusta-950 dark:text-white">
          No results found
        </h2>
      {/if}
    </div>
  </div>
</main>
