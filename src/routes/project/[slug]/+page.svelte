<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorNameFromID } from "$globals";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;
  let visible = false;

  let author = "Loading...";

  (async () => {
    if (browser)
      author = "By " + (await getAuthorNameFromID(data.project?.author!));
    visible = true
  })();
</script>

<svelte:head>
    <title>{data.project?.title} | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-0 sm:px-8 md:px-16 lg:px-24 h-screen"
>
  <div class="pt-16" />
  <div class="flex w-full dark:bg-new-white bg-dark-white dark:bg-opacity-10 p-4 rounded-xl mt-12">
    <img
      src={data.project?.icon}
      alt="Icon for {data.project?.title}"
      width="96"
      class="rounded-lg mr-6"
    />
    <div>
      <h1 class="dark:text-white text-5xl font-brand font-black float-left">{data.project?.title}</h1>
      {#if visible}
      <h2 class="dark:text-white text-xl mt-4 transition-all font-brand font-bold" in:fade={{duration: 250}}>{author}</h2>
      {/if}
      <h2 class="dark:text-white text-md transition-all font-brand" in:fade={{duration: 250}}>{data.project?.description}</h2>
    </div>
  </div>
  <div class="dark:bg-new-white bg-dark-white dark:bg-opacity-10 p-4 rounded-xl mt-8">
      <p class="dark:text-white text-lg font-brand font-light">{data.project?.body}</p>
  </div>
</main>
