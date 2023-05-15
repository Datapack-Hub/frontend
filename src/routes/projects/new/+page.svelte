<script lang="ts">
  import { categories } from "$lib/globals/consts";

  let IconEl = document.getElementById("icon") as HTMLInputElement
  let TitleEl = document.getElementById("title") as HTMLInputElement
  let DescEl = document.getElementById("description") as HTMLInputElement
  let BodyEl = document.getElementById("body") as HTMLInputElement
  let selected: { id: number; text: string };

  async function create() {
    let projdata = {
      "type":"datapack",
      "url":TitleEl.value.toLowerCase().replaceAll(" ","-"),
      "title":TitleEl.value,
      "description":DescEl.value,
      "body":BodyEl.value,
      "category":selected.text
    }
  }
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main
  class="bg-new-white-200 relative px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="pt-8 text-center font-brand text-5xl font-bold text-pearl-lusta-950 dark:text-white md:pt-20 md:text-start md:text-4xl lg:text-4xl">
      Create New <span class="text-dph-orange">Datapack</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <p
        class="pb-4 font-brand text-pearl-lusta-950 opacity-60 dark:text-white">
        Before starting, please read the Site Rules. <b
          >Only upload content that you made yourself or have permission to
          distribute.</b>
      </p>

      <div class=" rounded-xl bg-pearl-lusta-200 p-2 pb-2 dark:bg-stone-800">
        <!-- Icon -->
        <p
          class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Icon
        </p>
        <img
          src="https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg"
          alt="Your logo here"
          height="100"
          width="100"
          class="mr-3 inline-block rounded-2xl"
          id="iconimg" />
        <label for="icon" class="button-boring">Upload Icon </label>
        <input id="icon" type="file" class="hidden" on:change={() => {
          document.getElementById("iconimg").src = URL.createObjectURL(document.getElementById("icon").files[0])
        }}/>
        <br /><br />

        <!-- Title -->
        <p
          class="align-middle font-brand text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Title
        </p>
        <input
          class="input-base override-input-outline h-10 w-1/2 rounded-md bg-pearl-lusta-300 p-2 font-brand"
          placeholder="Title"
          id="title"
          maxlength="50" /><br /><br />

        <!-- Short Description -->
        <p
          class="align-middle font-brand text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Short Description
        </p>
        <textarea
          class="input-base override-input-outline h-24 w-3/4 resize-none rounded-md bg-pearl-lusta-300 p-2 font-brand"
          placeholder="This short description is used for social media embeds and the listing page."
          id="description"
          maxlength="200"></textarea
        ><br /><br />

        <!-- Long Description -->
        <p
          class="align-middle font-brand text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Long Description (supports markdown)
        </p>
        <textarea
          class="input-base override-input-outline h-96 w-full resize-none rounded-md bg-pearl-lusta-300 p-2 font-brand"
          placeholder="Use the long description to tell people how to use your datapack, what it does, etc."
          id="body"
          maxlength="2000"></textarea
        ><br /><br />

        <!-- Category -->
        <p
          class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Category
        </p>
        <select
          class="input-base override-input-outline w-1/4 rounded-md bg-pearl-lusta-300 p-2 font-brand text-lg"
          value="{selected}">
          {#each categories as cat}
            <option value="{cat}">
              {cat.text}
            </option>
          {/each}
        </select><br /><br />

        <p class="align-middle font-brand dark:text-pearl-lusta-100">
          You'll be able to edit more project details once you've created the project.
        </p>

        <button
          class="text-md mt-2 rounded-md border-2 border-red-400 bg-red-400 bg-opacity-10 px-2 py-2 font-brand text-red-400 transition-all hover:scale-105 active:brightness-75 md:px-3 md:py-2 md:text-lg lg:text-xl">
          Create Project
        </button>
      </div>
    </div>
  </div>
</main>
<br />

<style lang="postcss">
  .input-base {
    @apply text-pearl-lusta-950 transition-all placeholder:text-pearl-lusta-950 placeholder:text-opacity-40 hover:placeholder:text-opacity-60 dark:bg-stone-700 dark:placeholder:text-pearl-lusta-100 dark:placeholder:text-opacity-40 dark:hover:placeholder:text-opacity-60;
  }
</style>
