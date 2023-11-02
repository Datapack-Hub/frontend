<script lang="ts">
  import type { PageData } from "./$types";
  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import ProjectNav from "$lib/components/project/ProjectNav.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";
  import { minecraftVersions } from "$lib/globals/consts";
  import type { Version } from "$lib/globals/schema";
  import autoAnimate from "@formkit/auto-animate";
  import { MultiSelect } from "svelte-multiselect";
  import IconBack from "~icons/tabler/ArrowBack.svelte";

  export let data: PageData;

  // Local vars

  let selectedVersions: string[] = [];

  // Version filtering
  $: versionMatches =
    selectedVersions.length > 0 && data.versions !== undefined
      ? data.versions.filter((dp: Version) =>
          dp.minecraft_versions
            .split(",")
            .some(version => selectedVersions.includes(version))
        )
      : data.versions;
</script>

<main
  id="main-content"
  class="bg-slate-50 px-0 pb-64 transition-all dark:bg-zinc-900 sm:px-8 md:px-16 lg:px-24">
  <div class="md:pt-32"></div>
  <div class="flex w-full flex-col px-4 lg:flex-row">
    <!--Project Meta-->
    <ProjectInfo
      project="{data.project}"
      isNew="{data.new == '1' ? true : false}" />
    <!--Main-->
    <div id="project-content" class="mt-4 w-full lg:mt-0 lg:w-3/4">
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
          <div class="flex w-full items-center space-x-2 dark:text-white">
            <p class="mr-2 text-xs md:text-sm lg:text-base">
              Minecraft Version:
            </p>
            <MultiSelect
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
