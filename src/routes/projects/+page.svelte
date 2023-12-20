<script lang="ts">
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import { API, categories } from "$lib/globals/consts";
  import type { PageData } from "./$types";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import Select from "$lib/components/utility/Select.svelte";
  import { projectSchema } from "$lib/globals/schema";
  import { isDark } from "$lib/globals/stores";
  import { debounce } from "radash";
  import IconBTS from "~icons/tabler/ArrowBigLeftLine.svelte";
  import IconGrid from "~icons/tabler/LayoutGrid.svelte";
  import IconList from "~icons/tabler/LayoutList.svelte";
  import IconSearch from "~icons/tabler/Search.svelte";

  export let data: PageData;

  let searchTime = 0;
  let layout = browser
    ? localStorage.getItem("preferred_layout") || "grid"
    : "grid";

  $: dataCopy = data.projects ?? [];

  let featured = data.featured?.splice(0, 2);
  let parameters = $page.url.searchParams;

  const updateContent = async () => {
    searchTime = 0;
    let result = await fetch(
      `${API}/projects/search?query=${
        data.query
      }&sort=${data.sort.toLowerCase()}&page=${data.page}${
        data.category !== "All"
          ? "&category=" + encodeURIComponent(data.category)
          : ""
      }`
    );
    let r = await result.json();
    data.pages = r.pages;
    data.page = Math.max(Math.min(data.page, data.pages), 1);
    data.count = r.count;
    dataCopy = await projectSchema.array().parseAsync(r.result);
    searchTime = r.time;
    history.pushState(
      {},
      "",
      `?page=${data.page}&query=${data.query}&sort=${data.sort}${
        data.category !== "All"
          ? "&category=" + encodeURIComponent(data.category)
          : ""
      }`
    );
  };

  let search = debounce({ delay: 100 }, async () => {
    await updateContent();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function resort(event: CustomEvent<any>) {
    data.sort = event.detail.label;
    await updateContent();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function changeTag(event: CustomEvent<any>) {
    // const categories = event.detail.map((v: ListboxOption) => v.label!);
    const categories = [event.detail.label!]; //TODO: change this back to multisupport once the api is capable
    data.category = categories.join(", ");
    await updateContent();
  }

  function genURLParameters(page: number) {
    parameters.set("page", page.toString());
    parameters.set("sort", data.sort);
    parameters.set("category", data.category || "");
    parameters.set("query", data.query);
    return parameters.toString();
  }
</script>

<svelte:head>
  <title>Projects | Datapack Hub</title>
  <meta name="description" content="Explore all our datapacks" />
</svelte:head>

<main
  id="main-content"
  class="items-center pt-0 sm:px-8 md:flex-row md:items-start md:px-16 md:pt-32 lg:px-24">
  <div
    class="flex flex-col items-center justify-center space-x-0 space-y-3 py-4 md:justify-normal md:space-x-2 xl:flex-row">
    <!-- <p class="dark:text-white text-center font-bold mr-2 text-xl">Datapacks</p> -->
    <div
      class="mt-8 flex flex-grow flex-col items-center gap-3 md:mt-0 md:flex-row">
      <div
        class="input flex h-11 items-center rounded-full px-2 py-1 focus-within:border-dph-orange">
        <IconSearch color="{$isDark ? 'white' : 'black'}" on:click="{search}" />
        <input
          placeholder="Search Datapacks..."
          bind:value="{data.query}"
          id="query"
          maxlength="35"
          class="ml-2 w-64 bg-slate-300 text-zinc-950 placeholder:text-zinc-600 focus:outline-none lg:w-96 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400"
          on:input="{search}" />
      </div>
      <div
        class="flex flex-col items-center space-x-0 sm:flex-row md:space-x-3">
        <div class="mt-2 flex items-center sm:mt-0">
          <Select
            emptyString="Select a Sort"
            label="Sort"
            defaultOption="{data.sort}"
            options="{['Updated', 'Downloads']}"
            on:change="{resort}" />
        </div>
        <div class="mt-2 flex items-center sm:mt-0">
          <Select
            emptyString="Select Categories"
            label="Tag"
            multi="{false}"
            options="{['All', ...categories]}"
            defaultOption="{data.category}"
            on:change="{changeTag}" />
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center space-x-0 md:mt-0 md:space-x-4">
      <div class="mt-2 hidden items-center space-x-1 sm:mt-0 md:flex">
        <button
          on:click="{() => {
            layout = 'list';
            localStorage.setItem('preferred_layout', 'list');
          }}"
          class="h-8 w-8 rounded-md {layout === 'list'
            ? 'bg-dph-orange text-white'
            : 'bg-slate-300 text-zinc-950 dark:bg-zinc-700 dark:text-white'} flex cursor-pointer items-center justify-center p-1 text-center font-bold sm:mt-0">
          <IconList /></button>
        <button
          on:click="{() => {
            layout = 'grid';
            localStorage.setItem('preferred_layout', 'grid');
          }}"
          class="h-8 w-8 rounded-md {layout === 'grid'
            ? 'bg-dph-orange text-white'
            : 'bg-slate-300 text-zinc-950 dark:bg-zinc-700 dark:text-white'} flex cursor-pointer items-center justify-center p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:text-white">
          <IconGrid /></button>
      </div>
      <div class="flex items-center space-x-1 sm:mt-0">
        <p class="mr-2 dark:text-white">Page:</p>
        {#if data.page - 3 >= 1}
          <a
            href="/projects?{genURLParameters(1)}"
            class="flex h-8 w-8 content-center items-center rounded-md bg-slate-300 p-1 pl-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
            ><IconBTS class="" /></a>
        {/if}
        {#if data.page - 2 >= 1}
          <a
            href="/projects?{genURLParameters(data.page - 2)}"
            class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
            >{data.page - 2}</a>
        {/if}
        {#if data.page - 1 >= 1}
          <a
            href="/projects?{genURLParameters(data.page - 1)}"
            class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
            >{data.page - 1}</a>
        {/if}
        <a
          href="/projects?{genURLParameters(data.page)}"
          class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-white sm:mt-0"
          >{data.page}</a>
        {#if data.page + 1 <= data.pages}
          <a
            href="/projects?{genURLParameters(data.page + 1)}"
            class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
            >{data.page + 1}</a>
        {/if}
        {#if data.page + 2 <= data.pages}
          <a
            href="/projects?{genURLParameters(data.page + 2)}"
            class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
            >{data.page + 2}</a>
        {/if}
      </div>
    </div>
  </div>
  <CasualLine />
  <div class="flex flex-col py-4">
    {#if featured.length > 0}
      <p class="mx-2 mb-2 dark:text-zinc-100">Featured Projects</p>
    {/if}
    <div
      class="mx-2 mb-4 grid grid-cols-1 gap-3 {featured.length == 1
        ? 'lg:grid-cols-1'
        : 'lg:grid-cols-2'}">
      {#each featured ?? [] as feat}
        <FeaturedProjectComponent project="{feat}" type="featured" />
      {/each}
    </div>
    {#if data.count === 0}
      <h2 class=" text-zinc-950 dark:text-white">No results found</h2>
    {:else}
      <h2 class=" mx-3 text-zinc-950 dark:text-white">
        {#if data.query == "" || searchTime <= 0}
          Showing {data.count} projects
        {:else}
          Took {searchTime.toFixed(3)} seconds to find {data.count} project{data.count ==
          1
            ? ""
            : "s"}
        {/if}
      </h2>
      <div class="mx-2 mt-2 space-y-2">
        {#key layout}
          <ul
            class="{layout === 'list'
              ? 'space-y-2'
              : 'grid-auto-fit-2xl grid gap-3'}">
            {#key dataCopy}
              {#each dataCopy as project}
                <li>
                  <ProjectComponent {project} />
                </li>
                <!-- {/if} -->
              {/each}
            {/key}
          </ul>
        {/key}
      </div>
    {/if}
  </div>
  <div class="mt-4 flex items-center justify-center">
    <div class="flex items-center space-x-1 sm:mt-0">
      <p class="mr-2 dark:text-white">Page:</p>
      {#if data.page - 3 >= 1}
        <a
          href="/projects?{genURLParameters(1)}"
          class="flex h-8 w-8 content-center items-center rounded-md bg-slate-300 p-1 pl-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
          ><IconBTS class="" /></a>
      {/if}
      {#if data.page - 2 >= 1}
        <a
          href="/projects?{genURLParameters(data.page - 2)}"
          class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
          >{data.page - 2}</a>
      {/if}
      {#if data.page - 1 >= 1}
        <a
          href="/projects?{genURLParameters(data.page - 1)}"
          class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
          >{data.page - 1}</a>
      {/if}
      <a
        href="/projects?{genURLParameters(data.page)}"
        class="h-8 w-8 rounded-md bg-dph-orange p-1 text-center font-bold text-white sm:mt-0"
        >{data.page}</a>
      {#if data.page + 1 <= data.pages}
        <a
          href="/projects?{genURLParameters(data.page + 1)}"
          class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
          >{data.page + 1}</a>
      {/if}
      {#if data.page + 2 <= data.pages}
        <a
          href="/projects?{genURLParameters(data.page + 2)}"
          class="h-8 w-8 rounded-md bg-slate-300 p-1 text-center font-bold text-zinc-950 sm:mt-0 dark:bg-zinc-700 dark:text-white"
          >{data.page + 2}</a>
      {/if}
    </div>
  </div>
  <div class="py-32"></div>
</main>
