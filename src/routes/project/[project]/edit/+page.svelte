<script lang="ts">
  import type { PageData } from "./$types";

  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";

  import { categories, minecraftVersions } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";

  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";

  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
  import ToggleBoxes from "$lib/components/utility/ToggleBoxes.svelte";
  import { MultiSelect } from "svelte-multiselect";
  import { writable } from "svelte/store";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconDraft from "~icons/tabler/FileOff.svelte";
  import IconUpload from "~icons/tabler/FileUpload.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import IconNoIcon from "~icons/tabler/Upload.svelte";
  import IconX from "~icons/tabler/X.svelte";

  let publishModal: Modal;
  let draftModal: Modal;
  let deleteModal: Modal;

  let supportedVersions: string[] = [];
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

  $: category = writable(data.project.category || ([] as string[]));

  let vChangelog = "";
  let vName = "";
  let vCode = "";
  let vRPUsed = false;
  let submitButton: HTMLButtonElement;

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
    if (supportedVersions.length === 0) {
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

    toast.promise(
      fetchAuthed("POST", url, {
        data: versionFormData,
        useSuppliedURL: false
      }).then(() => goto(".")),
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

  async function update(target: EventTarget & HTMLButtonElement) {
    target.disabled = true;

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

    let x = await fetchAuthed("post", "/projects/edit/" + data.project?.ID, {
      data: { ...projData }
    });
    if (x.ok) {
      goto(".");
      toast.success("Edited project!");
    } else {
      toast.error("Failed to upload! Contact an Admin!");
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
        <div
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
                  type="file"
                  accept="image/*"
                  class="hidden" />
                <IconNoIcon
                  class="h-1/2 w-1/2 {iconValue ? 'hidden' : 'block'}" />
              </label>
            </div>
            <div class="w-full">
              <p class="mb-2 text-zinc-950 dark:text-zinc-100">Title</p>
              <input
                type="text"
                placeholder="Super Cool Datapack"
                maxlength="35"
                bind:value="{titleValue}"
                required
                class="input w-full" />
            </div>
          </div>

          <p class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">
            Summary
          </p>
          <textarea
            placeholder="A short description of your pack"
            maxlength="200"
            bind:value="{descValue}"
            class="input col-span-2 h-32 resize-none"></textarea>
          <p class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">
            Description
          </p>
          <MarkdownEditor
            classes="col-span-2 h-64 resize-none"
            bind:content="{bodyValue}" />
          <p class="col-span-3 text-zinc-950 dark:text-zinc-100">Categories</p>
          <div
            class="col-span-2 grid grid-cols-2 gap-3 rounded-lg md:grid-cols-3 lg:grid-cols-4">
            {#each categories as cat}
              <ToggleBoxes
                value="{cat}"
                selected="{category}"
                on:fail="{() => toast.error('Max Categories Reached')}" />
            {/each}
          </div>
          <div class="col-span-3"></div>
          <button
            class="button-primary col-span-3 mt-4 w-fit"
            on:click="{event => update(event.currentTarget)}"
            >Update Project</button>
        </div>
        <!-- VERSIONS-->
      {:else if activePage == "versions"}
        <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
          <div class="text-center align-middle md:text-start">
            {#if createVersion == false}
              <p
                class="mb-8 text-2xl font-bold text-zinc-950 dark:text-zinc-100">
                Step 1. Upload Datapack Data
              </p>
              <div class="my-2 flex flex-col items-center justify-center">
                <label
                  on:dragover|preventDefault="{() => {}}"
                  on:drop|preventDefault="{event => verifyDroppedPack(event)}"
                  for="zip"
                  class="flex h-32 w-96 flex-col items-center justify-center rounded-lg border-2 border-slate-400 bg-slate-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white">
                  <span class="cursor-pointer"
                    ><IconUpload class="inline-block align-text-top" /> Upload Datapack</span>
                  (Drag and Drop Supported!)
                </label>
                <input
                  type="file"
                  class="hidden"
                  accept=".zip"
                  id="zip"
                  on:input="{verifyDatapack}" />
                <span class="align-center mt-4 text-zinc-950 dark:text-white"
                  >(Supports: *.zip)</span>
                <!-- <p class="align-middle  text-zinc-950 dark:text-zinc-100">No versions yet!</p> -->
                <p class="mt-4 text-zinc-950 dark:text-zinc-100">
                  After you upload a version of your pack, it'll move on
                  automatically!
                </p>
              </div>
              <div class="gap-2">
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
                  Step 2. Fill in your version's info
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
                <MultiSelect
                  options="{minecraftVersions}"
                  minSelect="{1}"
                  name="minecraft_versions"
                  bind:selected="{supportedVersions}" />
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
                  bind:this="{submitButton}">Create Version</button>
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

<style lang="postcss">
  :root {
    --sms-bg: theme(colors.zinc.800);
    --sms-border: 2px solid theme(colors.zinc.700);
    --sms-selected-bg: theme(colors.zinc.700);
    --sms-remove-btn-hover-bg: theme(colors.orange.500);
    --sms-options-bg: theme(colors.zinc.800);
    --sms-text-color: theme(colors.white);
  }
</style>
