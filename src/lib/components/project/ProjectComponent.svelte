<script lang="ts">
  import { appendSize } from "$lib/globals/functions";
  import type { Project } from "$lib/globals/schema";
  import { roles } from "$lib/globals/stores";
  import { title } from "radash";
  import IconDownload from "~icons/tabler/Download.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";

  export let project: Project;
  export let showStatus = false;

  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  $: userRole = $roles.find(role => role.name === project.author.role);
  $: status = project.status ?? "unpublished";
</script>

<div
  class="project-component relative h-full w-full items-center rounded-xl bg-slate-200 p-3 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100">
  <div class="items-top flex">
    <a
      href="/project/{project.url}"
      class="rounded-lg {project.icon
        ? ''
        : 'bg-slate-300 p-4 dark:bg-zinc-700 dark:text-zinc-100'} items-start">
      {#if project.icon}
        <img
          src="{project.icon}"
          alt="{project.title} icon"
          width="80"
          height="80"
          class="aspect-square w-20 rounded-lg bg-cover" />
      {:else}
        <IconNoPhoto width="48" height="48" />
      {/if}
    </a>
    <div class="ml-4 w-3/4">
      <a
        href="/project/{project.url}"
        class="text-lg hover:underline md:text-xl lg:text-2xl">
        {project.title}
      </a>
      <div
        class="mt-1 flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-100">
        <img
          src="{appendSize(project.author.profile_icon, 32)}"
          alt="{project.author.username}'s profile"
          class="h-4 rounded-full"
          height="16"
          width="16" />
        <a
          href="/user/{project.author.username.toLowerCase()}"
          class="block"
          style="color: {userRole?.color}">
          {project.author.username}
        </a>
        {#if project.latest_version}
          {@const mc_vers =
            project.latest_version.minecraft_versions.split(",")}
          <span>•</span>
          <span>
            {#if mc_vers.length != 1}
              {mc_vers[0]}-{mc_vers.at(-1)}
            {:else}
              {mc_vers[0]}
            {/if}
          </span>
        {:else}
          <span>•</span>
          <span>No versions</span>
        {/if}
        <span>•</span>
        <span
          >{formatter.format(project.downloads ?? 0)}<IconDownload
            class="ml-0.5 inline-block h-4 w-4 align-text-top" /></span>
        {#if showStatus}
          {#if ["unpublished", "draft"].includes(status)}
            <span class="text-zinc-400">•</span>
            <span class="font-bold text-zinc-400">{title(status)}</span>
          {:else if ["disabled"].includes(status)}
            <span class="text-red-500">•</span>
            <span class="font-bold text-red-500"
              >{title(status.replaceAll("_", " "))}</span>
          {:else if ["review_queue", "publish_queue"].includes(status)}
            <span class="text-yellow-600">•</span>
            <span class="font-bold text-yellow-600">In Queue</span>
          {/if}
        {/if}
      </div>
      <p
        class="max-w-1/2 mt-2 line-clamp-1 text-xs font-medium text-zinc-700 dark:text-zinc-100/40">
        {project.description}
      </p>
    </div>
  </div>
</div>
