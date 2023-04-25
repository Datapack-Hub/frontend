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
    visible = true;
  })();
</script>

<svelte:head>
  <title>{data.project?.title} | Datapack Hub</title>

  <meta property="og:title" content="{data.project?.title} | Datapack Hub" />
  <meta property="og:description" content="{data.project?.description}" />
</svelte:head>

<main
  class="h-screen bg-new-white-200 px-0 transition-all dark:bg-stone-900 sm:px-8 md:px-16 lg:px-24">
  <div class="pt-16"></div>
  <div
    class="flex w-full rounded-xl bg-new-white-300 p-4 dark:bg-new-white-200 dark:bg-opacity-10">
    <img
      src="{data.project?.icon}"
      alt="Icon for {data.project?.title}"
      class="mr-6 h-24 w-24 rounded-lg" />
    <div class="flex-grow">
      <h1 class="font-brand text-5xl font-black dark:text-white">
        {data.project?.title}
      </h1>
      {#if visible}
        <h2
          class="mt-4 font-brand text-xl font-bold transition-all dark:text-white"
          in:fade="{{ duration: 250 }}">
          {author}
        </h2>
      {/if}
      <h2
        class="text-md font-brand transition-all dark:text-white"
        in:fade="{{ duration: 250 }}">
        {data.project?.description}
      </h2>
    </div>
    <a
      href="/download"
      class="text-md float-right m-0 h-min rounded-md bg-dph-orange p-2 font-brand font-bold text-new-white-200 transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl"
      >Download</a>
  </div>
  <div
    class="mt-8 rounded-xl bg-new-white-300 p-4 dark:bg-new-white-200 dark:bg-opacity-10">
    <p class="font-brand text-lg font-light dark:text-white">
      {data.project?.body}
    </p>
  </div>
</main>
