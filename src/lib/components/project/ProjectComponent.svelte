<script lang="ts">
  import { getAuthorFromID } from "$lib/globals/functions";
  import type { Project } from "$lib/globals/schema";
  import { onMount } from "svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconDownload from "~icons/tabler/Download.svelte";
  import { title } from "radash";

  export let project: Project;
  export let showStatus = false;

  $: author = { username: "Loading..." };

  let status = project.status ?? "unpublished";

  onMount(async () => {
    author = await getAuthorFromID(project.author);
  });
</script>

<div
  class="w-full items-center rounded-xl relative bg-pearl-lusta-200 p-3 text-pearl-lusta-950 dark:bg-stone-800 dark:text-pearl-lusta-100">
  <div class="flex items-center">
    <a
      href="/project/{project.url}"
      class="rounded-lg {project.icon
        ? ''
        : 'bg-pearl-lusta-300 p-4 dark:bg-stone-700 dark:text-pearl-lusta-100'}">
      {#if project.icon}
        <img
          src="{project.icon}"
          alt="{project.title} icon"
          width="96"
          height="96"
          class="aspect-square w-20 rounded-lg bg-cover" />
      {:else}
        <IconNoPhoto width="48" height="48" />
      {/if}
    </a>
    <div class="ml-4 w-3/4">
      <a
        href="/project/{project.url}"
        class=" text-lg hover:underline md:text-xl lg:text-2xl">
        {project.title}
      </a>
      <div
        class="flex space-x-2 items-center text-sm text-pearl-lusta-950/40 dark:text-pearl-lusta-100">
        <a
          href="/user/{author.username.toLowerCase()}"
          class="block dark:hover:text-pearl-lusta-100">
          {author.username}
        </a>
        {#if project.latest_version}
          <span>•</span>
          <span
            >{project.latest_version.minecraft_versions.split(",")[
              project.latest_version.minecraft_versions.split(",").length - 1
            ]}</span>
        {:else}
          <span>•</span>
          <span>No versions</span>
        {/if}
        <span>•</span>
        <span
          >{project.downloads}<IconDownload
            class="inline-block h-4 w-4 align-text-top ml-0.5" /></span>
        {#if showStatus}
          {#if ["unpublished", "draft"].includes(status)}
            <span class="text-stone-400">•</span>
            <span class="text-stone-400 font-bold">{title(status)}</span>
          {:else if ["disabled"].includes(status)}
            <span class="text-red-500">•</span>
            <span class="text-red-500 font-bold"
              >{title(status.replaceAll("_", " "))}</span>
          {:else if ["review_queue", "publish_queue"].includes(status)}
            <span class="text-yellow-600">•</span>
            <span class="text-yellow-600 font-bold">In Queue</span>
          {/if}
        {/if}
      </div>
      <p
        class="line-clamp-2 max-w-1/2 text-xs font-medium text-pearl-lusta-950/40 dark:text-pearl-lusta-100/40 mt-2">
        {project.description}
      </p>
    </div>
  </div>
</div>
