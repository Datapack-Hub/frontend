<script lang="ts">
  import {
    appendSize,
    fetchAuthed,
    getUserLocale
  } from "$lib/globals/functions";
  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";

  import type { Project } from "$lib/globals/schema";
  import { onMount } from "svelte";
  import IconDescription from "~icons/tabler/AlignLeft.svelte";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconList from "~icons/tabler/ClipboardCheck.svelte";
  import IconCategories from "~icons/tabler/Cube.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import { confetti } from "@neoconfetti/svelte";
  import {
    default as IconIcon,
    default as IconNoPhoto
  } from "~icons/tabler/Polaroid.svelte";
  import IconUpload from "~icons/tabler/Upload.svelte";
  import IconCross from "~icons/tabler/X.svelte";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";
  import Modal from "../modals/Modal.svelte";

  // Component args
  export let project: Project;
  export let isNew: boolean;

  let nextStepsModal: Modal;

  let numberFormatter = Intl.NumberFormat(getUserLocale(), {
    notation: "compact"
  });

  onMount(() => {
    if (isNew == true) nextStepsModal.open();
  });

  let mm: HTMLDivElement;
  let status = project.status ?? "unpublished";

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

<div class="mr-4 h-fit w-full" use:autoAnimate>
  <div class="my-3 mb-4 text-sky-500" use:autoAnimate>
    <button on:click="{() => history.back()}">
      <IconBack class="inline" /> Go Back
    </button>
  </div>
  <div class="mb-2 rounded-xl">
    <div class="flex max-w-fit flex-col space-x-0 md:flex-row md:space-x-3">
      {#if project?.icon}
        <img
          src="{project?.icon}"
          alt="{project?.title} icon"
          class="aspect-square h-24 w-24 rounded-lg bg-cover"
          width="72"
          height="72" />
      {:else}
        <div
          class="h-16 w-16 rounded-xl bg-slate-300 p-4 dark:bg-zinc-700 dark:text-white">
          <IconNoPhoto width="32" height="32" />
        </div>
      {/if}
      <div>
        <h1
          class="project-info mt-3 flex items-center text-3xl font-bold text-zinc-950 dark:text-white md:mt-0">
          {project?.title}
        </h1>
        <div class="mt-1 flex min-w-fit items-center space-x-3">
          <a
            href="/user/{project.author?.username}"
            class="flex items-center space-x-1">
            <img
              src="{appendSize(project.author?.profile_icon, 64)}"
              alt="{project.author?.username}'s profile picture"
              class="max-h-6 rounded-full"
              width="24"
              height="24" />
            <span
              class="text-sm text-zinc-950 transition-all hover:underline dark:text-white">
              {project.author?.username}
            </span>
          </a>
          <p class="hidden dark:text-white md:block">•</p>
          <div class="hidden items-center space-x-2 dark:text-white md:flex">
            {#each project?.category || [] as cat}
              <a
                href="/projects?category={encodeURIComponent(cat)}"
                class="flex space-x-1 rounded-md bg-slate-300 px-2 py-1 text-xs dark:bg-zinc-700"
                ><p>{cat}</p></a>
            {/each}
          </div>
          <p class="dark:text-white">•</p>
          <span class="flex items-center space-x-1 text-sm dark:text-white">
            <IconDL />
            <p>{numberFormatter.format(project.downloads ?? 0)}</p>
          </span>
        </div>
        <h2
          class="mt-2 text-base text-zinc-950/60 transition-all dark:text-white/60">
          {project?.description}
        </h2>
      </div>
    </div>
    <div class="mt-3 flex items-center space-x-2 dark:text-white md:hidden">
      {#each project?.category || [] as cat}
        <a
          href="/projects?category={encodeURIComponent(cat)}"
          class="flex space-x-1 rounded-md bg-slate-300 px-2 py-1 text-xs dark:bg-zinc-700"
          ><IconCategories class=" align-text-top" /><span>
            {cat}
          </span>
        </a>
      {/each}
    </div>
  </div>
  {#if project?.mod_message}
    <div
      class="moderation mt-4 rounded-xl p-4 dark:text-zinc-100"
      id="modmsg"
      bind:this="{mm}">
      {#if status && !["disabled", "review_queue"].includes(status)}
        <button
          class="float-right cursor-pointer select-none font-black text-zinc-950 dark:text-white"
          on:click="{dismissModeratorMessage}"><IconCross /></button>
      {/if}
      <p class=" font-black">Message from Datapack Hub Staff:</p>
      <p
        class="moderation-hl prose mb-1 mt-2 rounded-xl p-3 dark:text-zinc-300">
        <MarkdownComponent source="{project?.mod_message}" />
      </p>
      <p class=" text-xs opacity-50">
        Only you (and staff) can read this message. Once you've acknowledged it,
        you can dismiss the message if the project isn't disabled.
      </p>
    </div>
  {/if}
  {#if status == "draft"}
    <button
      on:click="{nextStepsModal.open}"
      class="flex items-center space-x-1 text-yellow-400">
      <IconList />
      <span class="">Open checklist</span>
    </button>
  {/if}
</div>

<Modal bind:this="{nextStepsModal}" title="Checklist">
  <div class="text-white">
    <div class="left-1/2" use:confetti></div>
    <p class="mb-2 text-black dark:text-white">
      Congrats! You've made a new empty project. Here's a quick checklist of
      what you should do next:
    </p>
    <div class="space-y-2">
      {#if !project.icon}
        <div class="rounded-xl bg-slate-300 p-3 dark:bg-zinc-900">
          <div
            class="flex items-center space-x-2 text-lg font-semibold text-yellow-500">
            <IconIcon />
            <h1>Add an icon</h1>
          </div>
          <p class="text-black dark:text-white">
            Your project icon is the first thing people will see. Make it
            simple, effective, and stand out to get people to click on it!
          </p>
        </div>
      {/if}
      {#if project.category && project.category[0] == ""}
        <div class="rounded-xl bg-slate-300 p-3 dark:bg-zinc-900">
          <div
            class="flex items-center space-x-2 text-lg font-semibold text-yellow-500">
            <IconCategories />
            <h1>Select categories</h1>
          </div>
          <p class="text-black dark:text-white">
            Categories help people search for your datapacks. If you add more
            categories, more people will find and download your datapack
          </p>
        </div>
      {/if}
      <div class="rounded-xl bg-slate-300 p-3 dark:bg-zinc-900">
        <div
          class="flex items-center space-x-2 text-lg font-semibold text-yellow-500">
          <IconDescription />
          <h1>Add relevant details</h1>
        </div>
        <p class="text-black dark:text-white">
          Unless you tell them, nobody knows how to use your datapack. Use the
          description to tell people what your datapack does, how to use it,
          etc.
        </p>
      </div>
      {#if !project.latest_version}
        <div class="rounded-xl bg-slate-300 p-3 dark:bg-zinc-900">
          <div
            class="flex items-center space-x-2 text-lg font-semibold text-blue-500">
            <IconUpload />
            <h1>Upload a version</h1>
          </div>
          <p class="text-black dark:text-white">
            Versions are your datapack's downloadable files. Upload a datapack
            file, select the Minecraft versions it supports, and users will be
            able to download your datapack with our smart download system.
          </p>
        </div>
      {/if}
      <div class="rounded-xl bg-slate-300 p-3 dark:bg-zinc-900">
        <div
          class="flex items-center space-x-2 text-lg font-semibold text-green-500">
          <IconTick />
          <h1>Submit for approval</h1>
        </div>
        <p class="text-black dark:text-white">
          Once you think your datapack is ready to be published, publish it. A
          moderator will review your datapack to make sure it follows our rules
          before going live.
        </p>
      </div>
    </div>
    <p class="mt-2 text-black dark:text-white">
      You can view this list anytime by clicking the "Open Checklist" button on
      the project page.
    </p>
  </div>
</Modal>
