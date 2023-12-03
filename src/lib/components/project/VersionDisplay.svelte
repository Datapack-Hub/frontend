<script lang="ts">
  import { browser, dev } from "$app/environment";
  import { toast } from "svelte-sonner";

  import CasualLine from "../decorative/CasualLine.svelte";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";
  import Modal from "../modals/Modal.svelte";

  import { invalidateAll } from "$app/navigation";
  import { fetchAuthed } from "$lib/globals/functions";
  import type { Project, Version } from "$lib/globals/schema";
  import { user } from "$lib/globals/stores";
  import { isArray, isNumber, isObject } from "radash";
  import IconZIP from "~icons/tabler/Cube.svelte";
  import IconDownload from "~icons/tabler/Download.svelte";
  import IconFile from "~icons/tabler/File.svelte";
  import IconFileFilled from "~icons/tabler/FileFilled.svelte";
  import IconInfo from "~icons/tabler/HelpCircle.svelte";
  import IconRP from "~icons/tabler/Sparkles.svelte";
  import Button from "../decorative/Button.svelte";
  import Tooltip from "../utility/Tooltip.svelte";

  export let version: Version;
  export let expanded = false;
  export let mcVersion: string = "";
  export let project: Project | undefined;

  let properVersion = version.minecraft_versions.split(",");
  let dlModal: Modal;

  function openDownloadModal(type?: "datapack" | "resourcepack" | undefined) {
    if (!type || !mcVersion) return dlModal.open();

    if (type == "datapack") {
      return download(
        version.primary_download,
        mcVersion,
        version.resource_pack_download ? true : false
      );
    }

    if (type == "resourcepack")
      return download(version.resource_pack_download, mcVersion, false);
  }

  async function download(
    url: string | undefined,
    mcSemver: string,
    rp: boolean
  ) {
    if (!browser || url === undefined) {
      return toast.error("Could not find file!");
    }

    // Remove if actual download behaviour needs testing
    if (dev) {
      toast.info("Tests are disabled on dev");
      return;
    }

    let zip = await fetch(url);
    let zipBlob = await zip.blob();
    let parsedZip;

    try {
      let { loadAsync } = await import("jszip");
      parsedZip = await loadAsync(zipBlob);
    } catch {
      toast.error(
        "Failed to start auto-meta updating, forcing download anyway..."
      );
      let autoRunDownload = document.createElement("a");
      autoRunDownload.href = url;
      autoRunDownload.click();
      return;
    }

    let mcMeta = JSON.parse(await parsedZip.files["pack.mcmeta"].async("text"));
    let packFormat = 0;

    switch (mcSemver) {
      case "1.13-1.14.4": {
        packFormat = 4;
        break;
      }
      case "1.15-1.16.1": {
        packFormat = 5;
        break;
      }
      case "1.16.2-1.16.5": {
        packFormat = 6;
        break;
      }
      case "1.17.x": {
        packFormat = 7;
        break;
      }
      case "1.18.x": {
        packFormat = 8;
        break;
      }
      case "1.19-1.19.3": {
        packFormat = 10;
        break;
      }
      case "1.19.4": {
        packFormat = 12;
        break;
      }
      case "1.20-1.20.1": {
        packFormat = 15;
        break;
      }
      case "1.20.2": {
        packFormat = 16;
        break;
      }
      default: {
        packFormat = 0;
        break;
      }
    }

    mcMeta.pack.pack_format = packFormat;

    let supportedFormats = mcMeta.pack.supported_formats;
    if (supportedFormats !== undefined) {
      if (isObject(supportedFormats)) {
        if (mcMeta.pack.supported_formats.max_inclusive > packFormat) return;

        mcMeta.pack.supported_formats.max_inclusive = packFormat;
      } else if (isNumber(supportedFormats)) {
        if (supportedFormats > packFormat) return;

        mcMeta.pack.supported_formats = packFormat;
      } else if (isArray(supportedFormats)) {
        if (supportedFormats[1] > packFormat) return;

        mcMeta.pack.supported_formats = packFormat;
      } else {
        return toast.error("Something went wrong: MCMeta is corrupt!");
      }
    }

    parsedZip.file("pack.mcmeta", JSON.stringify(mcMeta));

    let final = await parsedZip.generateAsync({ type: "base64" });
    let autoRunDownload = document.createElement("a");
    autoRunDownload.download = url.split("/").at(-1)!;
    autoRunDownload.href = "data:application/zip;base64," + final;
    autoRunDownload.click();

    if (rp) {
      toast.success("Downloaded file! Make sure to get the resource pack too!");
    } else toast.success("Downloaded file!");
  }

  function deleteVersion() {
    toast.promise(
      fetchAuthed(
        "DELETE",
        `/versions/project/${project?.ID}/${version.version_code}`
      ),
      {
        loading: "Deleting version...",
        success: "Version deleted! Refreshing...",
        error: "Error trying to delete project."
      }
    );
    invalidateAll();
  }
</script>

<div
  class="relative rounded-xl bg-slate-300 p-3 last:mb-0 dark:bg-slate-50/10 first:dark:bg-orange-300/10">
  <div class="flex items-center space-x-2">
    <div class="flex items-center space-x-2">
      <button
        class="flex items-center space-x-1 text-xl font-bold text-zinc-950 dark:text-white"
        on:click="{() => (expanded = !expanded)}">
        {#if !expanded}
          <IconFile />
        {:else}
          <IconFileFilled />
        {/if}
        <h2 class="md:text-md text-sm lg:text-lg">{version.name}</h2>
      </button>
      <h3
        class="text-xs font-thin italic text-zinc-950 dark:text-white md:text-sm lg:text-base">
        {version.version_code}
      </h3>
    </div>
    {#if !mcVersion}
      <ul
        class="hidden gap-1 text-zinc-950 dark:text-white md:flex md:flex-grow">
        {#each properVersion as mcv}
          <li>
            <button
              class="rounded-md border border-black/30 bg-dph-orange p-1 px-2 text-xs dark:border-white/30"
              on:click="{() =>
                download(
                  version.primary_download,
                  mcv,
                  version.resource_pack_download !== undefined
                )}">
              {mcv}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
    {#if !expanded && !mcVersion}
      {#if project?.author.id == $user.id}
        <button
          on:click="{() => {
            deleteVersion();
          }}"
          class="text-xs text-red-500 md:text-sm lg:text-base">Delete</button>
      {/if}
      <Button
        classes="text-xs md:text-sm lg:text-base"
        click="{() => {
          openDownloadModal();
        }}"><IconDownload /></Button>
    {/if}
  </div>
  {#if expanded}
    <h2 class="mt-2 dark:text-white">Changelog</h2>
    <div class="mb-2 w-full rounded-md bg-zinc-700/10 p-3 dark:bg-zinc-900/20">
      <MarkdownComponent source="{version.description}" />
    </div>
    <h2 class="dark:text-white">Download this version:</h2>
    <div class="flex max-w-fit flex-col">
      <Button
        click="{() => {
          openDownloadModal('datapack');
        }}"
        classes="flex items-center space-x-2"
        ><IconZIP />
        <span data-test-clickable-label="datapack">Datapack</span>
        {#if mcVersion}
          <span>(for {mcVersion})</span>{/if}</Button>
      {#if version.resource_pack_download}
        <Button
          click="{() => {
            openDownloadModal('resourcepack');
          }}"
          style="alt"
          classes="mt-2 flex items-center space-x-2"
          ><IconRP />
          <p>Required Resourcepack</p></Button>
      {/if}
    </div>
    <p class="text-md mt-2 flex items-center space-x-1 pr-1 text-blue-400">
      <IconInfo /><a href="/install">How to install a datapack</a>
    </p>
  {/if}
</div>

<Modal bind:this="{dlModal}" title="{'Download version ' + version.name}">
  <div class="items-middle flex items-center text-zinc-950 dark:text-white">
    <p class="pr-1">
      Select a valid Minecraft version below to download the datapack.
    </p>
    <Tooltip
      tooltipText="{'The version you select here will determine what pack_format is used in pack.mcmeta'}"
      placement="{'right'}">
      <IconInfo />
    </Tooltip>
  </div>
  <div class="grid-auto-lg my-2 grid gap-2 text-zinc-950 dark:text-white">
    {#each version?.minecraft_versions.split(",") ?? [] as mcv}
      <Button
        wait="{true}"
        click="{() => {
          download(
            version?.primary_download,
            mcv,
            version?.resource_pack_download ? true : false
          );
        }}">{mcv}</Button>
    {/each}
  </div>
  <p class="pr-1 text-xs italic text-zinc-950 dark:text-white">
    If your version is not listed above, then this datapack is not supported for
    your version.
  </p>

  {#if version?.resource_pack_download}
    <CasualLine />
    <p class="pr-1 text-zinc-950 dark:text-white">
      This datapack also has a resource pack which you need to download!
    </p>
    <div class="my-2 flex">
      <a href="{version?.resource_pack_download}" class="button-primary">
        Download Resource Pack
      </a>
    </div>
  {/if}
  <CasualLine />
  <p class="flex items-center space-x-1 pr-1 text-sm text-blue-300">
    <IconInfo /><a href="/install">How to install a datapack</a>
  </p>
</Modal>
