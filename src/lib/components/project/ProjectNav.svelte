<script lang="ts">
  // Svelte imports
  import { goto } from "$app/navigation";
  import { fetchAuthed, moderatorOrAbove } from "$lib/globals/functions";
  import { isDark, roleInfo, roles, user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";
  // Component imports
  // Component imports
  import type { Project } from "$lib/globals/schema";

  import IconDescription from "~icons/tabler/AlignLeft.svelte";
  import IconConfetti from "~icons/tabler/Award.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconDownload from "~icons/tabler/Download.svelte";
  import IconReport from "~icons/tabler/Flag.svelte";
  import IconMessage from "~icons/tabler/Message.svelte";
  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconCross from "~icons/tabler/X.svelte";

  import { page } from "$app/stores";
  import Button from "$lib/components/decorative/Button.svelte";
  import DphButton from "$lib/components/decorative/DPHButton.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import UserCard from "$lib/components/user/UserCard.svelte";
  import { title } from "radash";
  import BhAdvert from "../decorative/BHAdvert.svelte";
  import Tooltip from "../utility/Tooltip.svelte";

  export let project: Project;

  // Local vars
  let moderationModalPage = "delete";

  let reportModal: Modal;
  let moderateModal: Modal;
  let featureModal: Modal;

  let status = project?.status;
  let del: HTMLDivElement;
  let postedModeratorMessage = "";
  let reportMessage = "";
  let featureDur: string;

  async function approve() {
    let p = await fetchAuthed(
      "PATCH",
      "/moderation/project/" + project?.ID?.toString() + "/action",
      {
        data: {
          action: "publish"
        }
      }
    );
    if (p.ok) {
      status = "live";
      return toast.success("Published the project!");
    } else {
      return toast.error("Something went wrong! Try again later.");
    }
  }

  async function moderate(action: string) {
    moderateModal.close();
    let moderationRequestData = {};
    switch (action) {
      case "delete": {
        moderationRequestData =
          postedModeratorMessage.length > 0
            ? {
                action: "delete",
                message: postedModeratorMessage
              }
            : {
                action: "delete"
              };
        break;
      }
      case "disable": {
        moderationRequestData =
          postedModeratorMessage.length > 0
            ? {
                action: "disable",
                message: postedModeratorMessage
              }
            : {
                action: "disable"
              };
        break;
      }
      case "write note": {
        if (postedModeratorMessage.length > 0) {
          moderationRequestData = {
            action: "write_note",
            message: postedModeratorMessage
          };
        } else {
          return toast.error("You gotta leave them a message!");
        }
        break;
      }
      case "restore": {
        moderationRequestData = {
          action: "restore"
        };
        break;
      }
    }

    toast.promise(
      fetchAuthed("PATCH", "/moderation/project/" + project?.ID + "/action", {
        data: moderationRequestData
      }).then(response => {
        if (response.ok && action == "restore") del.remove();
      }),
      {
        success: "Moderated project!",
        loading: "Moderating...",
        error:
          "Uh oh, something went wrong. If this moderation is urgent, get an admin to run an SQL command."
      }
    );
  }

  async function report() {
    reportModal.close();

    if(reportMessage.trim().length === 0) {
      toast.error("Must include a report message!")
      return
    }

    toast.loading("Reporting...")

    let result = await fetchAuthed(
      "post",
      "/projects/id/" + project?.ID + "/report",
      {
        data: { message: reportMessage }
      }
    );
    if(result.ok) {
      toast.success("Report sent!")
    } else {
      if(result.status == 404) {
        toast.error("Project does not exist!")
      }

      if(result.status == 401 || result.status == 403) {
        toast.error("Please log in before reporting!")
      }
    }
  }

  async function feature() {
    featureModal.close();

    let parsedFeatureDuration = Number.parseInt(featureDur);

    if (parsedFeatureDuration <= 0) {
      return toast.error("Cannot set time to less than 0");
    }

    toast.promise(
      fetchAuthed("post", "/projects/id/" + project?.ID + "/feature", {
        data: { expires: Number.parseInt(featureDur) }
      }),
      {
        success: "Featured project!",
        loading: "Featuring...",
        error: "Uh oh, something went wrong. Ask Cobble or Sila to fix :)"
      }
    );
  }

  $: iconColor = $isDark ? "white" : "black";
  $: activePage = $page.url.pathname.split("/")[3];
</script>

<div class="mb-4">
  <BhAdvert />
</div>

<div class="mb-2 flex items-center justify-between">
  <div class="flex space-x-2">
    <a
      class="button-base text-zinc-950 dark:text-zinc-100 {activePage
        ? 'bg-slate-200 dark:bg-zinc-800'
        : 'bg-slate-400 dark:bg-zinc-600'}"
      href="/project/{project.url}"
      aria-label="Description">
      <span class="hidden md:block">Description</span>
      <IconDescription color="{iconColor}" class="block md:hidden" />
    </a>
    <a
      class="button-base text-zinc-950 dark:text-zinc-100 {activePage ===
      'comments'
        ? 'bg-slate-400 dark:bg-zinc-600'
        : 'bg-slate-200 dark:bg-zinc-800'}"
      href="/project/{project.url}/comments"
      aria-label="Comments">
      <span class="hidden md:block">Comments</span>
      <IconMessage color="{iconColor}" class="block md:hidden" />
    </a>
  </div>
  <div class="flex space-x-1">
    {#if $user.id == project?.author.id}
      <a
        aria-label="Edit"
        class="button-base ml-auto flex items-center space-x-1 text-zinc-950 dark:text-zinc-100"
        href="/project/{project?.url}/edit">
        <IconPencil /><span class="hidden md:block">Edit</span>
      </a>
    {/if}
    {#if $user.id != project?.author.id && status == "live"}
      <Tooltip tooltipText="{'Report Project'}" placement="{'bottom'}">
        <button
          aria-label="Report Project"
          class="button-base flex items-center space-x-1 text-zinc-950 dark:text-zinc-100"
          on:click="{() => {
            reportModal.open();
          }}"><IconReport /></button>
      </Tooltip>
    {/if}
    {#if moderatorOrAbove($roleInfo)}
      {#if status == "publish_queue" || status == "review_queue"}
        <Tooltip tooltipText="{'Approve'}" placement="{'bottom'}">
          <button
            aria-label="Approve"
            class="button-base flex items-center space-x-1 bg-green-600 text-zinc-950 dark:text-zinc-100"
            on:click="{approve}"
            ><IconTick /><!--<span class="hidden md:block">Approve</span>--></button>
        </Tooltip>
        <Tooltip tooltipText="{'Request Changes'}" placement="{'bottom'}">
          <button
            aria-label="Request Changes"
            class="button-base flex items-center space-x-1 bg-yellow-600 text-zinc-950 dark:text-zinc-100"
            on:click="{() => {
              moderationModalPage = 'disable';
              moderateModal.open();
            }}"
            ><IconPencil /><!--<span class="hidden md:block">Request Changes</span
              >--></button>
        </Tooltip>
        <Tooltip tooltipText="{'Deny'}" placement="{'bottom'}">
          <button
            aria-label="Deny"
            class="button-base flex items-center space-x-1 bg-red-600 text-zinc-100"
            on:click="{() => {
              moderationModalPage = 'delete';
              moderateModal.open();
            }}"
            ><IconCross /><!--<span class="hidden md:block">Deny</span>--></button>
        </Tooltip>
        <Tooltip tooltipText="{'Moderate'}" placement="{'bottom'}">
          <button
            class="button-base space-x-1 text-zinc-950 dark:text-zinc-100"
            aria-label="Moderate"
            on:click="{() => {
              moderateModal.open();
            }}"
            ><IconShield /><!--<span class="hidden md:block">Moderate</span>--></button>
        </Tooltip>
      {/if}
      {#if status == "live"}
        <button
          aria-label="Feature"
          class="button-base flex items-center space-x-1 text-zinc-950 dark:text-zinc-100"
          on:click="{() => {
            featureModal.open();
          }}"
          ><IconConfetti />
        </button>
      {/if}
    {/if}
    <DphButton click="/project/{project.url}/download">
      <span class="hidden lg:block">Download</span>
      <IconDownload class="block lg:hidden" />
    </DphButton>
    {#if moderatorOrAbove($roleInfo) && !(status == "publish_queue" || status == "review_queue")}
      <Tooltip
        tooltipText="{'Moderate'}"
        placement="{'bottom'}"
        classes="inline-block">
        <button
          class="button-base h-10 space-x-1 bg-red-600 text-zinc-100"
          aria-label="Moderate"
          on:click="{() => {
            moderateModal.open();
          }}"
          ><IconShield /><!--<span class="hidden md:block">Moderate</span>--></button>
      </Tooltip>
    {/if}
  </div>
</div>

{#if status == "deleted"}
  <div
    class="moderation mb-2 flex items-center rounded-xl p-3"
    bind:this="{del}">
    <p class="m-1 w-full flex-grow leading-tight dark:text-white">
      <b>This project is deleted.</b> Only staff can view the project. To restore
      the project, click the restore button.
    </p>
    <button
      class="rounded-md bg-dph-orange p-1 px-2 text-white"
      on:click="{() => moderate('restore')}">Restore</button>
  </div>
{:else if status == "review_queue" || status == "publish_queue"}
  <div
    class="moderation mb-2 flex items-center rounded-xl p-3"
    bind:this="{del}">
    <p class="m-1 w-full flex-grow leading-tight dark:text-white">
      <b>This project is awaiting review.</b> A staff member will review your project
      before it goes public.
    </p>
  </div>
{:else if status == "disabled"}
  <div
    class="moderation mb-2 flex items-center rounded-xl p-3"
    bind:this="{del}">
    <p class="m-1 w-full flex-grow leading-tight dark:text-white">
      <b>This project is disabled.</b> Please read the mod message, and fix your
      project before it goes live.
    </p>
  </div>
{/if}

<Modal bind:this="{moderateModal}" title="{'Moderate ' + project.title}">
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-zinc-950 dark:text-zinc-100">User</p>
  <UserCard
    person="{project.author}"
    role="{$roles.find(v => project.author?.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p class="align-middle text-lg text-zinc-950 dark:text-zinc-100">
      Select Action
    </p>
    <button
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ===
      'delete'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'delete')}">Delete</button>
    <button
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ===
      'disable'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'disable')}">Disable</button>
    <button
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ===
      'write note'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'write note')}"
      >Write Note</button>
    <button
      class="button-base bg-slate-300 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-100"
      on:click="{() => goto('/project/' + project?.url + '/edit')}"
      >Edit Submission</button>
  </div>
  <p class="align-middle text-lg text-zinc-950 dark:text-zinc-100">
    Moderation Note
  </p>
  <textarea
    class="input h-48 w-full resize-none"
    placeholder="Write a helpful message explaining why they are being moderated. Include evidence (links etc) if applicable. Markdown is supported"
    id="description"
    maxlength="200"
    bind:value="{postedModeratorMessage}"></textarea>
  <Button click="{() => moderate(moderationModalPage)}"
    >{title(moderationModalPage)}</Button>
</Modal>

<Modal bind:this="{reportModal}" title="{'Report ' + project.title}">
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-zinc-950 dark:text-zinc-100">Author</p>
  <UserCard
    person="{project.author}"
    role="{$roles.find(v => project.author?.role == v.name)}" />
  <p class="align-middle text-lg text-zinc-950 dark:text-zinc-100">
    Report Message
  </p>
  <textarea
    class="input-base themed-input-outline h-24 w-full resize-none rounded-md bg-slate-300 p-3 dark:bg-zinc-700 dark:text-white"
    placeholder="Write a helpful message to our moderators explaining how they broke the rules. PLEASE include evidence, especially for copyright reports"
    id="report-description"
    maxlength="500"
    bind:value="{reportMessage}"></textarea>
  <Button classes="sendReportBtn" click="{() => report()}">Report</Button>
</Modal>

<Modal bind:this="{featureModal}" title="{'Feature ' + project.title}">
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-zinc-950 dark:text-zinc-100">Author</p>
  <UserCard
    person="{project.author}"
    role="{$roles.find(v => project.author?.role == v.name)}" />
  <p class="mt-3 align-middle text-zinc-950 dark:text-zinc-100">
    Duration of feature
  </p>
  <input
    type="number"
    required
    class="h-8 w-full resize-none rounded-md bg-slate-200 p-3 text-lg text-zinc-950 dark:bg-zinc-700 dark:text-white"
    bind:value="{featureDur}"
    placeholder="i.e 1, 7, 14, 30, 365" />
  <Button classes="mt-2" click="{() => feature()}">Feature</Button>
</Modal>
