<script lang="ts">
  import type { PageData } from "./$types";
  // Svelte imports
  import { toast } from "svelte-sonner";
  // Component imports

  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import ProjectNav from "$lib/components/project/ProjectNav.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";
  import type { Version } from "$lib/globals/schema";
  import { user } from "$lib/globals/stores";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import IconRight from "~icons/tabler/CaretRightFilled.svelte";
  import IconAlert from "~icons/tabler/AlertHexagon.svelte";
  import IconFiles from "~icons/tabler/Files.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { tick } from "svelte";
  import { dpvDictAll, versionMatches } from "$lib/globals/versions";

  export let data: PageData;

  let pickedVersion: string | undefined;
  let stitchedVersions: string = "";
  let matches: Version[] = [];

  // Version filtering

  if (data.versions)
    for (const item of data.versions) {
      stitchedVersions += item.minecraft_versions;
    }

  function pickVersions(vs: string) {
    matches = [];
    pickedVersion = vs;
    for (const v of data.versions.filter((versions: Version) =>
      versionMatches(vs, versions.minecraft_versions)
    )) {
      matches = [...matches, v];
    }
    if (matches?.length == 0)
      return toast.info("The latest version doesn't support " + dpvDictAll[vs]);
    tick().then(() => {
      document.querySelector("#download-content")?.scrollIntoView();
    });
  }
</script>

<main
  id="main-content"
  class="bg-slate-50 px-0 pb-64 transition-all sm:px-8 md:px-16 lg:px-24 dark:bg-zinc-900">
  <div class="md:pt-28"></div>
  <div class="flex w-full flex-col px-4">
    <!--Project Meta-->
    <ProjectInfo
      project="{data.project}"
      isNew="{data.new == '1' ? true : false}" />
    <!--Main-->
    <div id="project-content" class="mt-4 w-full">
      <!--Buttons-->
      <ProjectNav project="{data.project}" />

      <div class="mb-2 items-center space-y-2">
        <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
          <div class="mb-3 text-blue-300">
            <a href="/project/{data.project.url}"
              ><IconBack class="inline" /> Back to description
            </a>
          </div>
          {#if data.versions?.length != 0}
            <p class="dark:text-zinc-100">Select a Minecraft version:</p>
            <div class="grid-auto-fit-lg grid gap-3">
              {#each Object.keys(dpvDictAll).reverse() ?? [] as v}
                {#if versionMatches(v, stitchedVersions)}
                  {@const mcVersions =
                    data.project?.latest_version?.minecraft_versions ?? ""}
                  <button
                    data-test-btn="{v}"
                    class="flex cursor-pointer items-center space-x-2 rounded-md bg-slate-300 p-3 transition-all hover:scale-102 dark:bg-zinc-700
                  {versionMatches(v, mcVersions)
                      ? ' dark:text-zinc-100'
                      : ' text-red-500'}"
                    on:click="{() => pickVersions(v)}">
                    {#if !versionMatches(v, mcVersions)}
                      <IconAlert />
                    {/if}
                    <div
                      class="flex flex-grow items-center space-x-2 font-bold">
                      <p>{dpvDictAll[v] ?? v}</p>
                      {#if versionMatches(v, mcVersions)}
                        <p class="font-thin italic">
                          {data.project.latest_version?.version_code}
                        </p>
                      {/if}
                    </div>
                    <IconRight />
                  </button>
                {/if}
              {/each}
              <a
                class="flex cursor-pointer items-center space-x-2 rounded-md bg-slate-400 p-3 transition-all hover:scale-102 dark:bg-zinc-600 dark:text-white"
                href="/project/{data.project.url}/versions">
                <div class="flex flex-grow items-center space-x-2 font-bold">
                  <p>Show All Versions</p>
                </div>
                <IconRight />
              </a>
            </div>
            <div class="mt-2 flex items-center space-x-1 text-zinc-500">
              <IconAlert />
              <p>means the datapack version is outdated</p>
            </div>
          {:else}
            <h2 class=" text-xl text-zinc-950 dark:text-white">
              <b>No versions yet!</b>
              {#if data.project.author.id == $user.id}Why not
                <a
                  href="/project/{data.project?.url}/edit"
                  class="text-blue-500 underline">create one</a
                >?{/if}
            </h2>
          {/if}
        </div>
        {#if matches.length > 0}
          <div
            id="download-content"
            class="scroll-mt-20 rounded-xl bg-slate-200 p-3 dark:bg-zinc-800"
            use:autoAnimate>
            <p class="MB-6 text-white">
              Latest version for {pickedVersion}:
            </p>
            <ul class="space-y-2">
              <VersionDisplay
                version="{matches[0]}"
                expanded="{true}"
                project="{data.project}"
                mcVersion="{pickedVersion}" />
            </ul>
            <p
              class="text-md mt-2 flex items-center space-x-1 pr-1 text-blue-400">
              <IconFiles />
              <a
                href="/project/{data.project.url}/versions"
                class="cursor-pointer">Show Version History</a>
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>
