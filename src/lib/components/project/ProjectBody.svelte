<script lang="ts">
  // Svelte imports
  import { goto } from "$app/navigation";
  import { API, minecraftVersions } from "$lib/globals/consts";
  import { fetchAuthed, moderatorOrAbove } from "$lib/globals/functions";
  import { authed, roleInfo, roles, user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";
  // Component imports
  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";
  import {
    commentSchema,
    type DPHComment,
    type Project,
    type Version
  } from "$lib/globals/schema";
  import MultiSelect from "svelte-multiselect";
  import tippy from "sveltejs-tippy";

  import IconAlert from "~icons/tabler/AlertTriangle.svelte";
  import IconDescription from "~icons/tabler/AlignLeft.svelte";
  import IconBack from "~icons/tabler/ArrowBack.svelte";
  import IconConfetti from "~icons/tabler/Award.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconRight from "~icons/tabler/ChevronRight.svelte";
  import IconDownload from "~icons/tabler/Download.svelte";
  import IconFiles from "~icons/tabler/Files.svelte";
  import IconReport from "~icons/tabler/Flag.svelte";
  import IconMessage from "~icons/tabler/Message.svelte";
  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconCross from "~icons/tabler/X.svelte";

  import { sort, title } from "radash";
  import BhAdvert from "../decorative/BHAdvert.svelte";
  import Button from "../decorative/Button.svelte";
  import CasualLine from "../decorative/CasualLine.svelte";
  import Modal from "../modals/Modal.svelte";
  import UserCard from "../user/UserCard.svelte";
  import Comment from "./Comment.svelte";

  // we need to split this up more or something jeez

  // Component args
  export let project: Project;
  export let datapackVersions: Version[];
  export let comments: DPHComment[];

  // Local vars
  let activePage = "description";
  let moderationModalPage = "delete";

  let selectedVersions: string[] = [];
  let pickedVersion: string | undefined;
  let stitchedVersions: string = "";
  let matches: Version[] = [];

  let reportModal: Modal;
  let moderateModal: Modal;
  let featureModal: Modal;

  let status = project?.status;
  let del: HTMLDivElement;
  let postedModeratorMessage = "";
  let reportMessage = "";
  let featureDur: string;

  let innerWidth: number;

  let comment: string;
  let commentSending = false;

  // Version filtering
  $: versionMatches =
    selectedVersions.length > 0 && datapackVersions !== undefined
      ? datapackVersions.filter(dp =>
          dp.minecraft_versions
            .split(",")
            .some(version => selectedVersions.includes(version))
        )
      : datapackVersions;

  if (datapackVersions)
    for (const item of datapackVersions) {
      stitchedVersions += item.minecraft_versions;
    }

  function pickVersions(vs: string) {
    matches = [];
    pickedVersion = vs;
    for (const v of datapackVersions.filter(versions =>
      versions.minecraft_versions.split(",").includes(vs)
    )) {
      matches = [...matches, v];
    }
    if (matches?.length == 0)
      return toast.error("This datapack doesn't support " + vs);
  }

  async function approve() {
    let p = await fetchAuthed(
      "PATCH",
      "/moderation/project/" + project?.ID?.toString() + "/action",
      {
        action: "publish"
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
    let moderationRequestData: object = {};
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
      fetchAuthed(
        "PATCH",
        "/moderation/project/" + project?.ID + "/action",
        moderationRequestData
      ).then(response => {
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
    toast.promise(
      fetchAuthed("post", "/projects/id/" + project?.ID + "/report", {
        message: reportMessage
      }),
      {
        success: "Reported project! A moderator will review your report ASAP.",
        loading: "Reporting...",
        error:
          "Uh oh, something went wrong. In the meantime, please report this bug on our Discord."
      }
    );
  }

  async function feature() {
    featureModal.close();
    toast.promise(
      fetchAuthed("post", "/projects/id/" + project?.ID + "/feature", {
        expires: Number.parseInt(featureDur)
      }),
      {
        success: "Featured project!",
        loading: "Featuring...",
        error: "Uh oh, something went wrong."
      }
    );
  }

  async function postComment() {
    commentSending = true;
    if (comment.length === 0) {
      commentSending = false;
      toast.error("Comment field is empty!");
      return;
    }
    toast.promise(
      fetchAuthed("POST", `/comments/thread/${project.ID}/post`, {
        message: comment
      }).then(async response => {
        if (response.ok) {
          let newComments = await fetch(API + "/comments/thread/" + project.ID);
          let newCommentsJson = await newComments.json();
          let parsedComments = await commentSchema
            .array()
            .parseAsync(newCommentsJson.result);
          comments = parsedComments;
          comment = "";
          commentSending = false;
          return;
        }
        commentSending = false;
      }),
      {
        success: "Comment posted successfully!",
        error: "Something went wrong!",
        loading: "Posting..."
      }
    );
  }

  $: isSmall = innerWidth < 768;
</script>

<svelte:window bind:innerWidth />

<div use:autoAnimate class="w-full mt-4 lg:w-3/4 lg:mt-0">
  <!--Buttons-->
  <div class="mb-2 flex items-center justify-between space-x-2">
    <div class="space-x-1.5">
      <button
        class="button-base {activePage === 'description'
          ? 'bg-slate-400 dark:bg-stone-600'
          : 'bg-slate-200 dark:bg-stone-800'}"
        on:click="{() => (activePage = 'description')}"
        aria-label="Description">
        {#if !isSmall}
          Description
        {:else}
          <IconDescription />
        {/if}
      </button>
      <button
        class="button-base {activePage === 'comments'
          ? 'bg-slate-400 dark:bg-stone-600'
          : 'bg-slate-200 dark:bg-stone-800'}"
        on:click="{() => (activePage = 'comments')}"
        aria-label="Comments">
        {#if !isSmall}
          Comments
        {:else}
          <IconMessage />
        {/if}
      </button>
    </div>
    <div class="flex space-x-1.5">
      {#if $user.id == project?.author.id}
        <a
          aria-label="Edit"
          class="button-base ml-auto flex items-center space-x-1"
          href="/project/{project?.url}/edit">
          <IconPencil /><span class="hidden md:block">Edit</span>
        </a>
      {/if}
      {#if $user.id != project?.author.id && status == "live"}
        <button
          aria-label="Report"
          class="button-base flex items-center space-x-1"
          on:click="{() => {
            reportModal.open();
          }}"><IconReport /><span class="hidden md:block">Report</span></button>
      {/if}
      {#if moderatorOrAbove($roleInfo)}
        {#if status == "publish_queue" || status == "review_queue"}
          <button
            aria-label="Approve"
            class="button-base flex items-center space-x-1 bg-green-600"
            on:click="{approve}"
            use:tippy="{{ content: 'Approve', placement: 'bottom' }}"
            ><IconTick /><!--<span class="hidden md:block">Approve</span>--></button>
          <button
            aria-label="Request Changes"
            class="button-base flex items-center space-x-1 bg-yellow-600"
            on:click="{() => {
              moderationModalPage = 'disable';
              moderateModal.open();
            }}"
            use:tippy="{{ content: 'Request Changes', placement: 'bottom' }}"
            ><IconPencil /><!--<span class="hidden md:block">Request Changes</span
            >--></button>
          <button
            aria-label="Deny"
            class="button-base flex items-center space-x-1 bg-red-600"
            on:click="{() => {
              moderationModalPage = 'delete';
              moderateModal.open();
            }}"
            use:tippy="{{ content: 'Deny', placement: 'bottom' }}"
            ><IconCross /><!--<span class="hidden md:block">Deny</span>--></button
          >moderatorOrAbove
          <button
            class="button-base space-x-1"
            aria-label="Moderate"
            on:click="{() => {
              moderateModal.open();
            }}"
            use:tippy="{{ content: 'Moderate', placement: 'bottom' }}"
            ><IconShield /><!--<span class="hidden md:block">Moderate</span>--></button>
        {/if}
        {#if status == "live"}
          <button
            aria-label="Feature"
            class="button-base flex items-center space-x-1"
            on:click="{() => {
              featureModal.open();
            }}"
            ><IconConfetti /><span class="hidden md:block">Feature</span
            ></button>
        {/if}
      {/if}
      <Button label="Download" click="{() => (activePage = 'download')}">
        {#if !isSmall}
          Download
        {:else}
          <IconDownload />
        {/if}
      </Button>
      {#if moderatorOrAbove($roleInfo) && !(status == "publish_queue" || status == "review_queue")}
        <button
          class="button-base space-x-1 bg-red-600"
          aria-label="Moderate"
          on:click="{() => {
            moderateModal.open();
          }}"
          use:tippy="{{ content: 'Moderate', placement: 'bottom' }}"
          ><IconShield /><!--<span class="hidden md:block">Moderate</span>--></button>
      {/if}
    </div>
  </div>

  <BhAdvert />

  {#if status == "deleted"}
    <div
      class="moderation rounded-xl p-2 mb-2 flex items-center"
      bind:this="{del}">
      <p class="w-full leading-tight dark:text-white flex-grow m-1">
        <b>This project is deleted.</b> Only staff can view the project. To restore
        the project, click the restore button.
      </p>
      <button
        class="bg-dph-orange rounded-md p-1 px-2 text-white"
        on:click="{() => moderate('restore')}">Restore</button>
    </div>
  {:else if status == "review_queue" || status == "publish_queue"}
    <div
      class="moderation rounded-xl p-2 mb-2 flex items-center"
      bind:this="{del}">
      <p class="w-full leading-tight dark:text-white flex-grow m-1">
        <b>This project is awaiting review.</b> A staff member will review your project
        before it goes public.
      </p>
    </div>
  {:else if status == "disabled"}
    <div
      class="moderation rounded-xl p-2 mb-2 flex items-center"
      bind:this="{del}">
      <p class="w-full leading-tight dark:text-white flex-grow m-1">
        <b>This project is disabled.</b> Please read the mod message, and fix your
        project before it goes live.
      </p>
    </div>
  {/if}
  {#if activePage == "description"}
    <div class="w-full rounded-xl bg-slate-200 p-3 dark:bg-stone-800">
      <p class="w-full leading-tight break-words">
        <MarkdownComponent
          source="{project.body}"
          classes="prose-img:my-0 prose-p:my-0 prose-headings:mb-2 prose-ul:my-3" />
      </p>
    </div>
  {:else if activePage == "versions"}
    <div
      class="mb-2 items-center rounded-xl bg-slate-200 p-3 dark:bg-stone-800">
      <div class="mb-3 text-sky-300" use:autoAnimate>
        <button on:click="{() => (activePage = 'description')}"
          ><IconBack class="inline" /> Back to description
        </button>
      </div>
      {#if datapackVersions?.length != 0}
        <div class="flex space-x-2 w-full items-center dark:text-white">
          <p class="mr-2">Search by Minecraft version:</p>
          <MultiSelect
            bind:selected="{selectedVersions}"
            options="{minecraftVersions}" />
        </div>
        <div class="mx-3 flex space-x-3 mt-4">
          <h2 class="w-1/3 text-xl font-black text-slate-950 dark:text-white">
            Name
          </h2>
          <h2
            class="flex-grow text-xl font-black text-slate-950 dark:text-white">
            Minecraft versions
          </h2>
        </div>
        <ul use:autoAnimate class="space-y-2">
          {#each versionMatches ?? [] as version}
            <VersionDisplay {version} />
          {/each}
        </ul>
        <p class="mx-1 mt-2 text-slate-950 dark:text-white">
          (Showing {versionMatches?.length} versions)
        </p>
      {:else}
        <h2 class=" text-xl text-slate-950 dark:text-white">
          <b>No versions yet!</b> Why not
          <a href="/project/{project?.url}/edit" class="text-blue-500 underline"
            >create one</a
          >?
        </h2>
      {/if}
    </div>
  {:else if activePage == "download"}
    <div class="mb-2 items-center space-y-2">
      <div class="rounded-xl bg-slate-200 p-3 dark:bg-stone-800">
        <div class="mb-3 text-sky-300" use:autoAnimate>
          <button on:click="{() => (activePage = 'description')}"
            ><IconBack class="inline" /> Back to description
          </button>
        </div>
        {#if datapackVersions?.length != 0}
          <p class="text-white">Select a Minecraft version:</p>
          <div class="grid grid-cols-3 grid-rows-auto gap-3">
            {#each minecraftVersions ?? [] as v}
              {#if stitchedVersions.includes(v)}
                {@const mcVersions = project?.latest_version
                  ? project.latest_version.minecraft_versions.split(",")
                  : []}
                <button
                  data-test-btn="{v}"
                  class="bg-stone-700 p-2 rounded-md hover:scale-102 transition-all cursor-pointer flex items-center space-x-2
                  {mcVersions.includes(v) ? ' text-white' : ' text-red-500'}"
                  on:click="{() => pickVersions(v)}">
                  {#if !mcVersions.includes(v)}
                    <IconAlert />
                  {/if}
                  <div class="font-bold flex-grow flex items-center space-x-2">
                    <p>{v}</p>
                    {#if mcVersions.includes(v)}
                      <p class="font-thin italic">
                        {project.latest_version?.version_code}
                      </p>
                    {/if}
                  </div>
                  <IconRight />
                </button>
              {/if}
            {/each}
            <Button style="boring" click="{() => (activePage = 'versions')}">
              <div class="font-bold flex-grow flex items-center space-x-2">
                <IconFiles />
                <p>Show All Versions</p>
              </div>
              <IconRight />
            </Button>
          </div>
          <div class="flex space-x-1 items-center mt-2 text-stone-500">
            <IconAlert />
            <p>means the datapack version is outdated</p>
          </div>
        {:else}
          <h2 class=" text-xl text-slate-950 dark:text-white">
            <b>No versions yet!</b>
            {#if project.author.id == $user.id}Why not
              <a
                href="/project/{project?.url}/edit"
                class="text-blue-500 underline">create one</a
              >?{/if}
          </h2>
        {/if}
      </div>
      {#if matches.length > 0}
        <div class="rounded-xl bg-slate-200 p-3 dark:bg-stone-800">
          <p class="text-white MB-6">Latest version for {pickedVersion}:</p>
          <ul use:autoAnimate class="space-y-2">
            <VersionDisplay
              version="{matches[0]}"
              expanded="{true}"
              mcVersion="{pickedVersion}" />
          </ul>
          <p class="flex mt-2 items-center space-x-1 pr-1 text-md text-sky-400">
            <IconFiles />
            <button
              on:click="{() => (activePage = 'versions')}"
              class="cursor-pointer">Show Version History</button>
          </p>
        </div>
      {/if}
    </div>
  {:else if activePage == "comments"}
    <div class="mb-2 items-center space-y-2">
      <div class="rounded-xl bg-slate-200 p-3 dark:bg-stone-800">
        <div class="space-y-2" use:autoAnimate>
          {#if $authed}
            <form
              class="flex items-center space-x-2"
              on:submit|preventDefault="{postComment}">
              <img
                src="{$user.profile_icon}"
                alt="Your profile icon"
                class="h-8 rounded-full" />
              <input
                class="input w-4/5"
                required
                placeholder="Write a comment on {project.title} (markdown supported!)"
                bind:value="{comment}" />
              <button
                type="submit"
                class="button-primary"
                disabled="{commentSending}">Post</button>
            </form>
            {#key comments}
              {#each sort(comments, c => c.sent, true) as cmt}
                <Comment comment="{cmt}" {project} />
              {/each}
            {/key}
          {/if}
          <!-- <Comment /> -->
        </div>
      </div>
    </div>
  {/if}
</div>

<Modal bind:this="{moderateModal}">
  <h1 class="text-xl font-bold text-slate-950 dark:text-white">
    Moderate {project?.title}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">User</p>
  <UserCard
    person="{project.author}"
    role="{$roles.find(v => project.author?.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
      Select Action
    </p>
    <button
      class="button-base {moderationModalPage === 'delete'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (moderationModalPage = 'delete')}">Delete</button>
    <button
      class="button-base {moderationModalPage === 'disable'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (moderationModalPage = 'disable')}">Disable</button>
    <button
      class="button-base {moderationModalPage === 'write note'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (moderationModalPage = 'write note')}"
      >Write Note</button>
    <button
      class="button-base bg-stone-900"
      on:click="{() => goto('/project/' + project?.url + '/edit')}"
      >Edit Submission</button>
  </div>
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
    Moderation Note
  </p>
  <textarea
    class="input w-full h-48 resize-none"
    placeholder="Write a helpful message explaining why they are being moderated. Include evidence (links etc) if applicable. Markdown is supported"
    id="description"
    maxlength="200"
    bind:value="{postedModeratorMessage}"></textarea>
  <Button click="{() => moderate(moderationModalPage)}"
    >{title(moderationModalPage)}</Button>
</Modal>

<Modal bind:this="{reportModal}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Report {project?.title}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">Author</p>
  <UserCard
    person="{project.author}"
    role="{$roles.find(v => project.author?.role == v.name)}" />
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
    Report Message
  </p>
  <textarea
    class="input-base themed-input-outline h-24 w-full resize-none rounded-md bg-slate-300 p-2 dark:bg-stone-700"
    placeholder="Write a helpful message to our moderators explaining how they broke the rules. PLEASE include evidence, especially for copyright reports"
    id="description"
    maxlength="200"
    bind:value="{reportMessage}"></textarea>
  <Button click="{() => report()}">Report</Button>
</Modal>

<Modal bind:this="{featureModal}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Feature {project?.title}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">Author</p>
  <UserCard
    person="{project.author}"
    role="{$roles.find(v => project.author?.role == v.name)}" />
  <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
    Duration of feature
  </p>
  <input
    type="number"
    required
    class="h-8 w-full resize-none rounded-md bg-slate-200 p-2 text-lg text-slate-950 dark:bg-stone-700 dark:text-white"
    bind:value="{featureDur}"
    placeholder="i.e 1, 7, 14, 30, 365" />
  <Button classes="mt-2" click="{() => feature()}">Feature</Button>
</Modal>

<style lang="postcss">
  :root {
    --sms-bg: theme(colors.stone.700);
    --sms-border: 0px solid theme(colors.stone.700);
    --sms-selected-bg: theme(colors.stone.700);
    --sms-remove-btn-hover-bg: theme(colors.dph-orange);
    --sms-options-bg: theme(colors.stone.700);
    --sms-text-color: theme(colors.white);
    --sms-selected-bg: theme(colors.dph-orange/25);
  }
</style>
