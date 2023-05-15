<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorFromID } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconInfo from "~icons/tabler/HelpCircle.svelte";
  import { user } from "$lib/globals/stores";
  import Modal from "$lib/components/modals/Modal.svelte";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import tippy from "sveltejs-tippy";
  import JSZip from "jszip";
  import toast, { Toaster } from "svelte-french-toast";
  import DOMPurify from "isomorphic-dompurify";
  import SvelteMarkdown from "svelte-markdown";

  export let data: PageData;
  let visible = false;
  let activePage = "description";

  let author: User;

  let body = DOMPurify.sanitize(data.project?.body!, {
    FORBID_ATTR: ["style", "class", "placeholder", "src"],
    FORBID_TAGS: ["canvas", "svg", "iframe", "img", "input"],
  });

  (async () => {
    if (browser) author = await getAuthorFromID(data.project?.author);
    visible = true;
  })();

  let dlModal: Modal;
  let activeVersion: Version;

  function openVersion(item: Version) {
    activeVersion = item;
    dlModal.open();
  }

  async function download(url: string, version: string, rp: boolean) {
    let zip = await fetch(url);
    let zipBlob = await zip.blob();
    let parsedZip = await JSZip.loadAsync(zipBlob);

    let packMcm = await parsedZip.files["pack.mcmeta"].async("text");
    let packMcmData = JSON.parse(packMcm);
    let packFormat;

    switch (version) {
      case "1.13–1.14.4":
        packFormat = 4;
        break;
      case "1.15-1.16.1":
        packFormat = 5;
        break;
      case "1.16.2-1.16.5":
        packFormat = 6;
        break;
      case "1.17.x":
        packFormat = 7;
        break;
      case "1.18.x":
        packFormat = 8;
        break;
      case "1.19-1.19.3":
        packFormat = 10;
        break;
      case "1.19.4":
        packFormat = 12;
        break;
    }

    packMcmData["pack"]["pack_format"] = packFormat;

    parsedZip.file("pack.mcmeta", JSON.stringify(packMcmData));

    let final = await parsedZip.generateAsync({ type: "base64" });
    var clickMePlz = document.createElement("a");
    clickMePlz.download = url.split("/")[url.split("/").length - 1];
    clickMePlz.href = "data:application/zip;base64," + final;
    clickMePlz.click();

    rp
      ? toast.success(
          "Downloaded file! Make sure to download the resource pack too."
        )
      : toast.success("Downloaded file!");
  }
</script>

<svelte:head>
  <title>{data.project?.title} | Datapack Hub</title>

  <meta property="title" content="{data.project?.title}" />
  <meta property="description" content="{data.project?.description}" />

  <meta property="og:title" content="{data.project?.title} | Datapack Hub" />
  <meta property="og:description" content="{data.project?.description}" />

  <meta name="og:profile:username" content="Silabear" />
  <meta name="og:image" content="{data.project?.icon}" />
  <meta name="og:image:secure_url" content="{data.project?.icon}" />
  <meta name="og:image:width" content="120" />
  <meta name="og:image:height" content="120" />
</svelte:head>

<main
  class="h-screen -translate-y-20 bg-pearl-lusta-100 px-0 transition-all dark:bg-stone-900 sm:px-8 md:translate-y-0 md:px-16 lg:px-24">
  <div class="pt-16"></div>
  <div class="mb-2 font-brand text-sky-300">
    <a href="/projects">&lt; Explore other projects</a>
  </div>
  <div
    class="flex w-full rounded-xl bg-pearl-lusta-200 p-4 dark:bg-pearl-lusta-100 dark:bg-opacity-10">
    <img
      src="{data.project?.icon ??
        'https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg'}"
      alt="Icon for {data.project?.title.trimStart()}"
      class="mr-6 h-32 rounded-lg" />
    <div class="flex-grow">
      <h1
        class="font-brand text-5xl font-bold text-pearl-lusta-950 dark:text-white">
        {data.project?.title.trimStart()}
      </h1>
      <h2
        class="text-md mt-2 font-brand text-pearl-lusta-950 opacity-60 transition-all dark:text-white">
        {data.project?.description?.trimStart()}
      </h2>
      {#if visible}
        <a
          href="/user/{author.username}"
          class="mt-4 flex items-center space-x-2">
          <img
            src="{author.profile_icon}"
            class="max-h-7 rounded-full"
            alt="pfp" />
          <span
            class="font-brand text-lg text-pearl-lusta-950 transition-all hover:underline dark:text-white"
            in:fade="{{ duration: 250 }}">
            {author.username}
          </span>
        </a>
      {/if}
    </div>
    <a href="/well-thats-awkward.txt" download class="button-style h-fit"
      >Download Latest</a>
  </div>
  <div class="my-2 mt-6 flex space-x-2">
    <div class="min-w-fit flex-grow">
      <button
        class="button-base {activePage === 'description'
          ? 'bg-stone-600'
          : 'bg-stone-800'}"
        on:click="{() => (activePage = 'description')}">Description</button>
      <button
        class="button-base {activePage === 'versions'
          ? 'bg-stone-600'
          : 'bg-stone-800'}"
        on:click="{() => (activePage = 'versions')}">Versions</button>
    </div>
    {#if $user.id == data.project?.author}
      <a
        class="button-base ml-auto flex items-center space-x-1"
        href="/project/{data.project?.url}/edit">
        <IconPencil /><span>Edit</span>
      </a>
    {/if}
  </div>
  {#if activePage == "description"}
    <div
      class="rounded-xl bg-pearl-lusta-200 p-4 dark:bg-pearl-lusta-100 dark:bg-opacity-10">
      <p class="prose dark:prose-invert">
        <SvelteMarkdown source="{body}" />
      </p>
    </div>
  {:else if activePage == "versions"}
    <div
      class="mb-2 items-center rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100 dark:bg-opacity-10">
      {#if data.versions?.length != 0}
        <div class="mx-3 flex space-x-3">
          <h2
            class="w-1/3 font-brand text-xl font-black text-pearl-lusta-950 dark:text-white">
            Name
          </h2>
          <h2
            class="flex-grow font-brand text-xl font-black text-pearl-lusta-950 dark:text-white">
            Minecraft versions
          </h2>
        </div>
        {#each data.versions ?? [] as version}
          <div
            class="mb-2 flex items-center space-x-3 rounded-xl bg-pearl-lusta-200 p-2 last:mb-0 dark:bg-pearl-lusta-100 dark:bg-opacity-10">
            <div class="flex w-1/3 items-center space-x-2">
              <h2
                class="font-brand text-xl font-bold text-pearl-lusta-950 dark:text-white">
                {version.name}
              </h2>
              <h2
                class="text-md font-brand font-thin italic text-pearl-lusta-950 dark:text-white">
                {version.version_code}
              </h2>
            </div>
            <h2
              class="flex flex-grow space-x-1 font-brand text-pearl-lusta-950 dark:text-white">
              {#each version.minecraft_versions.split(",") ?? [] as mcv}
                <button
                  class="rounded-lg border-2 border-dph-orange bg-dph-orange/25 px-1"
                  on:click="{() =>
                    download(
                      version.primary_download,
                      mcv,
                      version.resource_pack_download ? true : false
                    )}">
                  {mcv}
                </button>
              {/each}
            </h2>
            <button
              on:click="{() => {
                openVersion(version);
              }}"
              class="rounded-xl bg-dph-orange p-1 px-2 font-brand text-pearl-lusta-950 dark:text-white"
              >Download</button>
          </div>
        {/each}
        <p class="mx-1 mt-2 font-brand text-pearl-lusta-950 dark:text-white">
          (Showing {data.versions?.length} versions)
        </p>
      {:else}
        <h2 class="font-brand text-xl text-pearl-lusta-950 dark:text-white">
          <b>No versions yet!</b> Why not
          <a
            href="/project/{data.project?.url}/edit"
            class="text-cyan-500 underline">create one</a
          >?
        </h2>
      {/if}
    </div>
  {/if}
</main>

<Modal bind:this="{dlModal}">
  <h1 class="font-brand text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Download Version: {activeVersion.name}
  </h1>
  <CasualLine />
  <div
    class="items-middle flex items-center font-brand text-pearl-lusta-950 dark:text-white">
    <p class="pr-1">
      Select a valid Minecraft version below to download the datapack.
    </p>
    <div
      use:tippy="{{
        content:
          'The version you select here will determine what pack_format is used in pack.mcmeta',
        placement: 'right',
      }}">
      <IconInfo />
    </div>
  </div>
  <div
    class="my-2 flex space-x-2 font-brand text-pearl-lusta-950 dark:text-white">
    {#each activeVersion.minecraft_versions.split(",") ?? [] as mcv}
      <button
        class="cursor-pointer rounded-lg border-2 border-dph-orange bg-dph-orange/25 p-1 px-2 hover:scale-102"
        on:click="{() => {
          download(
            activeVersion.primary_download,
            mcv,
            activeVersion.resource_pack_download ? true : false
          );
        }}">{mcv}</button>
    {/each}
  </div>
  <p
    class="pr-1 font-brand text-xs italic text-pearl-lusta-950 dark:text-white">
    If your version is not listed above, then this datapack is not supported for
    your version.
  </p>

  {#if activeVersion.resource_pack_download}
    <CasualLine />
    <p class="pr-1 font-brand text-pearl-lusta-950 dark:text-white">
      This datapack also has a resource pack which you need to download!
    </p>
    <div class="my-2 flex">
      <a
        href="{activeVersion.resource_pack_download}"
        class="cursor-pointer rounded-lg border-2 border-dph-orange bg-dph-orange/25 p-1 px-2 font-brand text-pearl-lusta-950 hover:scale-102 dark:text-white">
        Download Resource Pack
      </a>
    </div>
  {/if}
  <CasualLine />
  <p class="flex items-center space-x-1 pr-1 font-brand text-sm text-sky-300">
    <IconInfo /><a href="/">How to install a datapack</a>
  </p>
</Modal>

<Toaster />
