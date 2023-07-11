<script lang="ts">
  // Svelte imports
  import { fetchAuthed, getAuthorFromID } from "$lib/globals/functions";
  import autoAnimate from "@formkit/auto-animate";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { fade } from "svelte/transition";
  // Componenet imports
  import IconCube from "~icons/tabler/Box.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconCross from "~icons/tabler/X.svelte";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import IconUpdate from "~icons/tabler/Refresh.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";
  import type { Project, User } from "$lib/globals/schema";
  import { title } from "radash";

  // Component args
  export let project: Project;

  // Local vars
  let visible = false;
  let author: User;
  let mm: HTMLDivElement;
  let status = project.status ?? "unpublished";
  let formatter = Intl.DateTimeFormat("en", {
    dateStyle: "short",
    timeStyle: "medium"
  });

  // Get author data on load
  onMount(async () => {
    author = await getAuthorFromID(project?.author ?? 0);
    visible = true;
  });

  // Dismiss the mod message function
  async function dismissModMsg() {
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
    class="rounded-xl border-pearl-lusta-200 p-4 mb-2 bg-pearl-lusta-200 dark:bg-pearl-lusta-50/10">
    <div class="max-w-fit items-center space-x-2 flex">
      {#if project?.icon}
        <img
          src="{project?.icon}"
          alt="{project?.title} icon"
          class="aspect-square w-16 h-16 rounded-lg bg-cover"
          width="64"
          height="64" />
      {:else}
        <div
          class="bg-pearl-lusta-300 dark:bg-stone-700 p-4 w-16 h-16 rounded-xl dark:text-white">
          <IconNoPhoto width="32" height="32" />
        </div>
      {/if}
      <h1
        class="flex items-center text-4xl font-bold text-pearl-lusta-950 dark:text-white">
        {project?.title}
      </h1>
    </div>
    <div>
      <h2
        class="mt-2 text-base text-pearl-lusta-950/60 transition-all dark:text-white/60">
        {project?.description}
      </h2>
      <h1
        class="flex items-center space-x-2 text-md mt-2 font-medium text-pearl-lusta-950 dark:text-white">
        <IconDL />
        <span>{project?.downloads} downloads</span>
      </h1>
      <h1
        class="flex items-center space-x-2 text-md mt-2 font-medium text-pearl-lusta-950 dark:text-white">
        <IconUpdate />
        <span>Last updated: {formatter.format(project?.updated)}</span>
      </h1>
      {#if visible}
        <div class="mt-4 flex items-center space-x-2 min-w-fit">
          <a
            href="/user/{author?.username}"
            class="flex items-center space-x-2">
            <img
              src="{author?.profile_icon}?size=48"
              class="max-h-8 rounded-full"
              width="32"
              height="32"
              alt="{author?.username}'s profile picture" />
            <span
              class="text-xs md:text-sm xl:text-base text-pearl-lusta-950 transition-all hover:underline dark:text-white"
              in:fade="{{ duration: 250 }}">
              {author?.username}
            </span>
          </a>
          <span class="text-xs md:text-sm xl:text-base dark:text-white">•</span>
          <span
            class="flex items-center text-xs md:text-sm xl:text-base space-x-1 dark:text-white">
            <IconCube />
            <p>{project?.category}</p>
          </span>
        </div>
        <div class="mt-2">
          {#if ["unpublished", "draft"].includes(status)}
            <span class="text-stone-400">•</span>
            <span class="text-stone-400 font-bold mt-2">{title(status)}</span>
          {:else if ["disabled"].includes(status)}
            <span class="text-red-400">•</span>
            <span class="text-red-400 font-bold mt-2"
              >{title(status.replaceAll("_", " "))}</span>
          {:else if ["review_queue", "publish_queue"].includes(status)}
            <span class="text-yellow-600">•</span>
            <span class="text-yellow-600 font-bold pt-2">In Queue</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  {#if project?.mod_message}
    <div
      class="mt-4 rounded-xl p-4 moderation dark:text-pearl-lusta-100"
      id="modmsg"
      bind:this="{mm}">
      {#if status && !["disabled", "review_queue"].includes(status)}
        <button
          class="float-right cursor-pointer select-none font-black text-pearl-lusta-950 dark:text-white"
          on:click="{dismissModMsg}"><IconCross /></button>
      {/if}
      <p class=" font-black">Message from Datapack Hub Staff:</p>
      <p
        class="prose mb-1 mt-2 rounded-xl moderation-hl p-2 dark:text-stone-300">
        <MarkdownComponent source="{project?.mod_message}" />
      </p>
      <p class=" text-xs opacity-50">
        Only you (and staff) can read this message. Once you've acknowleged it,
        you can dismiss the message if the project isn't disabled.
      </p>
    </div>
  {/if}
  <p class="text-stone-600">Project ID: {project?.ID}</p>
</div>
