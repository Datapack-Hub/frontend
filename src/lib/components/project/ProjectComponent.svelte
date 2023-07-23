<script lang="ts">
  import type { Project, Role } from "$lib/globals/schema";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconDownload from "~icons/tabler/Download.svelte";
  import { last, title } from "radash";
  import { siteRoles } from "$lib/globals/stores";

  export let project: Project;
  export let showStatus = false;

  let userRole = $siteRoles.find(v => v.name == project.author.role);

  let status = project.status ?? "unpublished";

  let author = project.author
</script>

<div
  class="w-full h-full items-center rounded-xl relative bg-slate-200 p-3 text-slate-950 dark:bg-stone-800 dark:text-slate-100">
  <div class="flex items-top">
    <a
      href="/project/{project.url}"
      class="rounded-lg {project.icon
        ? ''
        : 'bg-slate-300 p-4 dark:bg-stone-700 dark:text-slate-100'} items-start">
      {#if project.icon}
        <img
          src="{project.icon}"
          alt="{project.title} icon"
          width="96"
          height="96"
          loading="lazy"
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
        class="flex space-x-2 items-center text-sm text-slate-950/40 dark:text-slate-100">
        <img src={author.profile_icon} class="h-6 rounded-full"/>
        <a
          href="/user/{author.username.toLowerCase()}"
          class="block"
          style="color: {userRole?.color}">
          {author.username}
        </a>
        {#if project.latest_version}
          <span>•</span>
          <span>
            {last(project.latest_version.minecraft_versions.split(","))}
          </span>
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
        class="line-clamp-2 max-w-1/2 text-xs font-medium text-slate-950/40 dark:text-slate-100/40 mt-2">
        {project.description}
      </p>
    </div>
  </div>
</div>
