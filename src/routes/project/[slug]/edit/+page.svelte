<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import type { PageData } from "./$types";
  import JSZip from "jszip";
  import MultiSelect from "svelte-multiselect";
  import toast from "svelte-french-toast";
  import { apiURL, categories } from "$lib/globals/consts";
  import { goto } from "$app/navigation";

  const ui_libs = [
    "1.13-1.14.4",
    "1.15-1.16.1",
    "1.16.2-1.16.5",
    "1.17.x",
    "1.18.x",
    "1.19-1.19.3",
    "1.19.4"
  ];

  let selected: string[] = [];
  let zipFile: File;
  let activePage = "details";

  export let data: PageData;

  let createVersion = false;

  async function upload() {
    let inp = document.getElementById("zip") as HTMLInputElement;
    if (inp.files) zipFile = inp.files[0];

    if (zipFile?.size > 5e6) {
      toast.error("File size can't be more than 5mb!");
      inp.files = null;
      return;
    }

    let jsZip = new JSZip();

    if (zipFile) {
      let zip = await jsZip.loadAsync(zipFile);
      if (zip.file("pack.mcmeta") == null) {
        return toast.error("Missing pack.mcmeta");
      }

      createVersion = true;
    } else {
      return toast.error("Missing file");
    }
  }

  async function uploadVersion() {
    let v_name = (document.getElementById("v_name") as HTMLInputElement).value;
    let v_code = (document.getElementById("v_code") as HTMLInputElement).value;
    let v_changelog = (
      document.getElementById("v_changelog") as HTMLInputElement
    ).value;
    let v_rp = document.getElementById("v_rp") as HTMLInputElement;

    if (!v_name)
      return toast.error("Please make sure you give a version name!");
    if (!v_code)
      return toast.error("Please make sure you give a version number!");
    if (!v_changelog)
      return toast.error("Please make sure you give a version changelog!");
    if (selected.length == 0) {
      return toast.error(
        "Please select at least one compatible Minecraft version!"
      );
    }

    const dataReader = new FileReader();
    const packReader = new FileReader();
    let transformedFile: string | ArrayBuffer | null;
    dataReader.readAsDataURL(zipFile);

    let versionData;

    dataReader.onload = async () => {
      versionData = {
        name: v_name,
        description: v_changelog,
        minecraft_versions: selected,
        version_code: v_code,
        filename: zipFile.name,
        primary_download: dataReader.result
      };
    };

    dataReader.onerror = () => {
      return toast.error(
        "There was an error handling this resource pack upload!"
      );
    };

    if (v_rp.files?.length == 1) {
      packReader.readAsDataURL(v_rp.files[0]);
      packReader.onload = async () => {
        versionData = {
          name: v_name,
          description: v_changelog,
          minecraft_versions: selected,
          version_code: v_code,
          filename: zipFile.name,
          primary_download: transformedFile,
          resource_pack_download: packReader.result
        };
      };
      packReader.onerror = () => {
        return toast.error(
          "There was an error handling this resource pack upload!"
        );
      };
    }

    let upload = await fetchAuthed(
      "POST",
      `${apiURL}/versions/new/${data.project?.ID}`,
      versionData
    );

    if (upload.ok) {
      toast.success("Posted the version! Refresh to see the latest changes.");
      return (createVersion = false);
    } else {
      let er = await upload.text();
      toast.error(
        "There was an error uploading the file. Please try again later. If the issue persists, please contact an admin. Error: " +
          er
      );
    }
  }
  let titleValue = data.project?.title;
  let descVal = data.project?.description;
  let bodyVal = data.project?.body;
  let catVal = data.project?.category;

  async function create() {
    if ((titleValue?.length ?? 0) < 4)
      return toast.error("Title must be at least 3 characters");
    if ((bodyVal?.length ?? 0) < 101)
      return toast.error("Body must be at least 100 characters");

    let projData = {
      title: titleValue,
      description: descVal,
      body: bodyVal,
      category: catVal
    };

    let x = await fetchAuthed(
      "post",
      apiURL + "/projects/edit/" + data.project?.ID,
      projData
    );
    if (x.ok) {
      goto(".");
      toast.success("Edited project!");
    } else {
      toast.error("oops!");
    }
  }
</script>

<svelte:head>
  <title>Edit Project | Datapack Hub</title>
</svelte:head>

<main
  class="relative bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="pt-8 text-center font-brand text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-4xl lg:text-4xl">
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
        on:click="{() => (activePage = 'versions')}"
        >Versions ({data.versions?.length})</button>
    </div>

    <!-- DETAILS-->
    {#if activePage == "details"}
      <div class="text-center align-middle md:text-start">
        <div class=" rounded-xl bg-stone-800 p-2 pb-2">
          <!-- Icon -->
          <p
            class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
            Icon
          </p>
          <img
            loading="lazy"
            src="{data.project?.icon}"
            alt="Your logo"
            height="100"
            width="100"
            class="mr-3 inline-block rounded-2xl" />
          <label for="icon" class="max-w-100 group inline-block">
            <span
              class="cursor-pointer rounded-xl bg-stone-700 p-2 align-middle font-brand text-pearl-lusta-950 dark:text-white"
              >Upload icon</span>
          </label>
          <input
            id="icon"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            class="hidden" />
          <br /><br />

          <!-- Title -->
          <p
            class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
            Title
          </p>
          <input
            class="h-10 w-1/2 rounded-md bg-pearl-lusta-200 p-2 font-brand text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
            placeholder="Title"
            maxlength="50"
            id="title"
            bind:value="{titleValue}" /><br /><br />

          <!-- Short Description -->
          <p
            class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
            Short Description
          </p>
          <textarea
            class="h-24 w-3/4 resize-none rounded-md bg-pearl-lusta-200 p-2 font-brand text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
            placeholder="This short description is used for social media embeds and the listing page."
            id="desc"
            maxlength="200"
            bind:value="{descVal}"></textarea
          ><br /><br />

          <!-- Long Description -->
          <p
            class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
            Long Description (supports markdown)
          </p>
          <textarea
            class="h-96 w-full resize-none rounded-md bg-pearl-lusta-200 p-2 font-brand text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
            placeholder="Use the long description to tell people how to use your datapack, what it does, etc."
            id="body"
            maxlength="2000"
            bind:value="{bodyVal}"></textarea
          ><br /><br />
          <!-- Category -->
          <p
            class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
            Category
          </p>
          <select
            class="bg-new-white-300 w-1/4 rounded-md p-2 font-brand text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
            bind:value="{catVal}">
            {#each categories as cat}
              <option value="{cat.id}">
                {cat.text}
              </option>
            {/each}
          </select><br /><br />
          <button
            class="text-md pu-2 my-2 rounded-md border-2 border-red-400 bg-red-400 bg-opacity-10 px-2 pb-1 font-brand text-red-400 transition-all hover:scale-105 active:brightness-75 md:px-3 md:py-2 md:text-lg lg:text-xl"
            on:click="{create}">
            Update Project
          </button>
        </div>
      </div>

      <!-- VERSIONS-->
    {:else if activePage == "versions"}
      <div class="text-center align-middle md:text-start">
        {#if createVersion == false}
          <div
            class="my-2 flex space-x-2 rounded-xl bg-pearl-lusta-200 p-2 py-3 dark:bg-stone-800">
            <label for="zip" class="max-w-100">
              <span class="button-style cursor-pointer"
                >Upload datapack file</span>
            </label>
            <input
              type="file"
              class="hidden"
              accept=".zip"
              id="zip"
              on:input="{upload}" />
            <span
              class="align-center font-brand text-pearl-lusta-950 dark:text-white"
              >(Supported: *.zip)</span>
            <!-- <p class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">No versions yet!</p> -->
          </div>
        {:else}
          {@const ver = (Math.random() * 10).toFixed(1)}
          <div class="my-2 rounded-xl bg-pearl-lusta-200 p-2 dark:bg-stone-800">
            <button
              class="float-right cursor-pointer select-none font-black text-pearl-lusta-950 dark:text-white"
              on:click="{() => (createVersion = false)}">X</button>
            <h2
              class="mb-2 font-brand text-xl font-bold text-pearl-lusta-950 dark:text-white">
              Creating new Version
            </h2>

            <div class="flex space-x-4">
              <p
                class="w-1/2 align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
                Version Name
              </p>
              <p
                class="w-1/2 align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
                Version Number
              </p>
            </div>
            <div class="flex space-x-2">
              <input
                class="mb-4 h-10 w-1/2 rounded-md bg-pearl-lusta-300 p-2 font-brand text-lg text-pearl-lusta-950 placeholder:text-pearl-lusta-100 dark:bg-stone-700 dark:text-white"
                placeholder="{data.project?.title} v{ver}"
                maxlength="50"
                id="v_name" />
              <input
                class="mb-4 h-10 w-1/6 rounded-md bg-pearl-lusta-300 p-2 font-brand text-lg text-pearl-lusta-950 placeholder:text-pearl-lusta-100 dark:bg-stone-700 dark:text-white"
                placeholder="v{ver}"
                maxlength="15"
                id="v_code" />
            </div>

            <p
              class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
              Changelog (supports markdown!)
            </p>
            <textarea
              class="mb-4 h-36 w-3/4 resize-none rounded-md bg-pearl-lusta-300 p-2 font-brand text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
              placeholder="This update changes..."
              id="v_changelog"
              maxlength="2000"></textarea>

            <p
              class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
              Minecraft Versions
            </p>
            <MultiSelect
              bind:selected="{selected}"
              options="{ui_libs}"
              liSelectedClass="liSelectedClass" />
            <p class="mb-4"></p>

            <p
              class="align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
              Resource Pack Download (optional)
            </p>
            <input
              type="file"
              id="v_rp"
              class="mb-4 rounded-xl bg-pearl-lusta-300 p-2 font-brand text-pearl-lusta-950 dark:bg-stone-700 dark:text-white" />
            <p></p>
            <button class="button-style" on:click="{uploadVersion}"
              >Create Version</button>
          </div>
        {/if}
        {#each data.versions ?? [] as version}
          <div
            class="mb-2 flex items-center space-x-3 rounded-xl bg-pearl-lusta-200 p-2 last:mb-0 dark:bg-pearl-lusta-100/10">
            <div class="flex w-1/3 items-center space-x-2">
              <h2
                class="font-brand text-xl font-bold text-pearl-lusta-950 dark:text-white">
                {version.name}
              </h2>
              <h2
                class="font-brand text-base font-thin italic text-pearl-lusta-950 dark:text-white">
                {version.version_code}
              </h2>
            </div>
            <h2
              class="flex flex-grow space-x-1 font-brand text-pearl-lusta-950 dark:text-white">
              {#each version.minecraft_versions.split(",") ?? [] as mcv}
                <button
                  class="rounded-lg border-2 border-dph-orange bg-dph-orange/25 px-1">
                  {mcv}
                </button>
              {/each}
            </h2>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>
<br />

<style lang="postcss">
  :root {
    --sms-bg: theme(colors.stone.700);
    --sms-border: 0px solid theme(colors.stone.700);
    --sms-selected-bg: theme(colors.stone.700);
    --sms-remove-btn-hover-bg: theme(colors.orange.500);
    --sms-options-bg: theme(colors.stone.700);
    --sms-text-color: theme(colors.white);
  }
</style>
