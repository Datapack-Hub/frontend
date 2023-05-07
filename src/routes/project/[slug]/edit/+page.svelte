<script lang="ts">
  import CasualLine from "$components/CasualLine.svelte";
  import Modal from "$components/modals/Modal.svelte";
  import type { PageData } from "./$types";
  import JSZip from 'jszip'

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

  let createVersion: boolean = true;

  // modals
  let newVersion: Modal;

  async function upload() {
    let zipFile = (
      document.getElementById("zip") as HTMLInputElement
    ).files?.item(0);

    let jsZip = new JSZip()

    if (zipFile) {
      let zip = await jsZip.loadAsync(zipFile)
      if (zip.file("pack.mcmeta") == null) return alert("Missing pack.mcmeta");
      
      createVersion = true
    } else {
      alert("undefined file");
    }
  }
</script>

<svelte:head>
  <title>Edit Project | Datapack Hub</title>
</svelte:head>

<main
  class="relative bg-new-white-200 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="pt-8 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-4xl">
      Edit <span class="text-dph-orange">{data.project?.title}</span>
    </h1>
    <br />
    <div class="mb-2 flex space-x-2">
      <button
        class="{activePage === 'details'
          ? 'bg-stone-600'
          : 'bg-stone-800'} button-base"
        on:click="{() => (activePage = 'details')}">Details</button>
      <button
        class="{activePage === 'versions'
          ? 'bg-stone-600'
          : 'bg-stone-800'} button-base"
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
        <div class="flex space-x-2 rounded-xl bg-stone-800 p-2 py-3 my-2">
          <label for="zip" class="max-w-100">
            <span
              class="cursor-pointer rounded-xl bg-green-600 p-2 font-brand font-bold dark:text-white"
              >Upload datapack ZIP</span>
          </label>
          <input
            type="file"
            class="hidden"
            accept=".zip"
            id="zip"
            on:input="{upload}" />
          <span class="align-center font-brand dark:text-white"
            >(Supported: *.zip)</span>
          <!-- <p class="align-middle font-brand dark:text-new-white-200">No versions yet!</p> -->
        </div>
        {#if createVersion == true}
          <div class="rounded-xl bg-stone-800 p-2">
            <h2 class="font-brand dark:text-white text-xl mb-2 font-bold">Creating new Version</h2>

            <div class="flex space-x-4">
              <p class="align-middle font-brand dark:text-new-white-200 w-1/2">Version Name</p>
              <p class="align-middle font-brand dark:text-new-white-200 w-1/2">Version Number</p>
            </div>
            <div class="flex space-x-2">
              <input
              class="h-10 w-1/2 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white mb-4"
              placeholder="{data.project?.title} v4.5"
              id="v_name" />
              <input
              class="h-10 w-1/6 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white mb-4"
              placeholder="4.5"
              id="v_name" />
            </div>
            
            <p class="align-middle font-brand dark:text-new-white-200">Changelog (supports markdown!)</p>
            <textarea
            class="h-36 w-3/4 resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
            placeholder="This update changes..."
            id="v_changelog"></textarea>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>
<br />

<Modal bind:this="{newVersion}">
  <h1 class="font-brand text-xl font-bold dark:text-white">
    Create a New Version
  </h1>
  <CasualLine />
  <!-- <p class="dark:text-white font-brand">Upload a file here, and give your version a name. You'll be able to change more details later.</p> -->
  <p class="align-middle font-brand dark:text-new-white-200">Version Name</p>
  <input
    class="mb-2 h-10 w-full rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
    placeholder="Burnt Cake Update"
    id="title" />
  <p class="align-middle font-brand dark:text-new-white-200">
    Drag to upload a file.
  </p>
  <label for="zip" class="max-w-100">
    <span
      class="mb-2 cursor-pointer rounded-xl bg-stone-700 p-2 align-middle font-brand hover:bg-stone-600 dark:text-white"
      >Upload datapack ZIP</span>
  </label>
  <input id="zip" type="file" class="hidden" accept=".zip" />
  <p class="font-brand dark:text-white">
    Your file will be automatically compressed to reduce file size.
  </p>
</Modal>
