<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import IconVerified from "$lib/components/decorative/IconVerified.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import UserModeration from "$lib/components/user/UserModeration.svelte";
  import { badges } from "$lib/globals/consts";
  import { fetchAuthed, moderatorOrAbove } from "$lib/globals/functions";
  import { authed, roleInfo, user } from "$lib/globals/stores";
  import { title } from "radash";
  import tippy from "sveltejs-tippy";
  import IconBadge from "~icons/tabler/Award.svelte";
  import IconTime from "~icons/tabler/Clock.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import IconInfo from "~icons/tabler/InfoCircle.svelte";
  import IconSettings from "~icons/tabler/Settings.svelte";
  import type { PageData } from "./$types";
  import { toast } from "svelte-sonner";

  export let data: PageData;

  let followed = data.profile?.followed;

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

  async function follow() {
    followed = !followed;
    let followreq = await fetchAuthed(
      "post",
      "/user/id/" + data.profile?.id + "/follow"
    );
    if (followreq.ok) {
      toast.success("Done!");
    } else {
      toast.error("Something went wrong!");
      followed = !followed;
    }
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
  class="flex flex-col lg:flex-row w-full items-center bg-slate-50 px-0 transition-all dark:bg-zinc-900 md:items-start md:px-16 md:pt-32 lg:px-24">
  <div class="w-full lg:w-2/5 xl:w-1/3 p-3 rounded-lg">
    <div
      class="mb-4 flex w-full flex-col mt-16 md:mt-0 items-center md:items-start">
      <div class="self-center">
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src="{data.profile?.profile_icon}&size=256"
          alt="{data.profile?.username}'s profile picture"
          on:click="{data.profile?.id == 3 ? play : undefined}"
          on:keypress="{event =>
            event.key == 'Enter' && data.profile?.id == 3 ? play : undefined}"
          height="128"
          width="128"
          class="rounded-full outline outline-2 outline-offset-4 md:h-24 md:w-24 lg:h-32 lg:w-32"
          style="outline-color:{data.role?.color};" />
      </div>
      <p
        class="mt-4 w-full text-center text-4xl font-bold text-slate-950 dark:text-white md:text-3xl lg:text-4xl">
        {data.profile?.username}
        {#if moderatorOrAbove(data.role)}
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
      <div class="flex w-full justify-around mt-1">
        <Button
          style="sm"
          classes="flex space-x-1 items-center"
          click="{follow}"
          ><IconPlus />
          {#if followed}Unfollow{:else}Follow{/if}</Button>
      </div>
      <h2 class="dark:text-white font-bold mb-1 text-lg mt-8 flex items-center">
        <IconInfo class="inline-block mr-1" /> About
      </h2>
      <p class="w-full rounded-xl bg-slate-300 dark:bg-zinc-800 p-5">
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

      <!-- <div class="mt-4 w-full rounded-xl bg-slate-300 dark:bg-zinc-800 p-5"> -->
      <div class="flex items-center justify-between">
        <h2
          class="dark:text-slate-100 font-bold mb-1 text-lg mt-4 flex items-center">
          <IconBadge class="inline-block mr-1" /> Badges
        </h2>
      </div>
      <div
        class="flex space-x-2 p-2 bg-slate-300 dark:bg-zinc-800 rounded-lg w-full min-h-[3rem]">
        {#if data.profile?.badges?.length != 0}
          {#each data.profile?.badges ?? [] as badge}
            <img
              alt="{badge} badge"
              src="/badges/{badge}.png"
              class="h-12 w-12 rounded-lg"
              use:tippy="{badges.find(index => index.name == badge)?.tippy}" />
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
    {#if moderatorOrAbove($roleInfo)}
      <UserModeration user="{data.profile}" />
    {/if}
  </div>
  <div class="w-full lg:w-3/5 xl:w-2/3 px-3 pt-16">
    <div class="mb-4 flex items-center">
      <h1
        class="flex-grow text-center text-xl font-bold text-slate-900 dark:text-slate-100 md:text-left">
        {data.profile?.username}'s projects
      </h1>
      {#if data.profile?.id == $user.id}
        <Button style="sm" click="/projects/new" classes="ml-6"
          >New Project</Button>
      {/if}
      <CasualLine />
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-2">
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
  </div>
</main>
<div class="py-3"></div>

<style lang="postcss">
  .icon {
    @apply inline-block align-middle text-lg transition-all hover:scale-125 md:text-xl lg:text-2xl;
  }
</style>
