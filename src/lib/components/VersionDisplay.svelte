<script lang="ts">
  import { browser } from "$app/environment";
  import JSZip from "jszip";
  import toast from "svelte-french-toast";
  import tippy from "sveltejs-tippy";
  import IconInfo from "~icons/tabler/HelpCircle.svelte";
  import CasualLine from "./CasualLine.svelte";
  import MarkdownComponent from "./MarkdownComponent.svelte";
  import Modal from "./modals/Modal.svelte";

  export let version: Version;

  let dlModal: Modal;
  let activeVersion: Version;

  let expanded = false;

  function openVersion(item: Version) {
    activeVersion = item;
    dlModal.open();
  }

  async function download(url: string, version: string, rp: boolean) {
    if (browser) {
      let zip = await fetch(url);
      let zipBlob = await zip.blob();
      let parsedZip = await JSZip.loadAsync(zipBlob);

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
  }
</script>

<li
  class="rounded-xl bg-pearl-lusta-200 p-2 last:mb-0 first:dark:bg-orange-300/20 dark:bg-pearl-lusta-100/10 relative">
  <div class="flex items-center space-x-3">
    <div class="flex w-1/3 items-center space-x-2">
      <button
        class="text-xl font-bold text-pearl-lusta-950 dark:text-white"
        on:click="{() => {
          if (expanded == false) {
            expanded = true;
          } else expanded = false;
        }}">
        {version.name}
      </button>
      <h2
        class="text-base font-thin italic text-pearl-lusta-950 dark:text-white">
        {version.version_code}
      </h2>
    </div>
    <h2 class="flex flex-grow space-x-1 text-pearl-lusta-950 dark:text-white">
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
      class="rounded-xl bg-dph-orange p-1 px-2 text-pearl-lusta-950 dark:text-white"
      >Download</button>
  </div>
  {#if expanded}
    <MarkdownComponent source="{version.description}" />
  {/if}
</li>

<Modal bind:this="{dlModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Download Version: {activeVersion?.name ?? "Undefined"}
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
    {#each activeVersion?.minecraft_versions.split(",") ?? [] as mcv}
      <button
        class="cursor-pointer rounded-lg border-2 border-dph-orange bg-dph-orange/25 p-1 px-2 hover:scale-102"
        on:click="{() => {
          download(
            activeVersion?.primary_download,
            mcv,
            activeVersion?.resource_pack_download ? true : false
          );
        }}">{mcv}</button>
    {/each}
  </div>
  <p class="pr-1 text-xs italic text-pearl-lusta-950 dark:text-white">
    If your version is not listed above, then this datapack is not supported for
    your version.
  </p>

  {#if activeVersion?.resource_pack_download}
    <CasualLine />
    <p class="pr-1 text-pearl-lusta-950 dark:text-white">
      This datapack also has a resource pack which you need to download!
    </p>
    <div class="my-2 flex">
      <a
        href="{activeVersion?.resource_pack_download}"
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
