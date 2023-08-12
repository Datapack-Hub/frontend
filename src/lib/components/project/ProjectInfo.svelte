<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";

  import type { Project } from "$lib/globals/schema";
  import { title } from "radash";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import IconCube from "~icons/tabler/Box.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconUpdate from "~icons/tabler/Refresh.svelte";
  import IconCross from "~icons/tabler/X.svelte";
  import CasualLine from "../decorative/CasualLine.svelte";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";
  import Modal from "../modals/Modal.svelte";

  let nextStepsModal: Modal;

  import IconIcon from "~icons/tabler/Polaroid.svelte";
  import IconCategories from "~icons/tabler/Cube.svelte";
  import IconUpload from "~icons/tabler/Upload.svelte";
  import IconDescription from "~icons/tabler/AlignLeft.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconList from "~icons/tabler/ClipboardCheck.svelte";
  import { onMount } from "svelte";

  // Component args
  export let project: Project;
  export let is_new: boolean;

  onMount(() => {
    if(is_new == true) nextStepsModal.open()
  })

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
  {#if status == "draft"}
  <button on:click={nextStepsModal.open} class="flex items-center space-x-1 text-yellow-400">
    <IconList />
    <span class="">Open checklist</span>
  </button>
  {:else}
  <p class="text-zinc-600">Project ID: {project?.ID}</p>
  {/if}
</div>

<Modal bind:this={nextStepsModal} title="Checklist">
  <div class="text-white">
    <p class="mb-2">Congrats! You've made a new empty project. Here's a quick checklist of what you should do next:</p>
    <div class="space-y-2">
      {#if !project.icon}
      <div class="rounded-xl bg-zinc-900 p-3">
        <div class="flex text-lg font-semibold text-yellow-500 items-center space-x-2">
          <IconIcon />
          <h1>Add an icon</h1>
        </div>
        <p>Your project icon is the first thing people will see. Make it simple, effective, and stand out to get people to click on it!</p>
      </div>
      {/if}
      {#if typeof(project.category) != undefined || project.category[0] == ""}
      <div class="rounded-xl bg-zinc-900 p-3">
        <div class="flex text-lg font-semibold text-yellow-500 items-center space-x-2">
          <IconCategories />
          <h1>Select categories</h1>
        </div>
        <p>Categories help people search for your datapacks. If you add more categories, more people will find and download your datapack</p>
      </div>
      {/if}
      <div class="rounded-xl bg-zinc-900 p-3">
        <div class="flex text-lg font-semibold text-yellow-500 items-center space-x-2">
          <IconDescription />
          <h1>Add relevant details</h1>
        </div>
        <p>Unless you tell them, nobody knows how to use your datapack. Use the description to tell people what your datapack does, how to use it, etc.</p>
      </div>
      {#if !project.latest_version}
      <div class="rounded-xl bg-zinc-900 p-3">
        <div class="flex text-lg font-semibold text-sky-500 items-center space-x-2">
          <IconUpload />
          <h1>Upload a version</h1>
        </div>
        <p>Versions are your datapack's downloadable files. Upload a datapack file, select the Minecraft versions it supports, and users will be able to download your datapack with our smart download system.</p>
      </div>
      {/if}
      <div class="rounded-xl bg-zinc-900 p-3">
        <div class="flex text-lg font-semibold text-green-500 items-center space-x-2">
          <IconTick />
          <h1>Submit for approval</h1>
        </div>
        <p>Once you think your datapack is ready to be published, publish it. A moderator will review your datapack to make sure it follows our rules before going live.</p>
      </div>
    </div>
    <p class="mt-2">You can view this list anytime by clicking the "Open Checklist" button on the project page.</p>
  </div>
</Modal>
