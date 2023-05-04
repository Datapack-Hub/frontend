<script lang="ts">
  import type { PageData } from "./$types";
  let activePage = "versions";

  let categories = [
    { id: 1, text: `Adventure` },
    { id: 2, text: `Magic` },
    { id: 3, text: `Minecraft, but` },
    { id: 4, text: `Cursed` },
    { id: 5, text: `World Generation` },
    { id: 6, text: `Tools and Equipment` },
    { id: 7, text: `German` },
    { id: 8, text: `Recipe` },
    { id: 9, text: `Quality of Life` },
    { id: 10, text: `Items and Blocks` },
    { id: 11, text: `Cosmetics` },
    { id: 12, text: `Miscellaneous` },
    { id: 13, text: `Utility` },
    { id: 24, text: `Vanilla+` },
  ];
  export let data: PageData;
</script>

<svelte:head>
  <title>Edit Project | Datapack Hub</title>
</svelte:head>

<main
  class="relative bg-new-white-200 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64 -translate-y-20 md:translate-y-0">
  <div class="w-full flex-col items-center md:flex-row md:items-start">
    <h1
      class="mt-8 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-4xl">
      Edit <span class="text-dph-orange">{data.project?.title}</span>
    </h1>
    <br />
    <div class="mb-2 flex space-x-2">
      <button
        class="rounded-xl {activePage === 'details'
          ? 'bg-stone-600'
          : 'bg-stone-800'} cursor-pointer p-1 px-3 font-brand hover:scale-102 dark:text-white"
        on:click="{() => (activePage = 'details')}">Details</button>
      <button
        class="rounded-xl {activePage === 'versions'
          ? 'bg-stone-600'
          : 'bg-stone-800'} cursor-pointer p-1 px-3 font-brand hover:scale-102 dark:text-white"
        on:click="{() => (activePage = 'versions')}">Versions</button>
    </div>

    <!-- DETAILS-->
    {#if activePage == "details"}
      <div class="text-center align-middle md:text-start">
        <div class=" rounded-xl bg-stone-800 p-2 pb-2">
          <!-- Icon -->
          <p class="align-middle font-brand dark:text-new-white-200">Icon</p>
          <img
            src="https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg"
            alt="Your logo"
            height="100"
            width="100"
            class="mr-3 inline-block rounded-2xl" />
          <label for="icon" class="max-w-100 group inline-block">
            <span
              class="cursor-pointer rounded-xl bg-stone-700 p-2 align-middle font-brand dark:text-white"
              >Upload icon</span>
          </label>
          <input id="icon" type="file" class="hidden" />
          <br /><br />

          <!-- Title -->
          <p class="align-middle font-brand dark:text-new-white-200">Title</p>
          <input
            class="h-10 w-1/2 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
            placeholder="Title"
            value="{data.project?.title}"
            id="title" /><br /><br />

          <!-- Short Description -->
          <p class="align-middle font-brand dark:text-new-white-200">
            Short Description
          </p>
          <textarea
            class="h-24 w-3/4 resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
            placeholder="This short description is used for social media embeds and the listing page."
            id="desc"
            value="{data.project?.description}"></textarea
          ><br /><br />

          <!-- Long Description -->
          <p class="align-middle font-brand dark:text-new-white-200">
            Long Description (supports markdown)
          </p>
          <textarea
            class="h-96 w-full resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
            placeholder="Use the long description to tell people how to use your datapack, what it does, etc."
            id="body"
            value="{data.project?.body}"></textarea
          ><br /><br />

          <!-- Downloadable File -->
          <p class="align-middle font-brand dark:text-new-white-200">
            Datapack File Upload
          </p>
          <input
            type="file"
            class="rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
            id="file" /><br /><br />
          <!-- Category -->
          <p class="align-middle font-brand dark:text-new-white-200">
            Category
          </p>
          <select
            class="w-1/4 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
            value="{data.project?.tags}">
            {#each categories as cat}
              <option value="{cat}">
                {cat.text}
              </option>
            {/each}
          </select><br /><br />
          <button
            class="text-md pu-2 my-2 rounded-md border-2 border-red-400 bg-red-400 bg-opacity-10 px-2 pb-1 font-brand text-red-400 transition-all hover:scale-105 active:brightness-75 md:px-3 md:py-2 md:text-lg lg:text-xl">
            Update Project
          </button>
        </div>
      </div>

      <!-- VERSIONS-->
    {:else if activePage == "versions"}
      <div class="text-center align-middle md:text-start">
        <div class=" rounded-xl bg-stone-800 p-2 pb-2">
          <button
            class="rounded-xl bg-green-600 px-2 py-1 font-brand font-bold dark:text-white"
            >Create a version</button>
          <!-- <p class="align-middle font-brand dark:text-new-white-200">No versions yet!</p> -->
        </div>
      </div>
    {/if}
  </div>
</main>
<br />
