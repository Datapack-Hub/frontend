<script lang="ts">
  import { browser } from "$app/environment";
  import { fetchAuthed, getAuthorFromID } from "$lib/globals/functions";
  import toast from "svelte-french-toast";
  import { fade } from "svelte/transition";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconX from "~icons/tabler/X.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";
  import type { Project, User, Report } from "$lib/globals/schema";

  export let project: Project;
  export let report: Report;

  let author: User;
  let visible = false;

  let me: HTMLDivElement;

  (async () => {
    if (browser) author = await getAuthorFromID(project.author);
    visible = true;
  })();

  async function remove() {
    let rem = await fetchAuthed(
      "delete",
      "/moderation/remove_report/" + report.id
    );
    if (rem.ok) {
      toast.success("Dismissed report!");
      me.remove();
    } else {
      toast.error("Blame Silabear, this didnt work.");
    }
  }
</script>

<div
  class="w-full items-center rounded-xl relative bg-pearl-lusta-200 p-3 text-pearl-lusta-950 dark:bg-stone-800 dark:text-pearl-lusta-100"
  bind:this="{me}">
  <div class="flex items-center">
    <a
      href="/project/{project.url}"
      class="rounded-lg {project.icon
        ? ''
        : 'bg-pearl-lusta-300 p-4 dark:bg-stone-700 dark:text-pearl-lusta-100'}">
      {#if project.icon}
        <img
          loading="lazy"
          src="{project.icon}"
          alt="{project.title} icon"
          width="96"
          height="96"
          class="aspect-square w-20 rounded-lg bg-cover" />
      {:else}
        <IconNoPhoto width="48" height="48" />
      {/if}
    </a>
    <div class="ml-4 w-2/3">
      <a
        href="/project/{project.url}"
        class=" text-lg hover:underline md:text-xl lg:text-2xl">
        {project.title}
      </a>
      {#if visible}
        <div
          class="flex space-x-2 text-md text-pearl-lusta-950/40 dark:text-pearl-lusta">
          <a
            href="/user/{author.username.toLowerCase()}"
            class="block dark:hover:text-pearl-lusta-100"
            in:fade="{{ duration: 250 }}">
            {author.username}
          </a>
          {#if project.latest_version}
            <span>•</span>
            <span
              >{project.latest_version.minecraft_versions.split(",")[
                project.latest_version.minecraft_versions.split(",").length - 1
              ]}</span>
            <span>•</span>
            <span>{project.latest_version.version_code}</span>
          {:else}
            <span>•</span>
            <span>No versions</span>
          {/if}
        </div>
      {/if}
      <p
        class="line-clamp-2 text-sm font-medium text-pearl-lusta-950/40 dark:text-pearl-lusta-100/40 md:text-sm">
        {project.description}
      </p>
    </div>
  </div>
  <div class="moderation mt-2 p-2 rounded-xl relative">
    <b>Reported by {report.reporter.username}:</b>
    <div class="moderation-hl px-2 py-1 rounded-lg">
      <MarkdownComponent source="{report.message}" />
    </div>
    <button class="absolute right-0 top-0 p-2" on:click="{remove}"
      ><IconX /></button>
  </div>
</div>
