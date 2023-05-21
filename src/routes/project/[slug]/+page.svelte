<script lang="ts">
  import { getAuthorFromID, titleCase } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconInfo from "~icons/tabler/HelpCircle.svelte";
  import IconCube from "~icons/tabler/Box.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";

  import { isAuthenticated, user } from "$lib/globals/stores";
  import Modal from "$lib/components/modals/Modal.svelte";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import tippy from "sveltejs-tippy";
  import JSZip from "jszip";
  import toast from "svelte-french-toast";
  import DOMPurify from "isomorphic-dompurify";
  import SvelteMarkdown from "svelte-markdown";
  import MiniProfileCard from "$lib/components/profile/MiniProfileCard.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { onMount } from "svelte";

  export let data: PageData;
  let visible = false;
  let activePage = "description";

  let author: User;

  let body = DOMPurify.sanitize(data.project?.body ?? "", {
    FORBID_ATTR: ["style", "class", "placeholder", "src"],
    FORBID_TAGS: ["canvas", "svg", "iframe", "img", "input"]
  });

  onMount(async () => {
    author = await getAuthorFromID(data.project?.author ?? 0);
    visible = true;
  });

  let dlModal: Modal;
  let activeVersion: Version;

  let modModal: Modal;
  let modModalPage = "delete";

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
    // var clickMePlz = document.createElement("a");
    // clickMePlz.download = url.split("/")[url.split("/").length - 1];
    // clickMePlz.href = "data:application/zip;base64," + final;
    // clickMePlz.click();

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
  class="-translate-y-20 bg-pearl-lusta-100 px-0 pb-3 transition-all dark:bg-stone-900 sm:px-8 md:translate-y-0 md:px-16 lg:px-24">
  <div class="pt-16"></div>
  <div class="mb-2 font-brand text-sky-300">
    <a href="/projects">&lt; Explore other projects</a>
  </div>
  <div
    class="relative flex w-full rounded-xl bg-pearl-lusta-200 p-4 dark:bg-pearl-lusta-100/10 dark:text-pearl-lusta-100">
    <div
      class="{data.project?.icon
        ? 'p-0'
        : 'h-20 bg-stone-600 p-4'} mr-6 rounded-xl">
      {#if data.project?.icon}
        <img
          loading="lazy"
          src="{data.project?.icon}"
          alt="{data.project?.title} icon"
          class="aspect-square w-20 rounded-lg bg-cover" />
      {:else}
        <IconNoPhoto width="48" height="48" />
      {/if}
    </div>
    <div class="flex-grow">
      <h1
        class="flex items-center font-brand text-5xl font-bold text-pearl-lusta-950 dark:text-white">
        {data.project?.title.trimStart()}
        {#if data.project?.status == "draft"}
          <span
            class="mx-3 rounded-full bg-stone-700 px-2 font-brand text-xl font-bold text-stone-500"
            >Draft</span>
        {/if}
      </h1>
      <h2
        class="mt-2 font-brand text-base text-pearl-lusta-950/60 transition-all dark:text-white/60">
        {data.project?.description?.trimStart()}
      </h2>
      {#if visible}
        <div class="mt-4 flex items-center space-x-2">
          <a href="/user/{author.username}" class="flex items-center space-x-2">
            <img
              loading="lazy"
              src="{author.profile_icon}?size=32"
              class="max-h-7 rounded-full"
              alt="pfp" />
            <span
              class="font-brand text-lg text-pearl-lusta-950 transition-all hover:underline dark:text-white"
              in:fade="{{ duration: 250 }}">
              {author.username}
            </span>
          </a>
          <span class="font-brand dark:text-white"> • </span>
          <span class="flex items-center space-x-1 font-brand dark:text-white">
            <IconCube />
            <p>{data.project?.category}</p>
          </span>
        </div>
      {/if}
    </div>
    <div class="flex flex-col space-y-1">
      <a href="/well-thats-awkward.txt" download class="button-style h-fit"
        >Download Latest</a>
      {#if $isAuthenticated && ["moderator", "developer", "admin"].includes($user.role)}
        <button
          on:click="{() => modModal.open()}"
          class="rounded-lg bg-red-600 px-3 text-center font-brand text-lg text-white transition-all hover:scale-105 active:brightness-75"
          >Moderate</button>
      {/if}
    </div>
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
    {#if $user.id == data.project?.author || ["admin", "moderator"].includes($user.role)}
      <a
        class="button-base ml-auto flex items-center space-x-1"
        href="/project/{data.project?.url}/edit">
        <IconPencil /><span>Edit</span>
      </a>
    {/if}
  </div>
  <div use:autoAnimate>
    {#if activePage == "description"}
      <div class="rounded-xl bg-pearl-lusta-200 p-4 dark:bg-pearl-lusta-100/10">
        <p
          class="prose prose-stone w-full font-brand leading-tight dark:prose-invert">
          <SvelteMarkdown source="{body.replaceAll('\\n', '\n')}" />
        </p>
      </div>
    {:else if activePage == "versions"}
      <div
        class="mb-2 items-center rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
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
          <ul use:autoAnimate>
            {#each data.versions ?? [] as version}
              <li
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
                  id="#download"
                  class="rounded-xl bg-dph-orange p-1 px-2 font-brand text-pearl-lusta-950 dark:text-white"
                  >Download</button>
              </li>
            {/each}
          </ul>
          <p class="mx-1 mt-2 font-brand text-pearl-lusta-950 dark:text-white">
            (Showing {data.versions?.length} versions)
          </p>
        {:else}
          <h2 class="font-brand text-xl text-pearl-lusta-950 dark:text-white">
            <b>No versions yet!</b> Why not
            <a
              href="/project/{data.project?.url}/edit"
              class="text-blue-500 underline">create one</a
            >?
          </h2>
        {/if}
      </div>
    {/if}
  </div>
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
        placement: 'right'
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

<Modal bind:this="{modModal}">
  <h1 class="font-brand text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Moderate {data.project?.title}
  </h1>
  <CasualLine />
  <!-- <p class="font-brand dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p
    class="align-middle font-brand text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    User
  </p>
  <MiniProfileCard
    person="{author}"
    role="{data.roles?.find(v => author.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p
      class="align-middle font-brand text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
      Select Action
    </p>
    <button
      class="button-base {modModalPage === 'delete'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (modModalPage = 'delete')}">Delete</button>
    <button
      class="button-base {modModalPage === 'disable'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (modModalPage = 'disable')}">Disable</button>
    <button
      class="button-base {modModalPage === 'write note'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (modModalPage = 'write note')}">Write Note</button>
  </div>
  <p
    class="align-middle font-brand text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    Moderation Note
  </p>
  <textarea
    class="input-base override-input-outline h-24 w-full resize-none rounded-md bg-pearl-lusta-300 p-2 font-brand dark:bg-stone-700"
    placeholder="Write a helpful message explaining why they are being moderated. Include evidence (links etc) if applicable. Markdown is supported"
    id="description"
    maxlength="200"></textarea>
  <button class="button-style">{titleCase(modModalPage)}</button>
</Modal>
