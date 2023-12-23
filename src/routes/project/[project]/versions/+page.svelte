<script lang="ts">
  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import ProjectNav from "$lib/components/project/ProjectNav.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";
  import Select from "$lib/components/utility/Select.svelte";
  import { minecraftVersions } from "$lib/globals/consts";
  import type { Version } from "$lib/globals/schema";
  import autoAnimate from "@formkit/auto-animate";
  import { readable } from "svelte/store";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  // Local vars

  let selectedVersions = readable("");

  $: console.log($selectedVersions.split(", "));

  // Version filtering
  $: versionMatches =
    $selectedVersions.split(", ").at(0) == ""
      ? data.versions
      : data.versions.filter((dp: Version) =>
          dp.minecraft_versions
            .split(",")
            .some(version => $selectedVersions.split(", ").includes(version))
        );
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

      <div
        class="mb-2 items-center rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
        <div class="mb-3 text-blue-300" use:autoAnimate>
          <a href="/project/{data.project.url}"
            ><IconBack class="inline" /> Back to description
          </a>
        </div>
        {#if data.versions?.length != 0}
          <div class="mb-3 rounded-lg bg-slate-100 dark:bg-zinc-900 p-3 dark:text-white">
            <Select
              emptyString="{'Filter by Minecraft Versions'}"
              multi="{true}"
              bind:selected="{selectedVersions}"
              options="{minecraftVersions}" />
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
