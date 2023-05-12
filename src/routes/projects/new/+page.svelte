<script lang="ts">
  import { categories } from "$lib/globals/consts";

  let selected: { id: number; text: string };
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main
  class="relative -translate-y-20 bg-new-white-200 px-4 transition-all dark:bg-stone-900 md:translate-y-0 lg:px-32 xl:px-64">
  <div class="w-full flex-col items-center md:flex-row md:items-start">
    <h1
      class="pt-8 md:pt-20 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-4xl">
      Create New <span class="text-dph-orange">Datapack</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <p class="pb-4 font-brand dark:text-white">
        Before starting, please read the Site Rules. <b
          >Only upload content that you made yourself or have permission to
          distribute.</b>
      </p>

      <div class=" rounded-xl bg-stone-800 p-2 pb-2">
        <!-- Icon -->
        <p class="align-middle font-brand dark:text-new-white-200">Icon</p>
        <img
          src="https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg"
          alt="Your logo here"
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
          id="title" /><br /><br />

        <!-- Short Description -->
        <p class="align-middle font-brand dark:text-new-white-200">
          Short Description
        </p>
        <textarea
          class="h-24 w-3/4 resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
          placeholder="This short description is used for social media embeds and the listing page."
          id="desc"></textarea
        ><br /><br />

        <!-- Long Description -->
        <p class="align-middle font-brand dark:text-new-white-200">
          Long Description (supports markdown)
        </p>
        <textarea
          class="h-96 w-full resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
          placeholder="Use the long description to tell people how to use your datapack, what it does, etc."
          id="body"></textarea
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
        <p class="align-middle font-brand dark:text-new-white-200">Category</p>
        <select
          class="w-1/4 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
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
  </div>
</main>
<br />
