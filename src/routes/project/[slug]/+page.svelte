<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorNameFromID } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconInfo from "~icons/tabler/HelpCircle.svelte";
  import { user } from "$lib/globals/stores";
  import Modal from "$lib/components/modals/Modal.svelte";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import tippy from "sveltejs-tippy";

  export let data: PageData;
  let visible = false;
  let activePage = "description";

  let author = "Loading...";

  (async () => {
    if (browser)
      author = "By " + (await getAuthorNameFromID(data.project?.author));
    visible = true;
  })();

  let dlModal: Modal;
  let activeVersion: Version;

  function openVersion(item: Version) {
    activeVersion = item;
    dlModal.open();
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
  class="h-screen -translate-y-20 bg-new-white-200 px-0 transition-all dark:bg-stone-900 sm:px-8 md:translate-y-0 md:px-16 lg:px-24">
  <div class="pt-16"></div>
  <div class="mb-2 font-brand text-sky-300">
    <a href="/projects">&lt; Explore other projects</a>
  </div>
  <div
    class="flex w-full rounded-xl bg-new-white-300 p-4 dark:bg-new-white-200 dark:bg-opacity-10">
    <img
      src="{data.project?.icon}"
      alt="Icon for {data.project?.title}"
      class="mr-6 h-24 w-24 rounded-lg" />
    <div class="flex-grow">
      <h1 class="font-brand text-5xl font-black dark:text-white">
        {data.project?.title}
      </h1>
      {#if visible}
        <h2
          class="mt-4 font-brand text-xl font-bold transition-all dark:text-white"
          in:fade="{{ duration: 250 }}">
          {author}
        </h2>
      {/if}
      <h2
        class="text-md font-brand transition-all dark:text-white"
        in:fade="{{ duration: 250 }}">
        {data.project?.description}
      </h2>
    </div>
    <a href="/well-thats-awkward.txt" download class="button-style h-fit"
      >Download Latest</a>
  </div>
  <div class="my-2 mt-4 flex space-x-2">
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
      class="rounded-xl bg-new-white-300 p-4 dark:bg-new-white-200 dark:bg-opacity-5">
      <p class="font-brand text-lg font-light dark:text-white">
        {data.project?.body}
      </p>
    </div>
  {:else if activePage == "versions"}
    <div
      class="mb-2 items-center rounded-xl bg-new-white-300 p-3 dark:bg-new-white-200 dark:bg-opacity-5">
      {#if data.versions?.length != 0}
        <div class="mx-3 flex space-x-3">
          <h2 class="w-1/3 font-brand text-xl font-black dark:text-white">
            Name
          </h2>
          <h2 class="flex-grow font-brand text-xl font-black dark:text-white">
            Minecraft versions
          </h2>
        </div>
        {#each data.versions ?? [] as version}
          <div
            class="mb-2 flex items-center space-x-3 rounded-xl bg-new-white-300 p-2 last:mb-0 dark:bg-new-white-200 dark:bg-opacity-10">
            <div class="flex w-1/3 items-center space-x-2">
              <h2 class="font-brand text-xl font-bold dark:text-white">
                {version.name}
              </h2>
              <h2 class="text-md font-brand font-thin italic dark:text-white">
                {version.version_code}
              </h2>
            </div>
            <h2 class="flex flex-grow space-x-1 font-brand dark:text-white">
              {#each version.minecraft_versions.split(",") ?? [] as mcv}
                <div
                  class="rounded-lg border-2 border-dph-orange bg-dph-orange/25 px-1">
                  {mcv}
                </div>
              {/each}
            </h2>
            <button
              on:click="{() => {
                openVersion(version);
              }}"
              class="rounded-xl bg-dph-orange p-1 px-2 font-brand dark:text-white"
              >Download</button>
          </div>
        {/each}
        <p class="mx-1 mt-2 font-brand dark:text-white">
          (Showing {data.versions?.length} versions)
        </p>
      {:else}
        <h2 class="font-brand text-xl dark:text-white">
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
  <h1 class="font-brand text-xl font-bold dark:text-white">
    Download Version: {activeVersion.name}
  </h1>
  <CasualLine />
  <div class="items-middle flex items-center font-brand dark:text-white">
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
  <div class="my-2 flex space-x-2 font-brand dark:text-white">
    {#each activeVersion.minecraft_versions.split(",") ?? [] as mcv}
      <div
        class="cursor-pointer rounded-lg border-2 border-dph-orange bg-dph-orange/25 p-1 px-2 hover:scale-102">
        {mcv}
      </div>
    {/each}
  </div>
  <p class="pr-1 font-brand text-xs italic dark:text-white">
    If your version is not listed above, then this datapack is not supported for
    your version.
  </p>

  {#if activeVersion.rp_download}
    <CasualLine />
    <p class="pr-1 font-brand dark:text-white">
      This datapack also has a resource pack which you need to download!
    </p>
    <div class="my-2 flex">
      <div
        class="cursor-pointer rounded-lg border-2 border-dph-orange bg-dph-orange/25 p-1 px-2 font-brand hover:scale-102 dark:text-white">
        Download Resource Pack
      </div>
    </div>
  {/if}
  <CasualLine />
  <p class="flex items-center space-x-1 pr-1 font-brand text-sm text-sky-300">
    <IconInfo /><a href="/">How to install a datapack</a>
  </p>
</Modal>
