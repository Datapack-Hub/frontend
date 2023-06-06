<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { categories } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";

  let iconVal: FileList;
  let iconElem: HTMLImageElement;
  let titleVal = "";
  let descVal = "";
  let bodyVal = "";
  // let cat = document.getElementById("cat") as HTMLSelectElement

  async function create() {
    let projData = {
      type: "datapack",
      url: titleVal.toLowerCase().replaceAll(" ", "-"),
      title: titleVal,
      description: descVal,
      body: bodyVal,
      category: "German"
    };

    await fetchAuthed("post", "/projects/create", projData);
  }

  function uploadIcon() {
    iconElem.src = URL.createObjectURL(iconVal[0]);
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
      <p class="pb-4 font-brand text-pearl-lusta-950/60 dark:text-white/60">
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
          loading="lazy"
          src="https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg"
          alt="Your logo here"
          height="100"
          width="100"
          class="mr-3 inline-block rounded-2xl"
          bind:this="{iconElem}" />
        <label for="icon" class="button-boring">Upload Icon </label>
        <input
          id="icon"
          type="file"
          class="hidden"
          bind:files="{iconVal}"
          on:change="{uploadIcon}" />
        <br /><br />

        <!-- Title -->
        <p
          class="align-middle font-brand text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Title
        </p>
        <input
          class="input-base override-input-outline h-10 w-1/2 rounded-md bg-pearl-lusta-300 p-2 font-brand"
          placeholder="Title"
          bind:value="{titleVal}"
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
          bind:value="{descVal}"
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
          bind:value="{bodyVal}"
          maxlength="10000"></textarea
        ><br /><br />

        <!-- Category -->
        <p
          class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Category
        </p>
        <select
          class="input-base override-input-outline w-1/4 rounded-md bg-pearl-lusta-300 p-2 font-brand text-lg"
          id="cat">
          {#each categories as cat}
            <option value="{cat}">
              {cat}
            </option>
          {/each}
        </select><br /><br />

        <p class="align-middle font-brand dark:text-pearl-lusta-100">
          You'll be able to edit more project details once you've created the
          project.
        </p>

        <Button style="alt" click="{create}">Create Project</Button>
      </div>
    </div>
  </div>
</main>
<br />

<style lang="postcss">
  /* .input-base {
    @apply text-pearl-lusta-950 transition-all placeholder:text-pearl-lusta-950/40 hover:placeholder:text-pearl-lusta-950/60 dark:bg-stone-700 dark:text-pearl-lusta-100 dark:placeholder:text-pearl-lusta-100/40 dark:hover:placeholder:text-pearl-lusta-100/60;
  } */
</style>
