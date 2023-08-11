<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import autoAnimate from "@formkit/auto-animate";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";

  import type { Project, User } from "$lib/globals/schema";
  import { title } from "radash";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import IconCube from "~icons/tabler/Box.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconUpdate from "~icons/tabler/Refresh.svelte";
  import IconCross from "~icons/tabler/X.svelte";
  import CasualLine from "../decorative/CasualLine.svelte";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";

  // Component args
  export let project: Project;

  let mm: HTMLDivElement;
  let status = project.status ?? "unpublished";
  let formatter = Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  // Dismiss the mod message function
  async function dismissModeratorMessage() {
    mm.remove();
    let dsm = await fetchAuthed(
      "DELETE",
      "/moderation/project/" + project?.ID?.toString() + "/dismiss_message"
    );
    if (dsm.ok) {
      mm.remove();
      return toast.success("Deleted the message!");
    }
  }
</script>

<div class="h-fit w-full lg:w-2/5 xl:w-1/3 flex-col mr-4" use:autoAnimate>
  <div class="my-3 mb-4 text-sky-300" use:autoAnimate>
    <a href="/projects">
      <IconBack class="inline" /> Explore other projects
    </a>
  </div>
  <div
    class="rounded-xl border-slate-200 p-4 mb-2 bg-slate-200 dark:bg-zinc-800">
    <div class="max-w-fit items-top space-x-3 flex">
      {#if project?.icon}
        <img
          src="{project?.icon}"
          alt="{project?.title} icon"
          class="aspect-square w-16 h-16 rounded-lg bg-cover"
          width="64"
          height="64" />
      {:else}
        <div
          class="bg-slate-300 dark:bg-zinc-700 p-4 w-16 h-16 rounded-xl dark:text-white">
          <IconNoPhoto width="32" height="32" />
        </div>
      {/if}
      <div>
        <h1
          class="flex items-center text-3xl font-bold text-slate-950 dark:text-white">
          {project?.title}
        </h1>
        <div class="flex items-center space-x-1 mt-1 min-w-fit">
          <a
            href="/user/{project.author?.username}"
            class="flex items-center space-x-1">
            <img
              src="{project.author?.profile_icon}&size=32"
              class="max-h-5 rounded-full"
              alt="{project.author?.username}'s profile picture"
              width="20"
              height="20" />
            <span
              class="text-xs xl:text-sm text-slate-950 transition-all hover:underline dark:text-white">
              {project.author?.username}
            </span>
          </a>
        </div>
      </div>
    </div>
    <div>
      <h2
        class="mt-2 text-base text-slate-950/60 transition-all dark:text-white/60">
        {project?.description}
      </h2>
      <p class="flex items-center space-x-2 text-md my-2 dark:text-white">
        <IconCube />
        <span class="font-bold">Categories:</span>
        <span>{project.category?.join(", ")}</span>
      </p>
      <div class="my-3">
        <CasualLine />
      </div>
    </div>
    <div>
      <h1
        class="flex items-center space-x-2 text-md mt-2 font-medium text-slate-950 dark:text-white">
        <IconDL />
        <span><b>Downloads: </b>{project?.downloads}</span>
      </h1>
      <h1
        class="flex items-center space-x-2 text-md mt-1 font-medium text-slate-950 dark:text-white">
        <IconUpdate />
        <span>
          <b>Last updated:</b>
          {formatter.format((project?.updated ?? 0) * 1000)}
        </span>
      </h1>

      <div class="mt-2">
        {#if ["unpublished", "draft"].includes(status)}
          <span class="text-zinc-400">•</span>
          <span class="text-zinc-400 font-bold mt-2">{title(status)}</span>
        {:else if ["disabled"].includes(status)}
          <span class="text-red-400">•</span>
          <span class="text-red-400 font-bold mt-2"
            >{title(status.replaceAll("_", " "))}</span>
        {:else if ["review_queue", "publish_queue"].includes(status)}
          <span class="text-yellow-600">•</span>
          <span class="text-yellow-600 font-bold pt-2">In Queue</span>
        {/if}
      </div>
    </div>
  </div>
  {#if project?.mod_message}
    <div
      class="mt-4 rounded-xl p-4 moderation dark:text-slate-100"
      id="modmsg"
      bind:this="{mm}">
      {#if status && !["disabled", "review_queue"].includes(status)}
        <button
          class="float-right cursor-pointer select-none font-black text-slate-950 dark:text-white"
          on:click="{dismissModeratorMessage}"><IconCross /></button>
      {/if}
      <p class=" font-black">Message from Datapack Hub Staff:</p>
      <p
        class="prose mb-1 mt-2 rounded-xl moderation-hl p-2 dark:text-zinc-300">
        <MarkdownComponent source="{project?.mod_message}" />
      </p>
      <p class=" text-xs opacity-50">
        Only you (and staff) can read this message. Once you've acknowledged it,
        you can dismiss the message if the project isn't disabled.
      </p>
    </div>
  {/if}
  <p class="text-zinc-600">Project ID: {project?.ID}</p>
</div>
