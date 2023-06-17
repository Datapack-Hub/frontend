<script lang="ts">
  // Svelte imports
  import {
    fetchAuthed,
    getAuthorFromID,
    titleCase
  } from "$lib/globals/functions";
  import autoAnimate from "@formkit/auto-animate";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { fade } from "svelte/transition";
  // Componenet imports
  import IconCube from "~icons/tabler/Box.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconCross from "~icons/tabler/X.svelte";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";
  import type { Project, User } from "$lib/globals/schema";

  // Component args
  export let project: Project;

  // Local vars
  let visible = false;
  let author: User;
  let mm: HTMLDivElement;

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

  // Format the status
  function formatStatus(status?: string) {
    if (status) return "";
    if (status == "review_queue" || status == "publish_queue")
      return "In Queue";
    return titleCase(status);
  }
</script>

<div class="h-fit w-full lg:w-2/5 xl:w-1/4 flex-col" use:autoAnimate>
  <div class="my-3 text-sky-300" use:autoAnimate>
    <a href="/projects">
      <IconBack class="inline" /> Explore other projects
    </a>
  </div>
  <div
    class="rounded-xl border-pearl-lusta-200 p-4 mb-2 bg-pearl-lusta-200 dark:bg-pearl-lusta-100/10">
    <div class="flex space-x-2">
      {#if project?.icon}
        <img
          loading="lazy"
          src="{project?.icon}"
          alt="{project?.title} icon"
          class="aspect-square w-20 h-20 rounded-lg bg-cover" />
      {:else}
        <div class="bg-stone-600 p-4 rounded-xl dark:text-white">
          <IconNoPhoto width="48" height="48" />
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
      {#if visible}
        <div class="mt-4 flex items-center space-x-2 min-w-fit">
          <a
            href="/user/{author?.username}"
            class="flex items-center space-x-2">
            <img
              loading="lazy"
              src="{author?.profile_icon}?size=32"
              class="max-h-7 rounded-full"
              alt="pfp" />
            <span
              class=" text-sm md:text-base xl:text-lg text-pearl-lusta-950 transition-all hover:underline dark:text-white"
              in:fade="{{ duration: 250 }}">
              {author?.username}
            </span>
          </a>
          <span class=" dark:text-white"> • </span>
          <span class="flex items-center space-x-1 dark:text-white">
            <IconCube />
            <p>{project?.category}</p>
          </span>
          <span class=" dark:text-white"> • </span>
          <span class="{project.status}">{formatStatus(project.status)}</span>
        </div>
      {/if}
    </div>
    {#if project?.mod_message}
      <div
        class="mt-4 rounded-xl p-4 moderation dark:text-pearl-lusta-100"
        id="modmsg"
        bind:this="{mm}">
        {#if project.status && !["disabled", "review_queue"].includes(project.status)}
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
          Only you (and staff) can read this message. Once you've acknowleged
          it, you can dismiss the message if the project isn't disabled.
        </p>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .live {
    @apply text-green-500;
  }

  .disabled .deleted {
    @apply text-red-500;
  }

  .review_queue .publish_queue {
    @apply text-yellow-500;
  }

  .draft .unpublished {
    @apply text-stone-500;
  }
</style>
