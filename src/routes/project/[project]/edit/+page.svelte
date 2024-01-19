<script lang="ts">
  import type { PageData } from "./$types";

  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";

  import { categories } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";

  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";

  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
  import Select from "$lib/components/utility/Select.svelte";
  import ToggleBoxes from "$lib/components/utility/ToggleBoxes.svelte";
  import {
    dpvDict,
    dpvDictAll,
    getDataPackVersion
  } from "$lib/globals/versions";
  import { readable, type Readable } from "svelte/store";
  import { superForm } from "sveltekit-superforms/client";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconDraft from "~icons/tabler/FileOff.svelte";
  import IconUpload from "~icons/tabler/FileUpload.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import IconNoIcon from "~icons/tabler/Upload.svelte";
  import IconX from "~icons/tabler/X.svelte";

  export let data: PageData;

  let { form, errors, constraints, enhance } = superForm(data.form);
  let publishModal: Modal;
  let draftModal: Modal;
  let deleteModal: Modal;

  let showSnapshot: boolean = false;
  let supportedVersions: Readable<string> = readable();
  let zipFile: File;
  let activePage = "details";

  let createVersion = false;

  let iconValue: FileList;
  let iconImg: string;

  let category = data.project.category?.toString() || "";

  let vChangelog = "";
  let vName = "";
  let vCode = "";
  let vRPUsed = false;
  let submitVersionButton: HTMLButtonElement;

  // let dependencies: Project[] = [];
  // let dependencyNames: string[] = [""];

  function setRPUsed() {
    vRPUsed = true;
  }

  type DragEventWithTarget = DragEvent & {
    currentTarget: EventTarget & HTMLLabelElement;
  };
  async function verifyDroppedPack(event: DragEventWithTarget) {
    if (event.dataTransfer?.items) {
      // Use DataTransferItemList interface to access the file(s)
      let item = [...event.dataTransfer.items][0];
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (!file) {
          return toast.error("Missing file");
        }

        if (file?.size > 5e6) {
          toast.error("File size can't be more than 5mb!");
          return;
        }

        if (file) {
          try {
            let { loadAsync } = await import("jszip");
            let zip = await loadAsync(file);

            if (!zip.file("pack.mcmeta") || !zip.folder("data")) {
              return toast.error("Malformed Datapack!");
            }

            zipFile = file;
            createVersion = true;
          } catch {
            return toast.error("Malformed Datapack!");
          }
        } else {
          return toast.error("Missing file");
        }
      } else {
        return toast.error("Not valid!");
      }
    }
  }

  async function rpDropHandler(event: DragEventWithTarget) {
    if (event.dataTransfer?.items) {
      // Use DataTransferItemList interface to access the file(s)
      let item = [...event.dataTransfer.items][0];
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        let container = new DataTransfer();
        container.items.add(file!);
        document.querySelector<HTMLInputElement>("#v_rp")!.files! =
          container.files!;
        setRPUsed();
      }
    }
  }

  // this should probably be done on the backend
  async function verifyDatapack() {
    if (browser) {
      let inp = document.querySelector("#zip") as HTMLInputElement;
      if (inp.files) zipFile = inp.files[0];

      if (zipFile?.size > 5e6) {
        toast.error("File size can't be more than 5mb!");
        return;
      }

      if (zipFile) {
        try {
          let { loadAsync } = await import("jszip");
          let zip = await loadAsync(zipFile);

          if (!zip.file("pack.mcmeta") || !zip.folder("data")) {
            return toast.error("Malformed Datapack!");
          }

          createVersion = true;
        } catch {
          return toast.error("Malformed Datapack!");
        }
      } else {
        return toast.error("Missing file");
      }
    }
  }

  type SubmitWithData = SubmitEvent & {
    currentTarget: EventTarget & HTMLFormElement;
  };
  async function uploadVersion(event: SubmitWithData) {
    event.currentTarget.disabled = true;
    let vSquash = document.querySelector<HTMLInputElement>("#squash")?.checked;

    if (!vName) return toast("Please make sure you give a version name!");
    if (!vCode) return toast("Please make sure you give a version number!");
    if (!vChangelog)
      return toast("Please make sure you give a version changelog!");
    if ($supportedVersions.length === 0) {
      return toast("Please select at least one compatible Minecraft version!");
    }

    if (vSquash) {
      toast.warning(
        "You have chosen to compress your pack, this may increase processing time."
      );
    }

    // form stuff
    let versionFormData = new FormData(event.currentTarget);
    let url = event.currentTarget.action;

    // let versionData = {
    //   name: vName,
    //   description: vChangelog,
    //   minecraft_versions: supportedVersions,
    //   version_code: vCode,
    //   filename: zipFile.name,
    //   primary_download: "",
    //   resource_pack_download: "",
    //   squash: vSquash
    //   // dependencies // <-- uncomment to implement
    // };

    versionFormData.append("primary_download", zipFile);
    versionFormData.append("filename", zipFile.name);
    versionFormData.append(
      "minecraft_versions",
      JSON.stringify([
        ...new Set(
          $supportedVersions
            .split(",")
            .map(s => s.trim())
            .map(s => getDataPackVersion(s))
        )
      ])
    );

    versionFormData.delete("showSnapshot");

    if (!vRPUsed) {
      versionFormData.delete("v_rp");
    }

    toast.promise(
      fetchAuthed("POST", url, {
        data: versionFormData,
        useSuppliedURL: false
      }).then(() => {
        goto(".");
      }),
      {
        success: "Uploaded! Refreshing...",
        error: "Something went wrong.",
        loading: "Processing file... Do not leave this page!"
      }
    );
  }

  function uploadIcon() {
    if (iconValue[0].size > 256_000) {
      return toast.error("Icon must be less than 256kb");
    }

    if (!iconValue[0].type.startsWith("image/")) {
      return toast.error(
        "Unsupported image type, recommendations are PNG and JPG!"
      );
    }

    let reader = new FileReader();

    reader.readAsDataURL(iconValue[0]);

    reader.addEventListener("load", event => {
      $form.icon = event.target?.result?.toString();
      iconImg = URL.createObjectURL(iconValue[0]);
    });
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
    } else {
      toast.error(pub.statusText);
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
</script>

<svelte:head>
  <title>Edit Project | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class="relative bg-slate-50 px-4 transition-all dark:bg-zinc-900 sm:px-8 lg:px-16 xl:px-24">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-32">
    <h1
      class="py-8 text-center text-5xl font-bold text-zinc-950 dark:text-zinc-100 md:py-0 md:text-start md:text-4xl lg:text-4xl">
      Edit <span class="text-dph-orange">{data.project?.title}</span>
    </h1>
    {#if data.project?.mod_message}
      <div class="mt-2 rounded-xl bg-red-500/20 p-4 dark:text-zinc-100">
        <p class=" font-black">Message from Datapack Hub Staff:</p>
        <p
          class="prose mb-1 mt-2 rounded-xl bg-red-500/30 p-3 dark:text-zinc-300">
          <MarkdownComponent source="{data.project?.mod_message}" />
        </p>
      </div>
    {/if}
    <div class="mb-2 mt-2 flex space-x-2">
      <button
        class="{activePage === 'details'
          ? 'bg-slate-200 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'} button-base text-zinc-950 dark:text-zinc-100"
        on:click="{() => (activePage = 'details')}">Details</button>
      <div class="flex-grow">
        <button
          class="{activePage === 'versions'
            ? 'bg-slate-200 dark:bg-zinc-600'
            : 'bg-slate-300 dark:bg-zinc-800'} button-base text-zinc-950 dark:text-zinc-100"
          on:click="{() => (activePage = 'versions')}"
          >Versions ({data.versions?.length})</button>
      </div>
      {#if ["draft", "unpublished", "disabled"].includes(data.project?.status ?? "draft")}
        <button
          class="button-base flex items-center space-x-1 bg-green-600 text-zinc-950 dark:text-zinc-100"
          on:click="{() => publishModal.open()}"
          ><IconTick /><span>Publish Project</span></button>
      {:else if data.project?.status == "live"}
        <button
          class="button-base flex items-center space-x-1 bg-slate-400 text-zinc-950 dark:bg-zinc-600 dark:text-zinc-100"
          on:click="{() => draftModal.open()}"
          ><IconDraft /><span>Draft submission</span></button>
      {/if}
      <button
        class="button-base flex items-center space-x-1 bg-red-600 text-zinc-950 dark:text-zinc-100"
        on:click="{() => deleteModal.open()}"><IconDelete /></button>
    </div>

    <!-- DETAILS-->
    <div use:autoAnimate>
      {#if activePage == "details"}
        <form
          method="POST"
          enctype="multipart/form-data"
          use:enhance
          class="grid grid-cols-2 gap-3 space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-zinc-800 md:text-start lg:grid-cols-3">
          <div
            class="col-span-2 flex flex-col items-center justify-between space-x-0 md:flex-row md:space-x-2 xl:col-span-1">
            <div
              class="aspect-square h-full w-1/3 justify-center rounded-xl bg-slate-300 dark:bg-zinc-700 dark:text-white md:w-auto">
              <label class="flex h-full w-full items-center justify-center">
                <img
                  src="{iconImg}"
                  alt="Your Icon"
                  class="aspect-square h-full w-full overflow-clip rounded-xl {iconValue
                    ? 'block'
                    : 'hidden'}" />
                <input
                  bind:files="{iconValue}"
                  on:change="{uploadIcon}"
                  name="icon"
                  id="icon"
                  type="file"
                  accept="image/*"
                  class="hidden" />
                <IconNoIcon
                  class="h-1/2 w-1/2 {iconValue ? 'hidden' : 'block'}" />
              </label>
            </div>
            <div class="w-full">
              <label for="title" class="mb-2 text-zinc-950 dark:text-zinc-100"
                >Title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Super Cool Datapack"
                {...$constraints.title}
                bind:value="{$form.title}"
                class="input w-full" />
            </div>
            {#if $errors.icon}<span class="text-red-500">{$errors.icon}</span
              >{/if}
          </div>

          <label
            for="description"
            class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">
            Summary
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="A short description of your pack"
            {...$constraints.description}
            bind:value="{$form.description}"
            class="input col-span-2 h-32 resize-none"></textarea>
          <p class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">
            Description
          </p>
          <MarkdownEditor
            classes="col-span-2 h-64 resize-none"
            name="body"
            bind:content="{$form.body}" />
          {#if $errors.body}<span class="text-red-500">{$errors.body}</span
            >{/if}
          <p class="col-span-3 text-zinc-950 dark:text-zinc-100">Categories</p>
          {#if $errors.category}<span class="col-span-3 text-red-500"
              >{$errors.category}</span
            >{/if}
          <ToggleBoxes
            options="{categories}"
            name="category"
            bind:selected="{category}" />
          <div class="col-span-3"></div>
          <button type="submit" class="button-primary col-span-3 mt-4 w-fit"
            >Update Project</button>
        </form>
        <!-- VERSIONS-->
      {:else if activePage == "versions"}
        <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
          <div class="text-center align-middle md:text-start">
            {#if createVersion == false}
              <div class="mb-2 flex items-center space-x-2 text-white">
                <label
                  on:dragover|preventDefault="{() => {}}"
                  on:drop|preventDefault="{event => verifyDroppedPack(event)}"
                  for="zip"
                  class="flex rounded-xl bg-dph-orange p-2 text-white">
                  <span class="cursor-pointer"
                    ><IconUpload class="inline-block align-text-top" /> Upload Version</span>
                </label>
                <input
                  type="file"
                  class="hidden"
                  accept=".zip"
                  id="zip"
                  on:input="{verifyDatapack}" />
                <p class="text-black dark:text-white">
                  or drag a ZIP anywhere onto this page
                </p>
              </div>
              <div class="space-y-2">
                {#each data.versions ?? [] as version}
                  <VersionDisplay {version} project="{data.project}" />
                {/each}
              </div>
            {:else}
              {@const version = (Math.random() * 10).toFixed(1)}
              <form
                action="https://api.datapackhub.net/versions/new/{data.project
                  .ID}"
                method="post"
                on:submit|preventDefault="{event => uploadVersion(event)}">
                <button
                  class="float-right cursor-pointer select-none font-black text-zinc-950 dark:text-white"
                  on:click="{() => (createVersion = false)}"><IconX /></button>
                <h2
                  class="mb-2 text-2xl font-bold text-zinc-950 dark:text-white">
                  Version Details
                </h2>

                <div class="flex gap-3">
                  <label
                    class="flex w-1/2 flex-col align-middle text-zinc-950 dark:text-zinc-100">
                    Version Name
                    <input
                      class="input"
                      name="name"
                      required
                      placeholder="{data.project?.title} v{version}"
                      maxlength="50"
                      bind:value="{vName}" />
                  </label>
                  <label
                    class="flex w-1/4 flex-col align-middle text-zinc-950 dark:text-zinc-100">
                    Version Code
                    <input
                      required
                      class="input"
                      name="version_code"
                      placeholder="v{version}"
                      maxlength="15"
                      bind:value="{vCode}" />
                  </label>
                </div>

                <p
                  class="mb-2 mt-4 align-middle text-zinc-950 dark:text-zinc-100">
                  Changelog
                </p>
                <MarkdownEditor
                  bind:content="{vChangelog}"
                  name="description"
                  classes="h-36 w-full md:w-3/4" />

                <p
                  class="mb-2 mt-8 align-middle text-zinc-950 dark:text-zinc-100">
                  Compatible Minecraft Versions
                </p>
                <Select
                  emptyString="{'Select Supported Minecraft Versions'}"
                  multi="{true}"
                  options="{Object.values(
                    showSnapshot ? dpvDictAll : dpvDict
                  ).reverse()}"
                  bind:selected="{supportedVersions}" />
                <input
                  name="showSnapshot"
                  id="showSnapshot"
                  type="checkbox"
                  bind:checked="{showSnapshot}"
                  class=" h-10 align-middle" />
                <label
                  for="showSnapshot"
                  class="align-middle text-zinc-950 dark:text-zinc-100">
                  Show Snapshot Versions
                </label>
                <div class="mb-8"></div>
                <input
                  name="squash"
                  id="squash"
                  type="checkbox"
                  class=" h-10 align-middle" />
                <label
                  for="squash"
                  class="align-middle text-zinc-950 dark:text-zinc-100">
                  Squash datapack (Recommended for large packs!)
                </label>
                <label
                  for="v_rp"
                  class="my-4 flex h-32 w-96 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-slate-400 bg-slate-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
                  on:dragover|preventDefault="{() => {}}"
                  on:drop|preventDefault="{event => rpDropHandler(event)}">
                  <IconUpload class="inline-block align-text-top" />
                  {vRPUsed
                    ? "Resource Pack (Uploaded Successfully)"
                    : "Resource Pack (optional)"}
                </label>
                <input
                  type="file"
                  accept=".zip"
                  on:input="{() => setRPUsed}"
                  id="v_rp"
                  name="v_rp"
                  class="hidden" />
                <button
                  type="submit"
                  class="button-primary"
                  bind:this="{submitVersionButton}">Create Version</button>
              </form>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
<br />

<Modal bind:this="{publishModal}" title="{'Publish Project'}">
  <p class="mb-2 dark:text-white">
    Your project is currently: {data.project?.status}. If this project has not
    been published before, then it will be reviewed by a moderator before going
    live.
  </p>
  <p class="mb-2 dark:text-white">
    By publishing this project, you agree that it follows the rules.
  </p>
  <button
    class="button-base flex items-center space-x-1 bg-green-600 text-zinc-950 dark:text-zinc-100"
    on:click="{publish}"><IconTick /><span>Publish Project</span></button>
</Modal>

<Modal bind:this="{draftModal}" title="{'Draft project'}">
  <p class="mb-2 dark:text-white">
    Your project is currently {data.project?.status}.
  </p>
  <p class="mb-2 dark:text-white">
    When you draft a project, it will become private, and removed from search
    engines if drafted for long enough. You will be able to restore the
    submission at any point.
  </p>
  <button
    class="button-base flex items-center space-x-1 bg-zinc-600 text-zinc-950 dark:text-zinc-100"
    on:click="{draft}"><IconDraft /><span>Draft submission</span></button>
</Modal>

<Modal bind:this="{deleteModal}" title="{'Delete project'}">
  <p class="mb-2 dark:text-white">
    Your project is currently {data.project?.status}.
  </p>
  <p class="mb-2 dark:text-white">
    When you delete a project, it will be only viewable by staff, and only if
    they have reason to do so. If you want to restore a deleted project, please
    contact a staff member.
  </p>
  <button
    class="button-base flex items-center space-x-1 bg-red-600 text-zinc-950 dark:text-zinc-100"
    on:click="{remove}"
    ><IconDraft /><span
      >I confirm I understand the above. Delete submission</span
    ></button>
</Modal>
