<script lang="ts">
  import type { PageData } from "./$types";

  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  import Button from "$lib/components/Button.svelte";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import MarkdownComponent from "$lib/components/MarkdownComponent.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";

  import { categories, versions } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";

  import autoAnimate from "@formkit/auto-animate";
  import JSZip from "jszip";
  import toast from "svelte-french-toast";
  import MultiSelect from "svelte-multiselect";

  import IconTick from "~icons/tabler/Check.svelte";
  import IconDraft from "~icons/tabler/FileOff.svelte";

  let publishModal: Modal;
  let draftModal: Modal;

  let selected: string[] = [];
  let zipFile: File;
  let activePage = "details";

  export let data: PageData;

  let createVersion = false;

  async function upload() {
    if (browser) {
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
  }

  const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });

  async function uploadVersion() {
    let v_name = (document.getElementById("v_name") as HTMLInputElement).value;
    let v_code = (document.getElementById("v_code") as HTMLInputElement).value;
    let v_changelog = (
      document.getElementById("v_changelog") as HTMLInputElement
    ).value;
    let v_rp = document.getElementById("v_rp") as HTMLInputElement;
    let v_squash = document.getElementById("squash") as HTMLInputElement;

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

    let versionData = {
      name: v_name,
      description: v_changelog,
      minecraft_versions: selected,
      version_code: v_code,
      filename: zipFile.name,
      primary_download: "",
      resource_pack_download: "",
      squash: v_squash.checked
    };

    let dp = await toBase64(zipFile)
    versionData.primary_download = dp

    if (v_rp.files?.length == 1) {
      let rp = await toBase64(v_rp.files[0]);
      versionData.resource_pack_download = rp
    }

    toast.promise(
      fetchAuthed(
        "POST",
        `/versions/new/${data.project?.ID}`,
        versionData
      ),
      {
        success:"Uploaded! Refresh to see changes.",
        error:"Something went wrong.",
        loading:"Uploading file..."
      }
    )
  }

  let titleValue = data.project?.title;
  let descVal = data.project?.description;
  let bodyVal = data.project?.body;
  let catVal = data.project?.category;
  let iconVal: FileList;
  let iconElem: HTMLImageElement;
  let iconB64: string | ArrayBuffer | null | undefined;

  function uploadIcon() {
    if (iconVal[0].size > 256000) {
      return toast.error("Icon must be less than 256kb");
    }
    let reader = new FileReader();

    iconElem.src = URL.createObjectURL(iconVal[0]);
    reader.addEventListener("load", e => {
      iconB64 = e.target?.result;
    });
    reader.readAsDataURL(iconVal[0]);
  }

  async function create() {
    if ((titleValue?.length ?? 0) < 4)
      return toast.error("Title must be at least 3 characters");
    if ((bodyVal?.length ?? 0) < 101)
      return toast.error("Body must be at least 100 characters");

    let projData: {
      title: string | undefined;
      description: string | undefined | null;
      body: string | undefined;
      category: string | undefined;
      icon?: string | ArrayBuffer | null | undefined;
    } = {
      title: titleValue,
      description: descVal,
      body: bodyVal,
      category: catVal
    };

    if (iconB64) {
      projData["icon"] = iconB64?.toString();
    }

    let x = await fetchAuthed(
      "post",
      "/projects/edit/" + data.project?.ID,
      projData
    );
    if (x.ok) {
      goto(".");
      toast.success("Edited project!");
    } else {
      toast.error("oops!");
    }
  }

  async function publish() {
    publishModal.close();
    let pub = await fetchAuthed(
      "post",
      "/projects/id/" + data.project?.ID + "/publish"
    );
    if (pub.ok) {
      let t = await pub.text();
      toast.success(t);
      goto(".");
    }
  }

  async function draft() {
    draftModal.close();
    let dra = await fetchAuthed(
      "post",
      "/projects/id/" + data.project?.ID + "/draft"
    );
    if (dra.ok) {
      let t = await dra.text();
      toast.success(t);
      goto(".");
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
      class="pt-8 text-center text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-4xl lg:text-4xl">
      Edit <span class="text-dph-orange">{data.project?.title}</span>
    </h1>
    {#if data.project?.mod_message}
      <div
        class="mt-2 rounded-xl bg-pearl-lusta-200 p-4 dark:bg-red-500/20 dark:text-pearl-lusta-100">
        <p class=" font-black">Message from Datapack Hub Staff:</p>
        <p
          class="prose mb-1 mt-2 rounded-xl bg-red-500/30 p-2 dark:text-stone-300">
          <MarkdownComponent source="{data.project?.mod_message}" />
        </p>
      </div>
    {/if}
    <div class="mb-2 mt-2 flex space-x-2">
      <button
        class="{activePage === 'details'
          ? 'bg-stone-600'
          : 'bg-stone-800'} button-base"
        on:click="{() => (activePage = 'details')}">Details</button>
      <div class="flex-grow">
        <button
          class="{activePage === 'versions'
            ? 'bg-stone-600'
            : 'bg-stone-800'} button-base"
          on:click="{() => (activePage = 'versions')}"
          >Versions ({data.versions?.length})</button>
      </div>
      {#if ["draft", "unpublished", "disabled"].includes(data.project?.status ?? "draft")}
        <button
          class="button-base flex items-center space-x-1 bg-green-600"
          on:click="{() => publishModal.open()}"
          ><IconTick /><span>Publish Project</span></button>
      {:else if data.project?.status == "live"}
        <button
          class="button-base flex items-center space-x-1 bg-stone-600"
          on:click="{() => draftModal.open()}"
          ><IconDraft /><span>Draft submission</span></button>
      {/if}
    </div>

    <!-- DETAILS-->
    <div use:autoAnimate>
      {#if activePage == "details"}
        <div class="text-center align-middle md:text-start">
          <div class=" rounded-xl bg-stone-800 p-2 pb-2">
            <!--meanwhile, bean-->
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
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
            <label for="icon" class="button-boring">Upload Icon</label>
            <input
              accept="image/*"
              id="icon"
              type="file"
              class="hidden"
              bind:files="{iconVal}"
              on:change="{uploadIcon}" />
            <br /><br />

            <!-- Title -->
            <p class="align-middle text-dph-orange">Title</p>
            <input
              class="h-10 w-1/2 rounded-md bg-pearl-lusta-200 p-2 text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
              placeholder="Title"
              maxlength="50"
              id="title"
              bind:value="{titleValue}" /><br /><br />

            <!-- Short Description -->
            <p class="align-middle text-dph-orange">Short Description</p>
            <textarea
              class="h-24 w-3/4 resize-none rounded-md bg-pearl-lusta-200 p-2 text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
              placeholder="This short description is used for social media embeds and the listing page."
              id="desc"
              maxlength="200"
              bind:value="{descVal}"></textarea
            ><br /><br />

            <!-- Long Description -->
            <p class="align-middle text-dph-orange">
              Long Description (supports markdown)
            </p>
            <textarea
              class="h-96 w-full resize-none rounded-md bg-pearl-lusta-200 p-2 text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
              placeholder="Use the long description to tell people how to use your datapack, what it does, etc."
              id="body"
              bind:value="{bodyVal}"
              maxlength="10000"></textarea
            ><br /><br />
            <!-- Category -->
            <p class="align-middle text-dph-orange">Category</p>
            <select
              class="bg-new-white-300 w-1/4 rounded-md p-2 text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
              bind:value="{catVal}">
              {#each categories as cat}
                <option value="{cat}">
                  {cat}
                </option>
              {/each}
            </select><br /><br />
            <Button click="{create}">Update Project</Button>
          </div>
        </div>

        <!-- VERSIONS-->
      {:else if activePage == "versions"}
        <div class="text-center align-middle md:text-start">
          {#if createVersion == false}
            <div
              class="my-2 flex space-x-2 rounded-xl bg-pearl-lusta-200 p-2 py-3 dark:bg-stone-800">
              <label for="zip" class="max-w-100">
                <span class="button-primary cursor-pointer"
                  >Upload datapack file</span>
              </label>
              <input
                type="file"
                class="hidden"
                accept=".zip"
                id="zip"
                on:input="{upload}" />
              <span class="align-center text-pearl-lusta-950 dark:text-white"
                >(Supported: *.zip)</span>
              <!-- <p class="align-middle  text-pearl-lusta-950 dark:text-pearl-lusta-100">No versions yet!</p> -->
            </div>
          {:else}
            {@const ver = (Math.random() * 10).toFixed(1)}
            <div
              class="my-2 rounded-xl bg-pearl-lusta-200 p-2 dark:bg-stone-800">
              <button
                class="float-right cursor-pointer select-none font-black text-pearl-lusta-950 dark:text-white"
                on:click="{() => (createVersion = false)}">X</button>
              <h2
                class="mb-2 text-xl font-bold text-pearl-lusta-950 dark:text-white">
                Creating new Version
              </h2>

              <div class="flex space-x-4">
                <p
                  class="w-1/2 align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
                  Version Name
                </p>
                <p
                  class="w-1/2 align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
                  Version Number
                </p>
              </div>
              <div class="flex space-x-2">
                <input
                  class="mb-4 h-10 w-1/2 rounded-md bg-pearl-lusta-300 p-2 text-lg text-pearl-lusta-950 placeholder:text-pearl-lusta-100 dark:bg-stone-700 dark:text-white"
                  placeholder="{data.project?.title} v{ver}"
                  maxlength="50"
                  id="v_name" />
                <input
                  class="mb-4 h-10 w-1/6 rounded-md bg-pearl-lusta-300 p-2 text-lg text-pearl-lusta-950 placeholder:text-pearl-lusta-100 dark:bg-stone-700 dark:text-white"
                  placeholder="v{ver}"
                  maxlength="15"
                  id="v_code" />
              </div>

              <p
                class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
                Changelog (supports markdown!)
              </p>
              <textarea
                class="mb-4 h-36 w-3/4 resize-none rounded-md bg-pearl-lusta-300 p-2 text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
                placeholder="This update changes..."
                id="v_changelog"
                maxlength="2000"></textarea>

              <p
                class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
                Minecraft Versions
              </p>
              <MultiSelect
                bind:selected="{selected}"
                options="{versions}"
                liSelectedClass="liSelectedClass" />
              <p class="mb-4"></p>

              <p
                class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
                Resource Pack Download (optional)
              </p>
              <input
                type="file"
                id="v_rp"
                class="mb-4 rounded-xl bg-pearl-lusta-300 p-2 text-pearl-lusta-950 dark:bg-stone-700 dark:text-white" />
              <p></p>
              <div class=" mb-4">
                <input name="squash" id="squash" type="checkbox" />
                <label
                  for="squash"
                  class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
                  Squash datapack. (This compresses the zip file, making it load
                  faster in game)
                </label>
              </div>
              <Button click="{uploadVersion}">Create Version</Button>
            </div>
          {/if}
          <div class="space-y-2">
            {#each data.versions ?? [] as version}
              <VersionDisplay
                version="{version}"
                modifiable="{true}"
                project="{data.project}" />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
<br />

<Modal bind:this="{publishModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Publish {data.project?.title}
  </h1>
  <CasualLine />
  <p class="mb-2 dark:text-white">
    Your project is currently: {data.project?.status}. If this project has not
    been published before, then it will be reviewed by a moderator before going
    live.
  </p>
  <p class="mb-2 dark:text-white">
    By publishing this project, you agree that it follows the rules.
  </p>
  <button
    class="button-base flex items-center space-x-1 bg-green-600"
    on:click="{publish}"><IconTick /><span>Publish Project</span></button>
</Modal>

<Modal bind:this="{draftModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Draft {data.project?.title}
  </h1>
  <CasualLine />
  <p class="mb-2 dark:text-white">
    Your project is currently {data.project?.status}.
  </p>
  <p class="mb-2 dark:text-white">
    When you draft a project, it will become private, and removed from search
    engines if drafted for long enough. You will be able to restore the
    submission at any point.
  </p>
  <button
    class="button-base flex items-center space-x-1 bg-stone-600"
    on:click="{draft}"><IconDraft /><span>Draft submission</span></button>
</Modal>

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
