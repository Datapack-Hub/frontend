<script lang="ts">
  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import type { PageData } from "./$types";
  // Svelte imports
  import { goto } from "$app/navigation";
  import { API, minecraftVersions } from "$lib/globals/consts";
  import { fetchAuthed, moderatorOrAbove } from "$lib/globals/functions";
  import { authed, isDark, roleInfo, roles, user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";
  // Component imports
  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";
  import { commentSchema, type Version } from "$lib/globals/schema";
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

  import Comment from "$lib/components/Comment.svelte";
  import BhAdvert from "$lib/components/decorative/BHAdvert.svelte";
  import Button from "$lib/components/decorative/Button.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import UserCard from "$lib/components/user/UserCard.svelte";
  import { sort, title } from "radash";

  export let data: PageData;

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

  let status = data.project?.status;
  let del: HTMLDivElement;
  let postedModeratorMessage = "";
  let reportMessage = "";
  let featureDur: string;

  let comment: string;
  let commentSending = false;

  // Version filtering
  $: versionMatches =
    selectedVersions.length > 0 && data.versions !== undefined
      ? data.versions.filter((dp: Version) =>
          dp.minecraft_versions
            .split(",")
            .some(version => selectedVersions.includes(version))
        )
      : data.versions;

  if (data.versions)
    for (const item of data.versions) {
      stitchedVersions += item.minecraft_versions;
    }

  function pickVersions(vs: string) {
    matches = [];
    pickedVersion = vs;
    for (const v of data.versions.filter((versions: Version) =>
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
      "/moderation/project/" + data.project?.ID?.toString() + "/action",
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
      fetchAuthed(
        "PATCH",
        "/moderation/project/" + data.project?.ID + "/action",
        {
          data: moderationRequestData
        }
      ).then(response => {
        if (response.ok && action == "restore") del.remove();
      }),
      {
        success: "Moderated project!",
        loading: "Moderating...",
        error:
          "Uh oh, something went wrong. If this moderation is urgent, get an admin to run an SQL command.",
        info: "",
        warning: ""
      }
    );
  }

  async function report() {
    reportModal.close();
    let promise = fetchAuthed(
      "post",
      "/projects/id/" + data.project?.ID + "/report",
      {
        data: { message: reportMessage }
      }
    );
    toast.promise(promise, {
      success: "Reported project! A moderator will review your report ASAP.",
      loading: "Reporting...",
      error:
        "Uh oh, something went wrong. In the meantime, please report this bug on our Discord.",
      info: "",
      warning: ""
    });
  }

  async function feature() {
    featureModal.close();

    let parsedFeatureDuration = Number.parseInt(featureDur);

    if (parsedFeatureDuration <= 0) {
      return toast.error("Cannot set time to less than 0");
    }

    toast.promise(
      fetchAuthed("post", "/projects/id/" + data.project?.ID + "/feature", {
        data: { expires: Number.parseInt(featureDur) }
      }),
      {
        success: "Featured project!",
        loading: "Featuring...",
        error: "Uh oh, something went wrong.",
        info: "",
        warning: ""
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
      fetchAuthed("POST", `/comments/thread/${data.project.ID}/post`, {
        data: { message: comment }
      }).then(async response => {
        if (response.ok) {
          let newComments = await fetch(
            API + "/comments/thread/" + data.project.ID
          );
          let newCommentsJson = await newComments.json();
          let parsedComments = await commentSchema
            .array()
            .parseAsync(newCommentsJson.result);
          data.comments = parsedComments;
          comment = "";
          commentSending = false;
          return;
        }
        commentSending = false;
      }),
      {
        success: "Comment posted successfully!",
        error: "Something went wrong!",
        loading: "Posting...",
        info: "",
        warning: ""
      }
    );
  }

  $: iconColor = $isDark ? "white" : "black";
</script>

<svelte:head>
  <title>{data.project?.title} | Datapack Hub</title>
  <meta property="title" content="{data.project?.title}" />
  <meta property="description" content="{data.project?.description}" />
  <meta property="og:title" content="{data.project?.title} | Datapack Hub" />
  <meta property="og:description" content="{data.project?.description}" />
  <meta name="og:image" content="{data.project?.icon}" />
  <meta name="og:image:secure_url" content="{data.project?.icon}" />
  <meta name="og:image:width" content="120" />
  <meta name="og:image:height" content="120" />
</svelte:head>

<main
  id="main-content"
  class="bg-slate-50 px-0 pb-64 transition-all dark:bg-zinc-900 sm:px-8 md:px-16 lg:px-24">
  <div class="md:pt-20"></div>
  <div class="flex w-full flex-col px-4 lg:flex-row">
    {#if data.project && data.versions}
      <!--Project Meta-->
      <ProjectInfo
        project="{data.project}"
        is_new="{data.is_new == '1' ? true : false}" />
      <!--Main-->
      <div id="project-content" use:autoAnimate class="mt-4 w-full lg:mt-0 lg:w-3/4">
        <!--Buttons-->
        <div class="mb-2 flex items-center justify-between">
          <div class="space-x-1">
            <button
              class="button-base text-slate-950 dark:text-slate-100 {activePage ===
              'description'
                ? 'bg-slate-400 dark:bg-zinc-600'
                : 'bg-slate-200 dark:bg-zinc-800'}"
              on:click="{() => (activePage = 'description')}"
              aria-label="Description">
              <span class="hidden md:block">Description</span>
              <IconDescription color="{iconColor}" class="block md:hidden" />
            </button>
            <button
              class="button-base text-slate-950 dark:text-slate-100 {activePage ===
              'comments'
                ? 'bg-slate-400 dark:bg-zinc-600'
                : 'bg-slate-200 dark:bg-zinc-800'}"
              on:click="{() => (activePage = 'comments')}"
              aria-label="Comments">
              <span class="hidden md:block">Comments</span>
              <IconMessage color="{iconColor}" class="block md:hidden" />
            </button>
          </div>
          <div class="flex space-x-1">
            {#if $user.id == data.project?.author.id}
              <a
                aria-label="Edit"
                class="button-base ml-auto flex items-center space-x-1 text-slate-950 dark:text-slate-100"
                href="/project/{data.project?.url}/edit">
                <IconPencil /><span class="hidden md:block">Edit</span>
              </a>
            {/if}
            {#if $user.id != data.project?.author.id && status == "live"}
              <button
                aria-label="Report"
                class="button-base flex items-center space-x-1 text-slate-950 dark:text-slate-100"
                on:click="{() => {
                  reportModal.open();
                }}"><IconReport /></button>
            {/if}
            {#if moderatorOrAbove($roleInfo)}
              {#if status == "publish_queue" || status == "review_queue"}
                <button
                  aria-label="Approve"
                  class="button-base flex items-center space-x-1 bg-green-600 text-slate-950 dark:text-slate-100"
                  on:click="{approve}"
                  use:tippy="{{ content: 'Approve', placement: 'bottom' }}"
                  ><IconTick /><!--<span class="hidden md:block">Approve</span>--></button>
                <button
                  aria-label="Request Changes"
                  class="button-base flex items-center space-x-1 bg-yellow-600 text-slate-950 dark:text-slate-100"
                  on:click="{() => {
                    moderationModalPage = 'disable';
                    moderateModal.open();
                  }}"
                  use:tippy="{{
                    content: 'Request Changes',
                    placement: 'bottom'
                  }}"
                  ><IconPencil /><!--<span class="hidden md:block">Request Changes</span
            >--></button>
                <button
                  aria-label="Deny"
                  class="button-base flex items-center space-x-1 bg-red-600 text-slate-100"
                  on:click="{() => {
                    moderationModalPage = 'delete';
                    moderateModal.open();
                  }}"
                  use:tippy="{{ content: 'Deny', placement: 'bottom' }}"
                  ><IconCross /><!--<span class="hidden md:block">Deny</span>--></button>
                <button
                  class="button-base space-x-1 text-slate-950 dark:text-slate-100"
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
                  class="button-base flex items-center space-x-1 text-slate-950 dark:text-slate-100"
                  on:click="{() => {
                    featureModal.open();
                  }}"
                  ><IconConfetti />
                </button>
              {/if}
            {/if}
            <Button label="Download" click="{() => (activePage = 'download')}">
              <span class="hidden lg:block"> Download </span>
              <IconDownload class="block lg:hidden" />
            </Button>
            {#if moderatorOrAbove($roleInfo) && !(status == "publish_queue" || status == "review_queue")}
              <button
                class="button-base space-x-1 bg-red-600 text-slate-100"
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
            class="moderation mb-2 flex items-center rounded-xl p-3"
            bind:this="{del}">
            <p class="m-1 w-full flex-grow leading-tight dark:text-white">
              <b>This project is deleted.</b> Only staff can view the project. To
              restore the project, click the restore button.
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
              <b>This project is awaiting review.</b> A staff member will review
              your project before it goes public.
            </p>
          </div>
        {:else if status == "disabled"}
          <div
            class="moderation mb-2 flex items-center rounded-xl p-3"
            bind:this="{del}">
            <p class="m-1 w-full flex-grow leading-tight dark:text-white">
              <b>This project is disabled.</b> Please read the mod message, and fix
              your project before it goes live.
            </p>
          </div>
        {/if}
        {#if activePage == "description"}
          <div class="w-full rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
            <p class="w-full break-words leading-tight">
              <MarkdownComponent
                source="{data.project.body}"
                classes="prose-headings:mb-2 prose-p:my-0 prose-ul:my-3 prose-img:my-0" />
            </p>
          </div>
        {:else if activePage == "versions"}
          <div
            class="mb-2 items-center rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
            <div class="mb-3 text-sky-300" use:autoAnimate>
              <button on:click="{() => (activePage = 'description')}"
                ><IconBack class="inline" /> Back to description
              </button>
            </div>
            {#if data.versions?.length != 0}
              <div class="flex w-full items-center space-x-2 dark:text-white">
                <p class="mr-2 text-xs md:text-sm lg:text-base">
                  Minecraft Version:
                </p>
                <MultiSelect
                  bind:selected="{selectedVersions}"
                  options="{minecraftVersions}" />
              </div>
              <ul use:autoAnimate class="space-y-2">
                {#each versionMatches ?? [] as version}
                  <VersionDisplay {version} project="{data.project}" />
                {/each}
              </ul>
              <p class="mx-1 mt-2 text-slate-950 dark:text-white">
                (Showing {versionMatches?.length} versions)
              </p>
            {:else}
              <h2 class=" text-xl text-slate-950 dark:text-white">
                <b>No versions yet!</b> Why not
                <a
                  href="/project/{data.project?.url}/edit"
                  class="text-blue-500 underline">create one</a
                >?
              </h2>
            {/if}
          </div>
        {:else if activePage == "download"}
          <div class="mb-2 items-center space-y-2">
            <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
              <div class="mb-3 text-sky-300" use:autoAnimate>
                <button on:click="{() => (activePage = 'description')}"
                  ><IconBack class="inline" /> Back to description
                </button>
              </div>
              {#if data.versions?.length != 0}
                <p class="dark:text-slate-100">Select a Minecraft version:</p>
                <div class="grid-auto-fit-lg grid gap-3">
                  {#each minecraftVersions.reverse() ?? [] as v}
                    {#if stitchedVersions.includes(v)}
                      {@const mcVersions = data.project?.latest_version
                        ? data.project.latest_version.minecraft_versions.split(
                            ","
                          )
                        : []}
                      <button
                        data-test-btn="{v}"
                        class="flex cursor-pointer items-center space-x-2 rounded-md bg-slate-300 p-3 transition-all hover:scale-102 dark:bg-zinc-700
                  {mcVersions.includes(v)
                          ? ' dark:text-slate-100'
                          : ' text-red-500'}"
                        on:click="{() => pickVersions(v)}">
                        {#if !mcVersions.includes(v)}
                          <IconAlert />
                        {/if}
                        <div
                          class="flex flex-grow items-center space-x-2 font-bold">
                          <p>{v}</p>
                          {#if mcVersions.includes(v)}
                            <p class="font-thin italic">
                              {data.project.latest_version?.version_code}
                            </p>
                          {/if}
                        </div>
                        <IconRight />
                      </button>
                    {/if}
                  {/each}
                  <button
                    class="flex cursor-pointer items-center space-x-2 rounded-md bg-slate-400 p-3 transition-all hover:scale-102 dark:bg-zinc-600 dark:text-white"
                    on:click="{() => (activePage = 'versions')}">
                    <div
                      class="flex flex-grow items-center space-x-2 font-bold">
                      <p>Show All Versions</p>
                    </div>
                    <IconRight />
                  </button>
                </div>
                <div class="mt-2 flex items-center space-x-1 text-zinc-500">
                  <IconAlert />
                  <p>means the datapack version is outdated</p>
                </div>
              {:else}
                <h2 class=" text-xl text-slate-950 dark:text-white">
                  <b>No versions yet!</b>
                  {#if data.project.author.id == $user.id}Why not
                    <a
                      href="/project/{data.project?.url}/edit"
                      class="text-blue-500 underline">create one</a
                    >?{/if}
                </h2>
              {/if}
            </div>
            {#if matches.length > 0}
              <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
                <p class="MB-6 text-white">
                  Latest version for {pickedVersion}:
                </p>
                <ul use:autoAnimate class="space-y-2">
                  <VersionDisplay
                    version="{matches[0]}"
                    expanded="{true}"
                    project="{data.project}"
                    mcVersion="{pickedVersion}" />
                </ul>
                <p
                  class="text-md mt-2 flex items-center space-x-1 pr-1 text-sky-400">
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
            <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
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
                      placeholder="Write a comment on {data.project
                        .title} (markdown supported!)"
                      bind:value="{comment}" />
                    <button
                      type="submit"
                      class="button-primary"
                      disabled="{commentSending}">Post</button>
                  </form>
                {:else}
                  <p class="mb-3 ml-1 mt-1 text-white">
                    <b>Sign in</b> to post a comment or reply
                  </p>
                {/if}
                {#key data.comments}
                  {#each sort(data.comments, c => c.sent, true) as cmt}
                    <Comment comment="{cmt}" project="{data.project}" />
                  {/each}
                {/key}
                <!-- <Comment /> -->
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>

<Modal bind:this="{moderateModal}" title="{'Moderate ' + data.project.title}">
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">User</p>
  <UserCard
    person="{data.project.author}"
    role="{$roles.find(v => data.project.author?.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
      Select Action
    </p>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ===
      'delete'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'delete')}">Delete</button>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ===
      'disable'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'disable')}">Disable</button>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ===
      'write note'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'write note')}"
      >Write Note</button>
    <button
      class="button-base bg-slate-300 text-slate-950 dark:bg-zinc-900 dark:text-slate-100"
      on:click="{() => goto('/project/' + data.project?.url + '/edit')}"
      >Edit Submission</button>
  </div>
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
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

<Modal bind:this="{reportModal}" title="{'Report ' + data.project.title}">
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">Author</p>
  <UserCard
    person="{data.project.author}"
    role="{$roles.find(v => data.project.author?.role == v.name)}" />
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
    Report Message
  </p>
  <textarea
    class="input-base themed-input-outline h-24 w-full resize-none rounded-md bg-slate-300 p-3 dark:bg-zinc-700"
    placeholder="Write a helpful message to our moderators explaining how they broke the rules. PLEASE include evidence, especially for copyright reports"
    id="report-description"
    maxlength="500"
    bind:value="{reportMessage}"></textarea>
  <Button classes="sendReportBtn" click="{() => report()}">Report</Button>
</Modal>

<Modal bind:this="{featureModal}" title="{'Feature ' + data.project.title}">
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">Author</p>
  <UserCard
    person="{data.project.author}"
    role="{$roles.find(v => data.project.author?.role == v.name)}" />
  <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
    Duration of feature
  </p>
  <input
    type="number"
    required
    class="h-8 w-full resize-none rounded-md bg-slate-200 p-3 text-lg text-slate-950 dark:bg-zinc-700 dark:text-white"
    bind:value="{featureDur}"
    placeholder="i.e 1, 7, 14, 30, 365" />
  <Button classes="mt-2" click="{() => feature()}">Feature</Button>
</Modal>

<style lang="postcss">
  :root {
    --sms-bg: theme(colors.zinc.700);
    --sms-border: 0px solid theme(colors.zinc.700);
    --sms-selected-bg: theme(colors.zinc.700);
    --sms-remove-btn-hover-bg: theme(colors.dph-orange);
    --sms-options-bg: theme(colors.zinc.700);
    --sms-text-color: theme(colors.white);
    --sms-selected-bg: theme(colors.dph-orange/25);
  }
</style>
