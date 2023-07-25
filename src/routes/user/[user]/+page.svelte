<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import UserModeration from "$lib/components/user/UserModeration.svelte";
  import { authed, roleInfo, user, roles } from "$lib/globals/stores";
  import type { PageData } from "./$types";
  import tippy from "sveltejs-tippy";
  import IconSettings from "~icons/tabler/Settings.svelte";
  import IconBadge from "~icons/tabler/Award.svelte";
  import IconInfo from "~icons/tabler/InfoCircle.svelte";
  import IconTime from "~icons/tabler/Clock.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import MarkdownComponent from "$lib/components/MarkdownComponent.svelte";
  import { badges } from "$lib/globals/consts";
  import { title } from "radash";
  import IconVerified from "$lib/components/decorative/IconVerified.svelte";
  import { isModOrAbove } from "$lib/globals/functions";
  import Modal from "$lib/components/modals/Modal.svelte";
  import UserCard from "$lib/components/user/UserCard.svelte";

  let modModal: Modal;

  export let data: PageData;

  let orangeVerifiedHover = {
    content: "Verified for being part of the Datapack Hub staff team.",
    placement: "top"
  };

  let blueVerifiedHover = {
    content:
      "Verified for being known for helping others with their datapacks.",
    placement: "top"
  };

  let emeraldVerifiedHover = {
    content:
      "Verified for their datapacks being high-quality or being active in the community.",
    placement: "top"
  };

  // easter egg :)
  async function play() {
    let audio = new Audio("/sus.mp3");
    await audio.play();
  }
</script>

<svelte:head>
  <title>{data.profile?.username} | Datapack Hub</title>

  <meta property="title" content="{data.profile?.username} | Datapack Hub" />
  <meta property="description" content="{data.profile?.bio}" />

  <meta property="og:title" content="{data.profile?.username} | Datapack Hub" />
  <meta property="og:description" content="{data.profile?.bio}" />
  <meta property="og:type" content="profile" />

  <meta name="og:profile:username" content="{data.profile?.username}" />
  <meta name="og:image" content="{data.profile?.profile_icon}" />
  <meta name="og:image:secure_url" content="{data.profile?.profile_icon}" />
  <meta name="og:image:width" content="120" />
  <meta name="og:image:height" content="120" />
</svelte:head>

<main
  id="main-content"
  class="flex flex-col lg:flex-row w-full items-center bg-slate-50 px-8 transition-all dark:bg-stone-900 md:items-start md:px-16 md:pt-32 lg:px-24">
  <div class="w-full lg:w-2/5 xl:w-1/3">
    <div
      class="mb-4 flex w-full flex-col mt-16 md:mt-0 items-center md:items-start">
      <div class="self-center">
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src="{data.profile?.profile_icon}&size=160"
          alt="{data.profile?.username}'s profile picture"
          on:click="{data.profile?.id == 3 ? play : null}"
          on:keypress="{e =>
            e.key == 'Enter' && data.profile?.id == 3 ? play : null}"
          height="128"
          width="128"
          class="rounded-full outline outline-2 outline-offset-4 md:h-24 md:w-24 lg:h-32 lg:w-32"
          style="outline-color:{data.role?.color};" />
      </div>
      <p
        class="mt-4 w-full text-center text-4xl font-bold text-slate-950 dark:text-white md:text-3xl lg:text-4xl">
        {data.profile?.username}
        {#if isModOrAbove(data.role)}
          <span class="text-dph-orange icon" use:tippy="{orangeVerifiedHover}"
            ><IconVerified /></span
          >{:else if data.profile?.role == "helper"}<span
            class="text-blue-500 icon"
            use:tippy="{blueVerifiedHover}"><IconVerified /></span
          >{:else if data.profile?.role == "verified"}<span
            class="text-emerald-500 icon"
            use:tippy="{emeraldVerifiedHover}"
            ><IconVerified />
          </span>
        {/if}
      </p>
      <p
        class="mt-1 w-full text-center align-middle font-semibold text-slate-950 dark:text-white sm:text-base md:text-lg">
        {#if data.role?.name != "default"}
          <span
            class="flex items-center justify-center"
            style="color: {data.role?.color};">
            {#if data.role?.name == "nerd"}🤓
            {:else if data.role?.name == "admin"}<img
                src="/logos/dph.svg"
                alt="logo"
                class="inline-block mr-2"
                height="24"
                width="24" /> Datapack Hub Team{:else}{title(
                data.role?.name
              )}{/if}
          </span>
        {/if}
      </p>
      <h2 class="dark:text-white font-bold mb-1 text-lg mt-8 flex items-center">
        <IconInfo class="inline-block mr-1" /> About
      </h2>
      <p class="w-full rounded-xl bg-slate-300 dark:bg-stone-800 p-5">
        <MarkdownComponent
          source="{data.profile?.bio
            .replaceAll('\\n', '\n')
            .replaceAll('![', '[')}" />
      </p>

      <h2 class="dark:text-slate-100 mb-1 text-md mt-4 flex items-center">
        <IconTime class="inline-block mr-1" /> <b class="mr-2">Joined: </b>we
        forgor, at least they're here now 🦆
      </h2>

      <h2 class="dark:text-slate-100 mb-1 text-md flex items-center">
        <IconDL class="inline-block mr-1" />
        <b class="mr-2">Total Downloads: </b>{data.downloads}
      </h2>

      <!-- <div class="mt-4 w-full rounded-xl bg-slate-300 dark:bg-stone-800 p-5"> -->
      <div class="flex items-center justify-between">
        <h2
          class="dark:text-slate-100 font-bold mb-1 text-lg mt-4 flex items-center">
          <IconBadge class="inline-block mr-1" /> Badges
        </h2>
      </div>
      <div
        class="flex space-x-2 p-2 bg-slate-300 dark:bg-stone-800 rounded-lg w-full min-h-[3rem]">
        {#if data.profile?.badges?.length != 0}
          {#each data.profile?.badges ?? [] as badge}
            <img
              alt="{badge} badge"
              src="/badges/{badge}.png"
              class="h-12 w-12 rounded-lg"
              use:tippy="{badges.find(i => i.name == badge)?.tippy}" />
          {/each}
        {/if}
      </div>
      <!-- </div> -->

      {#if $authed && $user.id === data.profile?.id}
        <Button
          style="secondary"
          click="/settings#profile"
          classes="mt-4 flex w-full items-center">
          <IconSettings
            width="24"
            height="24"
            class="float-left mr-2 stroke-blue-400" />
          Profile Settings
        </Button>
      {/if}
    </div>
    {#if isModOrAbove($roleInfo)}
      <UserModeration user="{data.profile}" />
    {/if}
  </div>
  <div
    class="grid grid-flow-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 auto-rows-min styled-scrollbar ml-0 mt-16 lg:ml-12 lg:mt-0 flex-grow">
    <div class="mb-2 flex items-center col-span-1 sm:col-span-2 lg:col-span-1">
      <h1
        class="flex-grow text-center text-xl font-bold text-slate-900 dark:text-slate-100 md:text-left">
        {data.profile?.username}'s projects
      </h1>
      {#if data.profile?.id == $user.id}
        <Button style="sm" click="/projects/new" classes="ml-6"
          >New Project</Button>
      {/if}
    </div>
    <div class="col-span-1 sm:col-span-2 lg:col-span-1">
      <CasualLine />
    </div>
    {#if data.projects?.length == 0}
      <p
        class="mt-24 text-center text-3xl text-slate-950/40 dark:text-white/40 md:mt-48 col-span-2">
        No projects here...
      </p>
    {:else}
      {#each data.projects ?? [] as project}
        <ProjectComponent {project} />
      {/each}
    {/if}
  </div>
  <div class="mb-16"></div>
</main>

<Modal bind:this="{modModal}">
  <h1 class="text-xl font-bold text-slate-950 dark:text-white">
    Moderate {data.profile?.username}
  </h1>
  <CasualLine />
  <!-- <p class=" dark:text-white mb-2">If this project breaks the rules, then please help keep the website clean by moderating it.</p> -->
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">User</p>
  <UserCard
    person="{data.profile}"
    role="{$roles.find(v => data.profile?.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
      Select Action
    </p>
    <!-- <button
      class="button-base {'delete' ? 'bg-stone-600' : 'bg-stone-900'}"
      on:click="{() => 'delete'}">Delete</button> -->
  </div>
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
    Moderation Note
  </p>
  <textarea
    class="input w-full h-48 resize-none"
    placeholder="Write a helpful message explaining why they are being moderated. Include evidence (links etc) if applicable. Markdown is supported"
    id="description"
    maxlength="200"></textarea>
  <Button>Moderate</Button>
</Modal>

<style lang="postcss">
  .icon {
    @apply inline-block align-middle text-lg transition-all hover:scale-125 md:text-xl lg:text-2xl;
  }
</style>
