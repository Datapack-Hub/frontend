<script lang="ts">
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import { API } from "$lib/globals/consts";
  import autoAnimate from "@formkit/auto-animate";
  import type { PageData } from "./$types";

  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import { projectSchema } from "$lib/globals/schema";
  import { isDark } from "$lib/globals/stores";
  import { debounce } from "radash";
  import IconGrid from "~icons/tabler/LayoutGrid.svelte";
  import IconList from "~icons/tabler/LayoutList.svelte";
  import IconSearch from "~icons/tabler/Search.svelte";
  import IconBTS from "~icons/tabler/ArrowBigLeftLine.svelte";
  import { browser } from "$app/environment";

  export let data: PageData;

  let query: string;
  let sort = "Updated";
  let innerWidth = 0;
  let searchTime = 0;
  let layout = browser
    ? localStorage.getItem("preferred_layout") || "list"
    : "list";

  $: dataCopy = data.projects ?? [];
  $: isSmall = innerWidth > 768;

  let featured = data.featured?.splice(0, 2);

  let search = debounce({ delay: 300 }, async () => {
    let searchResult = await fetch(
      `${API}/projects/search?query=${query}&sort=${sort.toLowerCase()}`
    );

    let search = await searchResult.json();
    searchTime = search.time;

    dataCopy = await projectSchema.array().parseAsync(search.result);
  });

  async function resort() {
    let searchResult = await fetch(
      `${API}/projects/?sort=${sort.toLowerCase()}`
    );

    let resultJson = await searchResult.json();

    dataCopy = await projectSchema.array().parseAsync(resultJson.result);
  }
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>Projects | Datapack Hub</title>
  <meta name="description" content="Explore all our datapacks" />
</svelte:head>

<main
  id="main-content"
  class="items-center pt-0 md:flex-row md:items-start md:pt-20 sm:px-8 md:px-16 lg:px-24">
  <div
    class="py-4 flex flex-col items-center justify-center md:flex-row md:justify-normal space-x-2">
    <!-- <p class="dark:text-white text-center font-bold mr-2 text-xl">Datapacks</p> -->
    <div class="flex-grow flex flex-col sm:flex-row space-x-4 items-center">
      <div
        class="input flex items-center rounded-full px-2 py-1 focus-within:border-dph-orange">
        <IconSearch color="{$isDark ? 'white' : 'black'}" on:click="{search}" />
        <input
          placeholder="Search Datapacks..."
          type="search"
          bind:value="{query}"
          id="query"
          maxlength="75"
          class="ml-2 text-slate-950 placeholder:text-slate-600 dark:placeholder:text-zinc-400 bg-slate-300 dark:bg-zinc-800 focus:outline-none dark:text-white focus:w-80"
          on:input="{search}" />
      </div>
      <div class="block mt-2 sm:mt-0 sm:flex space-x-2 items-center">
        <p class="dark:text-white text-center">Sort By:</p>
        <select
          class="flex h-8 pl-2 items-center rounded-full bg-slate-200 py-1 px-2 focus-within:outline focus-within:outline-2 focus-within:outline-dph-orange dark:bg-zinc-700 dark:text-white"
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
    <div class="flex items-center space-x-4 mt-4 md:mt-0">
      {#if isSmall}
        <div class="block mt-2 sm:mt-0 sm:flex space-x-1 items-center">
          <p class="dark:text-white text-center mr-2">Layout:</p>
          <button
            on:click="{() => {
              layout = 'list';
              localStorage.setItem('preferred_layout', 'list');
            }}"
            class="h-8 w-8 rounded-md {layout === 'list'
              ? 'bg-dph-orange'
              : 'bg-dph-orange/25'} cursor-pointer p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0 flex items-center justify-center">
            <IconList /></button>
          <button
            on:click="{() => {
              layout = 'grid';
              localStorage.setItem('preferred_layout', 'grid');
            }}"
            class="h-8 w-8 rounded-md {layout === 'grid'
              ? 'bg-dph-orange'
              : 'bg-dph-orange/25'} cursor-pointer p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0 flex items-center justify-center">
            <IconGrid /></button>
        </div>
      {/if}
      <div class="block mt-2 sm:mt-0 sm:flex space-x-1 items-center">
        <p class="dark:text-white mr-2">Page:</p>
        {#if data.page - 3 >= 1}
          <a
            href="/projects?page=1"
            class="h-8 pl-1 w-8 rounded-md bg-dph-orange/25 p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0 flex items-center content-center"
            ><IconBTS class="" /></a>
        {/if}
        {#if data.page - 2 >= 1}
          <a
            href="/projects?page={data.page - 2}"
            class="h-8 w-8 rounded-md bg-dph-orange/25 p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0"
            >{data.page - 2}</a>
        {/if}
        {#if data.page - 1 >= 1}
          <a
            href="/projects?page={data.page - 1}"
            class="h-8 w-8 rounded-md bg-dph-orange/25 p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0"
            >{data.page - 1}</a>
        {/if}
        <a
          href="/projects?page={data.page}"
          class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0"
          >{data.page}</a>
        {#if data.page + 1 <= data.pages}
          <a
            href="/projects?page={data.page + 1}"
            class="h-8 w-8 rounded-md bg-dph-orange/25 p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0"
            >{data.page + 1}</a>
        {/if}
        {#if data.page + 2 <= data.pages}
          <a
            href="/projects?page={data.page + 2}"
            class="h-8 w-8 rounded-md bg-dph-orange/25 p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0"
            >{data.page + 2}</a>
        {/if}
      </div>
    </div>
  </div>
  <CasualLine />
  <div class="py-4 flex flex-col">
    {#if !dataCopy || dataCopy.length === 0}
      <h2 class=" text-slate-950 dark:text-white">No results found</h2>
    {:else}
      <h2 class=" text-slate-950 dark:text-white mx-3">
        {#if query != "" && searchTime <= 0}
          Showing {dataCopy.length} projects
        {:else}
          Took {searchTime.toFixed(3)} seconds to find {dataCopy.length} project{dataCopy.length ==
          1
            ? ""
            : "s"}
        {/if}
      </h2>
      <ul class="space-y-2 mx-3 mt-2" use:autoAnimate>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3" use:autoAnimate>
          {#each featured ?? [] as feat}
            <FeaturedProjectComponent project="{feat}" type="featured" />
          {/each}
        </div>
        {#key layout}
          <div
            class="{layout === 'list'
              ? 'space-y-2'
              : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2'}"
            use:autoAnimate>
            {#key dataCopy}
              {#each dataCopy as project}
                <li>
                  <ProjectComponent {project} />
                </li>
                <!-- {/if} -->
              {/each}
            {/key}
          </div>
        {/key}
      </ul>
    {/if}
  </div>
  <div class="py-16"></div>
</main>
