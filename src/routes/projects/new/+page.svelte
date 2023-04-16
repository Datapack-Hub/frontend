<script lang="ts">
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

  let selected: { id: number; text: string };
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main
  class="overflow-y-scroll bg-new-white-200 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="h-screen w-full flex-col items-center md:flex-row md:items-start">
    <h1
      class="mt-8 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-4xl">
      Create New <span class="text-orange-500">Datapack</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <p class="pb-4 font-brand dark:text-white">
        Before starting, please read the Site Rules. <b
          >Only upload content that you made yourself or have permission to
          distribute.</b>
      </p>
      <!-- Title -->
      <p class="align-middle font-brand dark:text-new-white-200">Title</p>
      <input
        class="h-10 w-1/2 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        placeholder="Title"
        id="title" /><br /><br />

      <!-- Short Description -->
      <p class="align-middle font-brand dark:text-new-white-200">
        Short Description
      </p>
      <textarea
        class="h-24 w-3/4 resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        placeholder="This short description is used for social media embeds and the listing page."
        id="desc"></textarea
      ><br /><br />

      <!-- Long Description -->
      <p class="align-middle font-brand dark:text-new-white-200">
        Long Description (supports markdown)
      </p>
      <textarea
        class="h-96 w-full resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        placeholder="Use the long description to tell people how to use your datapack, what it does, etc."
        id="body"></textarea
      ><br /><br />

      <!-- Downloadable File -->
      <p class="align-middle font-brand dark:text-new-white-200">
        Datapack File Upload
      </p>
      <input
        type="file"
        class="rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        id="file" /><br /><br />
      <!-- Category -->
      <p class="align-middle font-brand dark:text-new-white-200">Category</p>
      <select
        class="w-1/4 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        value="{selected}">
        {#each categories as cat}
          <option value="{cat}">
            {cat.text}
          </option>
        {/each}
      </select><br /><br />
      <button
        class="text-md my-2 rounded-md border-2 border-red-400 bg-red-400 bg-opacity-10 px-2 py-2 font-brand text-red-400 transition-all hover:scale-105 active:brightness-75 md:px-3 md:py-2 md:text-lg lg:text-xl">
        Create
      </button>
    </div>
  </div>
</main>
