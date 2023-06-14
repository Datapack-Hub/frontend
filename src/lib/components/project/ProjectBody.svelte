<script lang="ts">
  // Svelte imports
  import { goto } from "$app/navigation";
  import { versions } from "$lib/globals/consts";
  import { fetchAuthed, titleCase } from "$lib/globals/functions";
  import { user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import toast from "svelte-french-toast";
// Component imports
  import MarkdownComponent from "$lib/components/MarkdownComponent.svelte";
  import VersionDisplay from "$lib/components/project/VersionDisplay.svelte";
  import MultiSelect from "svelte-multiselect";
  import IconAlert from "~icons/tabler/AlertTriangle.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconRight from "~icons/tabler/ChevronRight.svelte";
  import IconFiles from "~icons/tabler/Files.svelte";
  import IconReport from "~icons/tabler/Flag.svelte";
  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconCross from "~icons/tabler/X.svelte";
  import CasualLine from "../CasualLine.svelte";
  import Modal from "../modals/Modal.svelte";
  import MiniProfileCard from "../profile/MiniProfileCard.svelte";

  // Component args
  export let project: Project;
  export let dp_versions: Version[];
  export let roles: Role[];

  // Local vars
  let activePage = "description";
  let author: User;
  let selectedVersions: string[] = [];
  let pickedVersion: string | undefined = undefined;
  let reportModal: Modal;
  let modModal: Modal;
  let modModalPage = "delete";
  let status = project?.status;
  let del: HTMLDivElement;
  let postedModMsg = "";
  let reportMsg = "";
  let matches: Version[] = [];
  let bigStitchedVersionList: string;
  let body = "";
  if (project?.body) {
    body = project.body;
  }

  // Version filtering
  $: versionMatches =
    selectedVersions.length != 0 && dp_versions
      ? dp_versions?.filter(e =>
          e.minecraft_versions
            .split(",")
            .some(v => selectedVersions.includes(v))
        )
      : dp_versions;

  dp_versions?.forEach(item => {
    bigStitchedVersionList = bigStitchedVersionList + item.minecraft_versions;
  });

  function pickVersions(vs: string) {
    matches = [];
    pickedVersion = vs;
    dp_versions
      ?.filter(versions => versions.minecraft_versions.split(",").includes(vs))
      .forEach(v => {
        matches = [...matches, v];
      });
    if (matches?.length == 0)
      return toast.error("This datapack doesn't support " + vs);
  }

  async function approve() {
    let p = await fetchAuthed(
      "PATCH",
      "/moderation/project/" + project?.ID.toString() + "/action",
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
    let modReqData: object = {};
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
      fetchAuthed(
        "PATCH",
        "/moderation/project/" + project?.ID + "/action",
        modReqData
      ).then(res => {
        if (res.ok) {
          if (action == "restore") del.parentElement?.removeChild(del);
        }
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
        message: reportMsg
      }),
      {
        success: "Reported project! A moderator will review your report ASAP.",
        loading: "Reporting...",
        error:
          "Uh oh, something went wrong. In the meantime, please report this bug on our Discord."
      }
    );
  }
</script>

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
        on:click="{() => (activePage = 'versions')}">Version History</button>
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
    {#if $user.id == project?.author}
      <a
        class="button-base ml-auto flex items-center space-x-1"
        href="/project/{project?.url}/edit">
        <IconPencil /><span>Edit</span>
      </a>
    {/if}
    {#if $user.id != project?.author}
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
    <div
      class="moderation rounded-xl p-2 mb-2 flex items-center"
      bind:this="{del}">
      <p class="w-full leading-tight dark:text-white flex-grow m-1">
        <b>This project is deleted.</b> Only staff can view the project. To restore
        the project, click the restore button.
      </p>
      <button
        class="bg-orange-500 rounded-md p-1 px-2 text-white"
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
    <div
      class="w-full rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
      <p class="w-full leading-tight">
        <MarkdownComponent source="{body.replace('\\n', '\n')}" />
      </p>
    </div>
  {:else if activePage == "versions"}
    <div
      class="mb-2 items-center rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
      {#if dp_versions?.length != 0}
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
          <a href="/project/{project?.url}/edit" class="text-blue-500 underline"
            >create one</a
          >?
        </h2>
      {/if}
    </div>
  {:else if activePage == "download"}
    <div class="mb-2 items-center space-y-2">
      <div class="rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
        {#if dp_versions?.length != 0}
          <p class="text-white">Select a Minecraft version:</p>
          <div class="grid grid-cols-3 grid-rows-auto gap-3">
            {#each versions ?? [] as v}
              {#if bigStitchedVersionList.indexOf(v) >= 0}
                {@const mcVersions =
                  project && project.latest_version
                    ? project.latest_version.minecraft_versions
                    : ""}
                <button
                  class="bg-stone-700 p-2 rounded-md hover:scale-102 transition-all cursor-pointer flex items-center space-x-2 {!mcVersions
                    .split(',')
                    .includes(v)
                    ? 'text-red-500'
                    : 'text-white'}"
                  on:click="{() => pickVersions(v)}">
                  {#if !mcVersions.split(",").includes(v)}
                    <IconAlert />
                  {/if}
                  <div class="font-bold flex-grow flex items-center space-x-2">
                    <p>{v}</p>
                    {#if mcVersions.split(",").includes(v)}
                      <p class="font-thin italic">
                        {project.latest_version?.version_code}
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
              href="/project/{project?.url}/edit"
              class="text-blue-500 underline">create one</a
            >?
          </h2>
        {/if}
      </div>
      {#if matches.length != 0}
        <div
          class="rounded-xl bg-pearl-lusta-200 p-3 dark:bg-pearl-lusta-100/10">
          <p class="text-white">Latest version for {pickedVersion}:</p>
          <ul use:autoAnimate class="space-y-2">
            <VersionDisplay
              version="{matches[0]}"
              expanded="{true}"
              mc_version="{pickedVersion}" />
          </ul>
          <p class="flex mt-2 items-center space-x-1 pr-1 text-md text-sky-400">
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

<Modal bind:this="{modModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Moderate {project?.title}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p
    class="align-middle text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    User
  </p>
  <MiniProfileCard
    person="{author}"
    role="{roles?.find(v => author?.role == v.name)}" />
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
      on:click="{() => goto('/project/' + project?.url + '/edit')}"
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
  <button class="button-primary" on:click="{() => moderate(modModalPage)}"
    >{titleCase(modModalPage)}</button>
</Modal>

<Modal bind:this="{reportModal}">
  <h1 class=" text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Report {project?.title}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p
    class="align-middle text-lg text-pearl-lusta-950 dark:text-pearl-lusta-100">
    Author
  </p>
  <MiniProfileCard
    person="{author}"
    role="{roles?.find(v => author?.role == v.name)}" />
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
  <button class="button-primary" on:click="{() => report()}">Report</button>
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
