<script lang="ts">
  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import ProjectNav from "$lib/components/project/ProjectNav.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";
  import Select from "$lib/components/utility/Select.svelte";
  import type { Version } from "$lib/globals/schema";
  import { dpvDict, dpvDictAll } from "$lib/globals/versions";
  import autoAnimate from "@formkit/auto-animate";
  import { readable } from "svelte/store";
  import type { PageData } from "./$types";

  export let data: PageData;

  // Local vars

  let selectedVersions = readable("");
  let showSnapshot = false;

  // Version filtering
  $: versionMatches =
    $selectedVersions.split(", ").at(0) == ""
      ? data.versions
      : data.versions.filter((dp: Version) =>
          dp.minecraft_versions
            .split(",")
            .some(version =>
              $selectedVersions.split(", ").includes(dpvDictAll[version])
            )
        );
</script>

<main
  id="main-content"
  class="bg-slate-50 px-0 pb-64 transition-all dark:bg-zinc-900 sm:px-8 md:px-16 lg:px-24">
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

      <div
        class="mb-2 items-center rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
        {#if data.versions?.length != 0}
          <div
            class="mb-3 rounded-lg bg-slate-100 p-3 dark:bg-zinc-900 dark:text-white">
            <Select
              emptyString="{'Filter by Minecraft Versions'}"
              multi="{true}"
              bind:selected="{selectedVersions}"
              options="{Object.values(
                showSnapshot ? dpvDictAll : dpvDict
              ).reverse()}" />
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
          </div>
          <ul use:autoAnimate class="space-y-2">
            {#each versionMatches ?? [] as version}
              <VersionDisplay {version} project="{data.project}" />
            {/each}
          </ul>
          <p class="mx-1 mt-2 text-zinc-950 dark:text-white">
            (Showing {versionMatches?.length} versions)
          </p>
        {:else}
          <h2 class=" text-xl text-zinc-950 dark:text-white">
            <b>No versions yet!</b> Why not
            <a
              href="/project/{data.project?.url}/edit"
              class="text-blue-500 underline">create one</a
            >?
          </h2>
        {/if}
      </div>
    </div>
  </div>
</main>
