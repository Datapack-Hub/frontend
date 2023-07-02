<script lang="ts">
  import { browser } from "$app/environment";
  import { loadAsync } from "jszip";
  import toast from "svelte-french-toast";
  import tippy from "sveltejs-tippy";

  import CasualLine from "../CasualLine.svelte";
  import MarkdownComponent from "../markdown/MarkdownComponent.svelte";
  import Modal from "../modals/Modal.svelte";

  import IconZIP from "~icons/tabler/Cube.svelte";
  import IconFile from "~icons/tabler/File.svelte";
  import IconFileFilled from "~icons/tabler/FileFilled.svelte";
  import IconInfo from "~icons/tabler/HelpCircle.svelte";
  import IconRP from "~icons/tabler/Sparkles.svelte";
  import { fetchAuthed } from "$lib/globals/functions";
  import type { Project, Version } from "$lib/globals/schema";
  import { user } from "$lib/globals/stores";
  import { isArray } from "radash";

  export let version: Version;
  export let expanded = false;
  export let mcVersion: string | undefined = undefined;
  export let project: Project | undefined = undefined;

  let properVersion = isArray(version.minecraft_versions.split(","))
    ? version.minecraft_versions.split(",")
    : version.minecraft_versions;
  let dlModal: Modal;

  function downloadVersion(
    type: "datapack" | "resourcepack" | undefined = undefined
  ) {
    if (type == undefined || mcVersion == undefined) return dlModal.open();
    if (type == "datapack")
      return download(
        version.primary_download,
        mcVersion,
        version.resource_pack_download ? true : false
      );
    if (type == "resourcepack")
      return download(version.resource_pack_download, mcVersion, false);
  }

  async function download(
    url: string | undefined,
    version: string,
    rp: boolean
  ) {
    if (browser && url) {
      let zip = await fetch(url);
      let zipBlob = await zip.blob();
      let parsedZip: any;

      try {
        parsedZip = await loadAsync(zipBlob);
      } catch (er) {
        return toast.error("something bad happened");
      }

      let packMcm = await parsedZip.files["pack.mcmeta"].async("text");
      let packMcmData = JSON.parse(packMcm);
      let packFormat;

      switch (version) {
        case "1.13-1.14.4":
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
        case "1.20-1.20.2":
          packFormat = 15;
          break;
      }

      packMcmData.pack.pack_format = packFormat;

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
  }

  async function deleteVersion() {
    await toast.promise(
      fetchAuthed(
        "DELETE",
        `/versions/project/${project?.ID}/${version.version_code}`
      ),
      {
        loading: "Deleting version...",
        success: "Version deleted! Refresh to see the updates",
        error: "Error trying to delete project."
      }
    );
  }
</script>

<div
  class="rounded-xl bg-pearl-lusta-300 p-2 last:mb-0 first:dark:bg-orange-300/20 dark:bg-pearl-lusta-100/10 relative">
  <div class="flex items-center space-x-3">
    <div class="flex w-1/3 items-center space-x-2">
      <button
        class="text-xl font-bold text-pearl-lusta-950 dark:text-white flex items-center space-x-1"
        on:click="{() => {
          if (expanded == false) {
            expanded = true;
          } else expanded = false;
        }}">
        {#if !expanded}
          <IconFile />
        {:else}
          <IconFileFilled />
        {/if}
        <p>{version.name}</p>
      </button>
      <h2
        class="text-base font-thin italic text-pearl-lusta-950 dark:text-white">
        {version.version_code}
      </h2>
    </div>
    {#if !mcVersion}
      <h2 class="flex flex-grow space-x-1 text-pearl-lusta-950 dark:text-white">
        {#each properVersion as mcv}
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
    {/if}
    {#if !expanded}
      {#if project?.ID == $user.id}
        <button
          on:click="{() => {
            deleteVersion();
          }}"
          id="#download"
          class="rounded-xl text-red-500 p-1">Delete</button>
      {/if}
      <button
        on:click="{() => {
          downloadVersion();
        }}"
        id="#download"
        class="rounded-xl bg-dph-orange p-1 px-2 text-pearl-lusta-950 dark:text-white"
        >Download</button>
    {/if}
  </div>
  {#if expanded}
    <h2 class="dark:text-white mt-2">Changelog</h2>
    <div
      class="w-full rounded-md bg-stone-700/10 dark:bg-stone-900/20 p-2 mb-2">
      <MarkdownComponent source="{version.description}" />
    </div>
    <h2 class="dark:text-white">Download this version:</h2>
    <div class="flex flex-col max-w-fit">
      <button
        on:click="{() => {
          downloadVersion('datapack');
        }}"
        id="#download"
        class="button-primary flex items-center space-x-2"
        ><IconZIP />
        <p>Datapack</p>
        {#if mcVersion} <p>(for {mcVersion})</p>{/if}</button>
      {#if version.resource_pack_download}
        <button
          on:click="{() => {
            downloadVersion('resourcepack');
          }}"
          id="#download"
          class="button-secondary flex items-center space-x-2 mt-2"
          ><IconRP />
          <p>Required Resourcepack</p></button>
      {/if}
    </div>
    <p class="flex mt-2 items-center space-x-1 pr-1 text-md text-sky-400">
      <IconInfo /><a href="/">How to install a datapack</a>
    </p>
  {/if}
</div>

<Modal bind:this="{dlModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Download Version: {version?.name ?? "Undefined"}
  </h1>
  <CasualLine />
  <div
    class="items-middle flex items-center text-pearl-lusta-950 dark:text-white">
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
  <div class="my-2 flex space-x-2 text-pearl-lusta-950 dark:text-white">
    {#each version?.minecraft_versions.split(",") ?? [] as mcv}
      <button
        class="cursor-pointer rounded-lg border-2 border-dph-orange bg-dph-orange/25 p-1 px-2 hover:scale-102"
        on:click="{() => {
          download(
            version?.primary_download,
            mcv,
            version?.resource_pack_download ? true : false
          );
        }}">{mcv}</button>
    {/each}
  </div>
  <p class="pr-1 text-xs italic text-pearl-lusta-950 dark:text-white">
    If your version is not listed above, then this datapack is not supported for
    your version.
  </p>

  {#if version?.resource_pack_download}
    <CasualLine />
    <p class="pr-1 text-pearl-lusta-950 dark:text-white">
      This datapack also has a resource pack which you need to download!
    </p>
    <div class="my-2 flex">
      <a
        href="{version?.resource_pack_download}"
        class="cursor-pointer rounded-lg border-2 border-dph-orange bg-dph-orange/25 p-1 px-2 text-pearl-lusta-950 hover:scale-102 dark:text-white">
        Download Resource Pack
      </a>
    </div>
  {/if}
  <CasualLine />
  <p class="flex items-center space-x-1 pr-1 text-sm text-sky-300">
    <IconInfo /><a href="/">How to install a datapack</a>
  </p>
</Modal>
