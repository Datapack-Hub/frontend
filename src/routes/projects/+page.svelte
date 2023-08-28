<script lang="ts">
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import { API } from "$lib/globals/consts";
  import autoAnimate from "@formkit/auto-animate";
  import type { PageData } from "./$types";

  import { browser } from "$app/environment";
  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import { projectSchema } from "$lib/globals/schema";
  import { isDark } from "$lib/globals/stores";
  import { debounce } from "radash";
  import IconBTS from "~icons/tabler/ArrowBigLeftLine.svelte";
  import IconGrid from "~icons/tabler/LayoutGrid.svelte";
  import IconList from "~icons/tabler/LayoutList.svelte";
  import IconSearch from "~icons/tabler/Search.svelte";
  import Dropdown from "$lib/components/utility/Dropdown.svelte";

  export let data: PageData;

  let dropdownOpen: boolean;
  let query: string;
  let sort = "Updated";
  let searchTime = 0;
  let layout = browser
    ? localStorage.getItem("preferred_layout") || "grid"
    : "grid";

  $: dataCopy = data.projects ?? [];

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

<svelte:head>
  <title>Projects | Datapack Hub</title>
  <meta name="description" content="Explore all our datapacks" />
</svelte:head>

<main
  id="main-content"
  class="items-center pt-0 sm:px-8 md:flex-row md:items-start md:px-16 md:pt-20 lg:px-24">
  <div
    class="flex flex-col items-center justify-center space-x-0 py-4 md:flex-row md:justify-normal md:space-x-2">
    <!-- <p class="dark:text-white text-center font-bold mr-2 text-xl">Datapacks</p> -->
    <div
      class="flex flex-grow flex-col items-center space-x-0 sm:flex-row sm:space-x-4">
      <div
        class="input flex items-center rounded-full px-2 py-1 focus-within:border-dph-orange">
        <IconSearch color="{$isDark ? 'white' : 'black'}" on:click="{search}" />
        <input
          placeholder="Search Datapacks..."
          bind:value="{query}"
          id="query"
          maxlength="75"
          class="ml-2 bg-slate-300 text-slate-950 placeholder:text-slate-600 focus:outline-none dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400"
          on:input="{search}" />
      </div>
      <div class="mt-2 flex items-center sm:mt-0">
        <p
          class="flex h-11 items-center rounded-l-lg bg-slate-300 px-4 text-center dark:bg-zinc-700 dark:text-white">
          Sort By:
        </p>
        <Dropdown
          options="{['Updated', 'Downloads']}"
          bind:selected="{sort}"
          bind:expand="{dropdownOpen}"
          selectedStyles="h-11 bg-slate-200 dark:bg-zinc-800 p-3 text-left dark:text-slate-100 {dropdownOpen
            ? 'rounded-tr-lg'
            : 'rounded-r-lg'}"
          on:change="{resort}" />
      </div>
    </div>
    <div class="mt-4 flex items-center space-x-0 md:mt-0 md:space-x-4">
      <div class="mt-2 hidden items-center space-x-1 sm:mt-0 md:flex">
        <p class="mr-2 hidden text-center dark:text-white lg:block">Layout:</p>
        <button
          on:click="{() => {
            layout = 'list';
            localStorage.setItem('preferred_layout', 'list');
          }}"
          class="h-8 w-8 rounded-md {layout === 'list'
            ? 'bg-dph-orange text-white'
            : 'bg-dph-orange/25 text-slate-950 dark:text-white'} flex cursor-pointer items-center justify-center p-1 text-center font-bold sm:mt-0">
          <IconList /></button>
        <button
          on:click="{() => {
            layout = 'grid';
            localStorage.setItem('preferred_layout', 'grid');
          }}"
          class="h-8 w-8 rounded-md {layout === 'grid'
            ? 'bg-dph-orange text-white'
            : 'bg-dph-orange/25 text-slate-950 dark:text-white'} flex cursor-pointer items-center justify-center p-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0">
          <IconGrid /></button>
      </div>
      <div class="flex items-center space-x-1 sm:mt-0">
        <p class="mr-2 dark:text-white">Page:</p>
        {#if data.page - 3 >= 1}
          <a
            href="/projects?page=1"
            class="flex h-8 w-8 content-center items-center rounded-md bg-dph-orange/25 p-1 pl-1 text-center font-bold text-slate-950 dark:text-white sm:mt-0"
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
          class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-white sm:mt-0"
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
  <div class="flex flex-col py-4">
    {#if featured.length > 0}
      <p class="mx-2 mb-2 dark:text-slate-100">Featured Projects</p>
    {/if}
    <div
      class="mx-2 mb-4 grid grid-cols-1 gap-3 {featured.length == 1 ? "lg:grid-cols-1" : "lg:grid-cols-2"}"
      use:autoAnimate>
      {#each featured ?? [] as feat}
        <FeaturedProjectComponent project="{feat}" type="featured" />
      {/each}
    </div>
    {#if !dataCopy || dataCopy.length === 0}
      <h2 class=" text-slate-950 dark:text-white">No results found</h2>
    {:else}
      <h2 class=" mx-3 text-slate-950 dark:text-white">
        {#if query != "" && searchTime <= 0}
          Showing {dataCopy.length} projects
        {:else}
          Took {searchTime.toFixed(3)} seconds to find {dataCopy.length} project{dataCopy.length ==
          1
            ? ""
            : "s"}
        {/if}
      </h2>
      <ul class="mx-2 mt-2 space-y-2" use:autoAnimate>
        {#key layout}
          <div
            class="{layout === 'list'
              ? 'space-y-2'
              : 'grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3'}"
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
