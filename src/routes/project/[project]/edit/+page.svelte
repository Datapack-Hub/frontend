<script lang="ts">
  import type { PageData } from "./$types";

  import { browser } from "$app/environment";
  import { afterNavigate, goto } from "$app/navigation";

  import Button from "$lib/components/decorative/Button.svelte";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";

  import { API, categories, minecraftVersions } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";

  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";

  import AutoAdjustableInput from "$lib/components/utility/AutoAdjustableInput.svelte";
  import { projectSchema, type Project } from "$lib/globals/schema";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import IconAttr from "~icons/tabler/At.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import {
    default as IconNC,
    default as IconND
  } from "~icons/tabler/CoinOff.svelte";
  import IconDraft from "~icons/tabler/FileOff.svelte";
  import IconLink from "~icons/tabler/Link.svelte";
  import IconEdit from "~icons/tabler/Pencil.svelte";
  import IconSA from "~icons/tabler/Repeat.svelte";
  import IconNoIcon from "~icons/tabler/Upload.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
  import { list } from "radash";
  import { MultiSelect } from "svelte-multiselect";
  import ToggleBoxes from "$lib/components/utility/ToggleBoxes.svelte";

  let publishModal: Modal;
  let draftModal: Modal;
  let deleteModal: Modal;

  let selected: string[] = [];
  let zipFile: File;
  let activePage = "details";

  export let data: PageData;

  let createVersion = false;

  let titleValue = data.project?.title;
  let descValue = data.project?.description;
  let bodyValue = data.project?.body;
  let iconValue: FileList;
  let iconB64: string | ArrayBuffer | null | undefined;
  let iconImg: string;

  let category: Writable<string[]> = writable([]);

  let v_changelog = "";

  let dependencies: Project[] = [];
  let dependencyNames: string[] = [""];

  onMount(() => {
    $category = [];
  });

  afterNavigate(() => {
    $category = [];
  });

  function maxCategoriesReached() {
    toast.error("Max Categories Reached");
  }

  async function uploadDatapack() {
    if (browser) {
      let inp = document.querySelector("#zip") as HTMLInputElement;
      if (inp.files) zipFile = inp.files[0];

      if (zipFile?.size > 5e6) {
        toast.error("File size can't be more than 5mb!");
        return;
      }

      if (zipFile) {
        let { loadAsync } = await import("jszip");
        let zip = await loadAsync(zipFile);
        if (zip.file("pack.mcmeta") == undefined) {
          return toast.error("Missing pack.mcmeta");
        }

        createVersion = true;
      } else {
        return toast.error("Missing file");
      }
    }
  }

  const toBase64 = (file: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.addEventListener("error", () => reject);
    });

  async function uploadVersion() {
    let v_name = (document.querySelector("#v_name") as HTMLInputElement).value;
    let v_code = (document.querySelector("#v_code") as HTMLInputElement).value;
    let v_rp = document.querySelector("#v_rp") as HTMLInputElement;
    let v_squash = document.querySelector("#squash") as HTMLInputElement;

    if (!v_name) return toast("Please make sure you give a version name!");
    if (!v_code) return toast("Please make sure you give a version number!");
    if (!v_changelog)
      return toast("Please make sure you give a version changelog!");
    if (selected.length === 0) {
      return toast("Please select at least one compatible Minecraft version!");
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
      // dependencies // <-- uncomment to implement
    };

    let dp = await toBase64(zipFile);
    versionData.primary_download = dp;

    if (v_rp.files?.length == 1) {
      let rp = await toBase64(v_rp.files[0]);
      versionData.resource_pack_download = rp;
    }

    toast.promise(
      fetchAuthed(
        "POST",
        `/versions/new/${data.project?.ID}`,
        versionData
      ).then(() => goto(".")),
      {
        success: "Uploaded! Refreshing...",
        error: "Something went wrong.",
        loading: "Uploading file..."
      }
    );
  }

  function uploadIcon() {
    if (iconValue[0].size > 256_000) {
      return toast.error("Icon must be less than 256kb");
    }

    if (
      !["png", "jpg", "webp", "gif", "avif"].includes(
        iconValue[0].name.split(".").at(-1)?.toLowerCase() ?? "null"
      )
    ) {
      return toast.error("Unsupported file type");
    }

    let reader = new FileReader();

    reader.readAsDataURL(iconValue[0]);

    reader.addEventListener("load", event => {
      iconB64 = event.target?.result;
      iconImg = URL.createObjectURL(iconValue[0]);
    });
  }

  async function update() {
    if ((titleValue?.length ?? 0) < 4)
      return toast.error("Title must be at least 3 characters");
    if ((bodyValue?.length ?? 0) < 101)
      return toast.error("Body must be at least 100 characters");

    let projData: {
      title: string | undefined;
      description: string | undefined | null;
      body: string | undefined;
      category: string[] | undefined;
      icon?: string | ArrayBuffer | null | undefined;
    } = {
      title: titleValue,
      description: descValue,
      body: bodyValue,
      category: $category.length === 0 ? data.project?.category : $category,
      icon: iconB64
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

  async function remove() {
    deleteModal.close();
    let dra = await fetchAuthed(
      "post",
      "/projects/id/" + data.project?.ID + "/remove"
    );
    if (dra.ok) {
      let t = await dra.text();
      toast.success(t);
      goto("/");
    }
  }

  function dependencyHandler(v: string, index: number) {
    dependencyNames[index] = v;
    if (dependencyNames.length == index) dependencyNames.push("");
    dependencyNames = dependencyNames.slice(0, 4);
    resolveDependency(v, index);
  }

  async function resolveDependency(v: string, index: number) {
    let search = await fetch(`${API}/projects/search?query=${v}`);
    let searchJson = await search.json();
    let projects = await projectSchema.array().parseAsync(searchJson.result);

    for (const project of projects) {
      if (project.url == v) {
        dependencies[index] = project;
      }
    }
  }
</script>

<svelte:head>
  <title>Edit Project | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class="relative bg-slate-50 px-4 transition-all dark:bg-stone-900 sm:px-8 lg:px-16 xl:px-24">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="pt-8 text-center text-5xl font-bold text-slate-950 dark:text-slate-100 md:text-start md:text-4xl lg:text-4xl">
      Edit <span class="text-dph-orange">{data.project?.title}</span>
    </h1>
    {#if data.project?.mod_message}
      <div
        class="mt-2 rounded-xl bg-slate-200 p-4 dark:bg-red-500/20 dark:text-slate-100">
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
          ? 'bg-slate-200 dark:bg-stone-600'
          : 'bg-slate-300 dark:bg-stone-800'} button-base"
        on:click="{() => (activePage = 'details')}">Details</button>
      <div class="flex-grow">
        <button
          class="{activePage === 'versions'
            ? 'bg-slate-200 dark:bg-stone-600'
            : 'bg-slate-300 dark:bg-stone-800'} button-base"
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
      <button
        class="button-base flex items-center space-x-1 bg-red-600"
        on:click="{() => deleteModal.open()}"><IconDelete /></button>
    </div>

    <!-- DETAILS-->
    <div use:autoAnimate>
      {#if activePage == "details"}
        <div
          class="grid grid-cols-2 lg:grid-cols-3 gap-2 rounded-xl p-3 text-center align-middle md:text-start space-y-2 bg-slate-200 dark:bg-stone-800">
          <div
            class="flex items-center justify-between space-x-0 md:space-x-3 flex-col md:flex-row col-span-2 xl:col-span-1">
            <div
              class="bg-slate-300 dark:bg-stone-700 h-full w-1/3 md:w-auto aspect-square justify-center rounded-xl dark:text-white">
              <label class="w-full h-full flex items-center justify-center">
                <img
                  src="{iconImg}"
                  alt="Your Icon"
                  class="aspect-square overflow-clip w-full h-full rounded-xl {iconValue
                    ? 'block'
                    : 'hidden'}" />
                <input
                  bind:files="{iconValue}"
                  on:change="{uploadIcon}"
                  type="file"
                  accept="image/*"
                  class="hidden" />
                <IconNoIcon
                  class="h-1/2 w-1/2 {iconValue ? 'hidden' : 'block'}" />
              </label>
            </div>
            <div class="w-full">
              <p class="text-slate-950 dark:text-slate-100 mb-2">Title</p>
              <input
                type="text"
                placeholder="Super Cool Datapack"
                maxlength="35"
                bind:value="{titleValue}"
                required
                class="input w-full" />
            </div>
          </div>

          <p class="text-slate-950 dark:text-slate-100 col-span-3 pt-3">
            Summary
          </p>
          <textarea
            placeholder="A short description of your pack"
            maxlength="200"
            bind:value="{descValue}"
            class="input resize-none h-32 col-span-2"></textarea>
          <p class="text-slate-950 dark:text-slate-100 col-span-3 pt-3">
            Description
          </p>
          <MarkdownEditor
            classes="resize-none h-64 col-span-2"
            bind:content="{bodyValue}" />
          <p class="text-slate-950 dark:text-slate-100 col-span-3 pt-3">
            CC Licence (click to select)
          </p>
          <p class="text-slate-950 dark:text-slate-100/20 col-span-3">
            WIP, does not work!
          </p>
          <div
            class="grid grid-cols-2 gap-3 col-span-2 lg:col-span-1"
            use:autoAnimate>
            <div class="input cursor-pointer">
              <h1 class="flex items-center space-x-2">
                <IconAttr />
                <p class="font-bold">Attribution</p>
              </h1>
              <p class="text-xs">
                If people use, redistribute, or modify your work, credit must be
                given to you, the creator.
              </p>
            </div>
            <div class="input cursor-pointer">
              <h1 class="flex items-center space-x-2">
                <IconSA />
                <p class="font-bold">ShareAlike</p>
              </h1>
              <p class="text-xs">
                If someone remixes, transforms, or builds upon your work, they
                have to distribute it under the same licence.
              </p>
            </div>
            <div class="input cursor-pointer">
              <h1 class="flex items-center space-x-2">
                <IconNC />
                <p class="font-bold">NonCommercial</p>
              </h1>
              <p class="text-xs">
                People can't use your work to make money or for other commercial
                purposes.
              </p>
            </div>
            <div class="input cursor-pointer p-3">
              <h1 class="flex items-center space-x-2">
                <IconND />
                <p class="font-bold">NoDeriatives</p>
              </h1>
              <p class="text-xs">
                If someone remixes, transforms, or builds upon your work, they
                can't distribute it.
              </p>
            </div>
            <div class="input p-3 col-span-2 space-y-1">
              <h1 class="flex items-center space-x-2">
                <IconEdit />
                <p class="font-bold">Custom</p>
              </h1>
              <input
                type="text"
                class="input w-full"
                placeholder="https://example.com/my-custom-licence.md" />
            </div>
          </div>
          <p class="text-slate-950 dark:text-slate-100 col-span-3">
            Categories
          </p>
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 rounded-lg col-span-2">
            {#each categories as cat}
              <ToggleBoxes
                value="{cat}"
                selected="{category}"
                on:fail="{maxCategoriesReached}" />
            {/each}
          </div>
          <div class="col-span-3"></div>
          <Button classes="col-span-3 w-fit mt-4" click="{update}" wait="{true}"
            >Update Project</Button>
        </div>
        <!-- VERSIONS-->
      {:else if activePage == "versions"}
        <div class="bg-slate-200 dark:bg-stone-800 p-3 rounded-xl">
          <div class="text-center align-middle md:text-start w-full">
            {#if createVersion == false}
              <div class="my-2 mb-4 flex space-x-2">
                <label for="zip" class="max-w-100">
                  <span class="button-primary cursor-pointer"
                    >Upload New Version</span>
                </label>
                <input
                  type="file"
                  class="hidden"
                  accept=".zip"
                  id="zip"
                  on:input="{uploadDatapack}" />
                <span class="align-center text-slate-950 dark:text-white"
                  >(Supported: *.zip)</span>
                <!-- <p class="align-middle  text-slate-950 dark:text-slate-100">No versions yet!</p> -->
              </div>
              <div class="space-y-2">
                {#each data.versions ?? [] as version}
                  <VersionDisplay {version} project="{data.project}" />
                {/each}
              </div>
            {:else}
              {@const version = (Math.random() * 10).toFixed(1)}
              <div>
                <button
                  class="float-right cursor-pointer select-none font-black text-slate-950 dark:text-white"
                  on:click="{() => (createVersion = false)}">X</button>
                <h2
                  class="mb-2 text-xl font-bold text-slate-950 dark:text-white">
                  Creating new Version
                </h2>

                <div class="flex space-x-4">
                  <p
                    class="w-3/4 align-middle text-slate-950 dark:text-slate-100">
                    Version Name
                  </p>
                  <p
                    class="w-1/4 align-middle text-slate-950 dark:text-slate-100">
                    Version Number
                  </p>
                </div>
                <div class="flex space-x-3">
                  <input
                    class="input w-3/4"
                    required
                    placeholder="{data.project?.title} v{version}"
                    maxlength="50"
                    id="v_name" />
                  <input
                    required
                    class="input w-1/4"
                    placeholder="v{version}"
                    maxlength="15"
                    id="v_code" />
                </div>

                <p class="align-middle text-slate-950 dark:text-slate-100 mt-4">
                  Changelog (supports markdown!)
                </p>
                <MarkdownEditor
                  bind:content="{v_changelog}"
                  classes="h-36 w-full md:w-3/4" />

                <p class="align-middle text-slate-950 dark:text-slate-100 mt-4">
                  Compatible Minecraft Versions
                </p>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-3 rounded-lg col-span-2">
                  <MultiSelect
                    options="{minecraftVersions}"
                    minSelect="{1}"
                    bind:selected />
                </div>
                <p class="mb-4"></p>
                <!--I've been creating this for like 4 days just to realize its not even for this page-->
                <p class="text-slate-950 dark:text-slate-100 col-span-3">
                  Dependencies
                </p>
                <div
                  class="space-y-3 bg-slate-300 dark:bg-stone-800/50 rounded-lg border-2 border-slate-400 dark:border-stone-700 p-3 w-full md:w-2/3"
                  use:autoAnimate>
                  {#each list(dependencies.length) as index}
                    <p class="text-slate-950 dark:text-slate-100">
                      <IconLink class="inline-block" /> URL
                    </p>
                    <div class="flex items-center">
                      <span
                        class="bg-slate-300 dark:bg-stone-800 rounded-lg border-2 border-slate-400 dark:border-stone-700 p-2 focus:border-dph-orange dark:focus:border-dph-orange outline-none focus:text-opacity-100 text-slate-950 dark:text-stone-600 transition-all placeholder:italic placeholder:text-slate-800 dark:placeholder:text-stone-500 w-full text-opacity-60">
                        datapackhub.net/project/<AutoAdjustableInput
                          classes="bg-slate-300 text-opacity-100 dark:bg-stone-800 text-slate-100 outline-none"
                          on:change="{event =>
                            dependencyHandler(event.detail, index)}" />
                      </span>
                      {#if dependencies[index]}
                        <a href="/project/{dependencies[index].url}">
                          <img
                            src="{dependencies[index].icon}"
                            alt="{dependencies[index].title}'s icon"
                            height="48"
                            width="48"
                            class="ml-3 rounded-lg aspect-square" />
                        </a>
                      {/if}
                    </div>
                  {/each}
                </div>
                <p class="align-middle text-slate-950 dark:text-slate-100 mt-3">
                  Resource Pack Download (optional)
                </p>
                <input type="file" accept=".zip" id="v_rp" class="mb-4 input" />
                <div class=" mb-4">
                  <input name="squash" id="squash" type="checkbox" />
                  <label
                    for="squash"
                    class="align-middle text-slate-950 dark:text-slate-100">
                    Squash datapack. (This compresses the zip file, making it
                    load faster in game)
                  </label>
                </div>
                <Button click="{uploadVersion}" wait="{true}"
                  >Create Version</Button>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
<br />

<Modal bind:this="{publishModal}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
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
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
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

<Modal bind:this="{deleteModal}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Delete {data.project?.title}
  </h1>
  <CasualLine />
  <p class="mb-2 dark:text-white">
    Your project is currently {data.project?.status}.
  </p>
  <p class="mb-2 dark:text-white">
    When you delete a project, it will be only viewable by staff, and only if
    they have reason to do so. If you want to restore a deleted project, please
    contact a staff member.
  </p>
  <button
    class="button-base flex items-center space-x-1 bg-red-600"
    on:click="{remove}"
    ><IconDraft /><span
      >I confirm I understand the above. Delete submission</span
    ></button>
</Modal>

<style lang="postcss">
  :root {
    --sms-bg: theme(colors.stone.800);
    --sms-border: 2px solid theme(colors.stone.200);
    --sms-selected-bg: theme(colors.stone.700);
    --sms-remove-btn-hover-bg: theme(colors.orange.500);
    --sms-options-bg: theme(colors.stone.800);
    --sms-text-color: theme(colors.slate.100);
  }
</style>
