<script lang="ts">
  import {
    fetchAuthed,
    getAuthorFromID,
    titleCase
  } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  import IconAlert from "~icons/tabler/AlertTriangle.svelte";
  import IconCube from "~icons/tabler/Box.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconRight from "~icons/tabler/ChevronRight.svelte";
  import IconFiles from "~icons/tabler/Files.svelte";
  import IconReport from "~icons/tabler/Flag.svelte";
  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconCross from "~icons/tabler/X.svelte";

  import { goto } from "$app/navigation";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import MarkdownComponent from "$lib/components/MarkdownComponent.svelte";
  import VersionDisplay from "$lib/components/VersionDisplay.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import MiniProfileCard from "$lib/components/profile/MiniProfileCard.svelte";
  import { versions } from "$lib/globals/consts";
  import { user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import MultiSelect from "svelte-multiselect";

  export let data: PageData;
  let visible = false;
  let activePage = "description";

  let author: User;
  let selectedVersions: string[] = [];
  let pickedVersion: string | undefined = undefined;

  let reportModal: Modal;
  let modModal: Modal;

  let modModalPage = "delete";
  let status = data.project?.status;
  let mm: HTMLDivElement;
  let del: HTMLDivElement;

  let postedModMsg = "";
  let reportMsg = ""

  $: versionMatches =
    selectedVersions.length != 0 && data.versions
      ? data.versions?.filter(e =>
          e.minecraft_versions
            .split(",")
            .some(v => selectedVersions.includes(v))
        )
      : data.versions;

  let matches: Version[] = [];
  let bigStitchedVersionList: string;

  data.versions?.forEach(item => {
    bigStitchedVersionList = bigStitchedVersionList + item.minecraft_versions;
  });

  function pickVersions(vs: string) {
    pickedVersion = vs;
    data.versions
      ?.filter(versions => versions.minecraft_versions.split(",").includes(vs))
      .forEach(v => {
        matches.push(v);
      });
    if (matches?.length == 0)
      return toast.error("This datapack doesn't support " + vs);
  }

  onMount(async () => {
    author = await getAuthorFromID(data.project?.author ?? 0);
    visible = true;
  });

  async function dismissModMsg() {
    mm.remove();
    let dsm = await fetchAuthed(
      "DELETE",
      "/moderation/project/" + data.project?.ID.toString() + "/dismiss_message"
    );
    if (dsm.ok) {
      mm.remove();
      return toast.success("Deleted the message!");
    }
  }

  async function approve() {
    let p = await fetchAuthed(
      "PATCH",
      "/moderation/project/" + data.project?.ID.toString() + "/action",
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

  let body = "";
  if (data.project?.body) {
    body = data.project.body;
  }

  async function moderate(action: string, message: string | undefined = undefined) {
    let modReqData: object= {};
    switch (action) {
      case "delete":
        if (postedModMsg.length != 0) {
          modReqData = {
            action: "delete",
            message: postedModMsg
          };
        } else {
          modReqData = {
            action: "delete"
          };
        }
        break;
      case "disable":
        if (postedModMsg.length != 0) {
          modReqData = {
            action: "disable",
            message: postedModMsg
          };
        } else {
          modReqData = {
            action: "disable"
          };
        }
        break;
      case "write note":
        if (postedModMsg.length != 0) {
          modReqData = {
            action: "write_note",
            message: postedModMsg
          };
        } else {
          return toast.error("You gotta leave them a message!");
        }
        break;
      case "restore":
        modReqData = {
          action: "restore"
        };
        break;
    }

    toast.promise(
      fetchAuthed("PATCH","/moderation/project/" + data.project?.ID + "/action", modReqData).then(res => {
        if(res.ok){
          if(action == "restore") del.parentElement?.removeChild(del)
        }
      }),
      {
        success: "Moderated project!",
        loading: "Moderating...",
        error: "Uh oh, something went wrong. If this moderation is urgent, get an admin to run an SQL command."
      }
    );
  }

  async function report(message: string) {
    reportModal.close()
    toast.promise(
      fetchAuthed("post","/projects/id/" + data.project?.ID + "/report", {message: reportMsg}),
      {
        success: "Reported project! A moderator will review your report ASAP.",
        loading: "Reporting...",
        error: "Uh oh, something went wrong. In the meantime, please report this bug on our Discord."
      }
    );
  }
</script>

<svelte:head>
  <title>{data.project?.title} | Datapack Hub</title>

  <meta property="title" content="{data.project?.title}" />
  <meta property="description" content="{data.project?.description}" />

  <meta property="og:title" content="{data.project?.title} | Datapack Hub" />
  <meta property="og:description" content="{data.project?.description}" />

  <meta name="og:profile:username" content="Silabear" />
  <meta name="og:image" content="{data.project?.icon}" />
  <meta name="og:image:secure_url" content="{data.project?.icon}" />
  <meta name="og:image:width" content="120" />
  <meta name="og:image:height" content="120" />
</svelte:head>

<main
  class="-translate-y-20 bg-pearl-lusta-100 px-0 pb-64 transition-all dark:bg-stone-900 sm:px-8 md:translate-y-0 md:px-16 lg:px-24">
  <div class="pt-20"></div>
  <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-4 w-full">
    <!--Project Meta-->
    <div class="flex h-fit w-full lg:w-2/5 xl:w-1/4 flex-col" use:autoAnimate>
      <div class="my-3 text-sky-300" use:autoAnimate>
        <a href="/projects">&lt; Explore other projects</a>
      </div>
      <div
        class="rounded-xl border-pearl-lusta-200 p-4 mb-2 bg-pearl-lusta-200 dark:bg-pearl-lusta-100/10">
        <div
          class="{data.project?.icon
            ? 'p-0'
            : 'h-20 w-20 bg-stone-600 p-4'} mr-6 rounded-xl">
          {#if data.project?.icon}
            <img
              loading="lazy"
              src="{data.project?.icon}"
              alt="{data.project?.title} icon"
              class="aspect-square w-20 rounded-lg bg-cover" />
          {:else}
            <IconNoPhoto width="48" height="48" />
          {/if}
        </div>
        <div class="flex-grow">
          <h1
            class="flex items-center text-4xl font-bold text-pearl-lusta-950 dark:text-white">
            {data.project?.title.trimStart()}
            {#if status == "draft"}
              <span
                class="mx-3 rounded-full bg-stone-700 px-2 text-xl font-bold text-stone-500"
                >Draft</span>
            {:else if status == "publish_queue" || status == "review_queue"}
              <span
                class="mx-3 rounded-full bg-yellow-700 px-2 text-xl font-bold text-yellow-500"
                >Awaiting Approval</span>
            {:else if status == "unpublished"}
              <span
                class="mx-3 rounded-full bg-stone-700 px-2 text-xl font-bold text-stone-500"
                >Unpublished</span>
            {/if}
          </h1>
          <h2
            class="mt-2 text-base text-pearl-lusta-950/60 transition-all dark:text-white/60">
            {data.project?.description?.trimStart()}
          </h2>
          {#if visible}
            <div class="mt-4 flex items-center space-x-2">
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
                <p>{data.project?.category}</p>
              </span>
            </div>
          {/if}
        </div>
        {#if data.project?.mod_message}
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
            <MarkdownComponent source="{data.project?.mod_message}" />
          </p>
          <p class=" text-xs opacity-50">
            Only you (and staff) can read this message. Once you've acknowleged
            it, you can dismiss the message if the project isn't disabled.
          </p>
        </div>
      {/if}
      </div>
    </div>

    <!--Main-->
    <div use:autoAnimate class="w-full mt-4 lg:w-3/4 lg:mt-0">
      <!--Buttons-->
      <div class="mb-2 flex space-x-2">
        <div class="min-w-fit flex-grow">
          <button
            class="button-base {activePage === 'description'
              ? 'bg-pearl-lusta-500 dark:bg-stone-600'
              : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
            on:click="{() => (activePage = 'description')}">Description</button>
          <button
            class="button-base {activePage === 'versions'
            ? 'bg-pearl-lusta-500 dark:bg-stone-600'
            : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
            on:click="{() => (activePage = 'versions')}"
            >Version History</button>
        </div>
        <div class="flex space-x-1">
          {#if ["moderator", "admin"].includes($user.role)}
            <button
              class="button-base flex items-center space-x-1"
              on:click="{() => {
                modModal.open();
              }}"><IconShield /><span>Moderate</span></button>
            {#if status == "publish_queue" || (status == "review_queue" && ["moderator", "admin"].includes($user.role))}
              <button
                class="button-base flex items-center space-x-1 bg-green-600"
                on:click="{approve}"><IconTick /><span>Approve</span></button>
              <button
                class="button-base flex items-center space-x-1 bg-yellow-600"
                on:click="{() => {
                  modModalPage = 'disable';
                  modModal.open();
                }}"><IconPencil /><span>Request Changes</span></button>
              <button
                class="button-base flex items-center space-x-1 bg-red-600"
                on:click="{() => {
                  modModalPage = 'delete';
                  modModal.open();
                }}"><IconCross /><span>Deny</span></button>
            {/if}
          {/if}
        </div>
        {#if $user.id == data.project?.author}
          <a
            class="button-base ml-auto flex items-center space-x-1"
            href="/project/{data.project?.url}/edit">
            <IconPencil /><span>Edit</span>
          </a>
        {/if}
        {#if $user.id != data.project?.author}
          <button
            class="button-base flex items-center space-x-1"
            on:click="{() => {
              reportModal.open();
            }}"><IconReport /><span>Report</span></button>
        {/if}
        <button
          class="button-base bg-dph-orange font-bold"
          on:click="{() => (activePage = 'download')}">Download</button>
      </div>

      {#if status == "deleted"}
      <div class="moderation rounded-xl p-2 mb-2 flex items-center" bind:this={del}>
        <p class="w-full leading-tight dark:text-white flex-grow m-1">
          <b>This project is deleted.</b> Only staff can view the project. To restore the project, click the restore button.
        </p>
        <button class="bg-orange-500 rounded-md p-1 px-2 text-white" on:click={() => moderate("restore")}>Restore</button>
      </div>
      {/if}
      {#if activePage == "description"}
        <div
          class="w-full rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
          <p class="w-full leading-tight">
            <MarkdownComponent source="{body.replace('\\n', '\n')}" />
          </p>
        </div>
      {:else if activePage == "versions"}
        <div
          class="mb-2 items-center rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
          {#if data.versions?.length != 0}
            <div class="flex space-x-2 w-full items-center dark:text-white">
              <p class="mr-2">Search by Minecraft version:</p>
              <MultiSelect
                bind:selected="{selectedVersions}"
                options="{versions}" />
            </div>
            <div class="mx-3 flex space-x-3 mt-4">
              <h2
                class="w-1/3 text-xl font-black text-pearl-lusta-950 dark:text-white">
                Name
              </h2>
              <h2
                class="flex-grow text-xl font-black text-pearl-lusta-950 dark:text-white">
                Minecraft versions
              </h2>
            </div>
            <ul use:autoAnimate class="space-y-2">
              {#each versionMatches ?? [] as version}
                <VersionDisplay version="{version}" />
              {/each}
            </ul>
            <p class="mx-1 mt-2 text-pearl-lusta-950 dark:text-white">
              (Showing {versionMatches?.length} versions)
            </p>
          {:else}
            <h2 class=" text-xl text-pearl-lusta-950 dark:text-white">
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
          <div
            class="rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
            {#if data.versions?.length != 0}
              <p class="text-white">Select a Minecraft version:</p>
              <div class="grid grid-cols-3 grid-rows-auto gap-3">
                {#each versions ?? [] as v}
                  {#if bigStitchedVersionList.indexOf(v) >= 0}
                    <button
                      class="bg-stone-700 p-2 rounded-md hover:scale-102 transition-all cursor-pointer flex items-center space-x-2 {!data.project?.latest_version?.minecraft_versions
                        .split(',')
                        .includes(v)
                        ? 'text-red-500'
                        : 'text-white'}"
                      on:click="{() => pickVersions(v)}">
                      {#if !data.project?.latest_version?.minecraft_versions
                        .split(",")
                        .includes(v)}
                        <IconAlert />
                      {/if}
                      <div
                        class="font-bold flex-grow flex items-center space-x-2">
                        <p>{v}</p>
                        {#if data.project?.latest_version?.minecraft_versions
                          .split(",")
                          .includes(v)}
                          <p class="font-thin italic">
                            {data.project?.latest_version.version_code}
                          </p>
                        {/if}
                      </div>
                      <IconRight />
                    </button>
                  {/if}
                {/each}
              </div>
              <div class="flex space-x-1 items-center mt-2 text-stone-500">
                <IconAlert />
                <p>means the datapack version is outdated</p>
              </div>
            {:else}
              <h2 class=" text-xl text-pearl-lusta-950 dark:text-white">
                <b>No versions yet!</b> Why not
                <a
                  href="/project/{data.project?.url}/edit"
                  class="text-blue-500 underline">create one</a
                >?
              </h2>
            {/if}
          </div>
          {#if matches?.length != 0}
            <div
              class="rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
              <p class="text-white">Latest version for {pickedVersion}:</p>
              <ul use:autoAnimate class="space-y-2">
                <VersionDisplay
                  version="{matches[0]}"
                  expanded="{true}"
                  mc_version="{pickedVersion}" />
              </ul>
              <p
                class="flex mt-2 items-center space-x-1 pr-1 text-md text-sky-400">
                <IconFiles />
                <button
                  on:click="{() => (activePage = 'versions')}"
                  class="cursor-pointer">Show All Versions</button>
              </p>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</main>

<Modal bind:this="{modModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Moderate {data.project?.title}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p
    class="align-middle text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    User
  </p>
  <MiniProfileCard
    person="{author}"
    role="{data.roles?.find(v => author?.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p
      class="align-middle text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
      Select Action
    </p>
    <button
      class="button-base {modModalPage === 'delete'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (modModalPage = 'delete')}">Delete</button>
    <button
      class="button-base {modModalPage === 'disable'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (modModalPage = 'disable')}">Disable</button>
    <button
      class="button-base {modModalPage === 'write note'
        ? 'bg-stone-600'
        : 'bg-stone-900'}"
      on:click="{() => (modModalPage = 'write note')}">Write Note</button>
    <button
      class="button-base bg-stone-900"
      on:click="{() => goto('/project/' + data.project?.url + '/edit')}"
      >Edit Submission</button>
  </div>
  <p
    class="align-middle text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    Moderation Note
  </p>
  <textarea
    class="input-base override-input-outline h-24 w-full resize-none rounded-md bg-pearl-lusta-300 p-2 dark:bg-stone-700"
    placeholder="Write a helpful message explaining why they are being moderated. Include evidence (links etc) if applicable. Markdown is supported"
    id="description"
    maxlength="200"
    bind:value="{postedModMsg}"></textarea>
  <button class="button-primary" on:click="{() => moderate(modModalPage, postedModMsg)}"
    >{titleCase(modModalPage)}</button>
</Modal>

<Modal bind:this="{reportModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Report {data.project?.title}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p
    class="align-middle text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    Author
  </p>
  <MiniProfileCard
    person="{author}"
    role="{data.roles?.find(v => author?.role == v.name)}" />
  <p
    class="align-middle text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    Report Message
  </p>
  <textarea
    class="input-base override-input-outline h-24 w-full resize-none rounded-md bg-pearl-lusta-300 p-2 dark:bg-stone-700"
    placeholder="Write a helpful message to our moderators explaining how they broke the rules. PLEASE include evidence, especially for copyright reports"
    id="description"
    maxlength="200"
    bind:value="{reportMsg}"></textarea>
  <button class="button-primary" on:click="{() => report(reportMsg)}">Report</button>
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
