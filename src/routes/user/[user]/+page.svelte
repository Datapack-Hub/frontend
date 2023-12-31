<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import IconVerified from "$lib/components/decorative/IconVerified.svelte";
  import RawMarkdownRenderer from "$lib/components/markdown/RawMarkdownRenderer.svelte";
  import ProjectComponent from "$lib/components/project/ProjectCard.svelte";
  import UserModeration from "$lib/components/user/UserModeration.svelte";
  import Tooltip from "$lib/components/utility/Tooltip.svelte";
  import { badges } from "$lib/globals/badges";
  import {
    appendSize,
    fetchAuthed,
    moderatorOrAbove,
    timeAgo
  } from "$lib/globals/functions";
  import { roleInfo, user } from "$lib/globals/stores";
  import { title } from "radash";
  import { toast } from "svelte-sonner";
  import IconBadge from "~icons/tabler/Award.svelte";
  import IconTime from "~icons/tabler/Clock.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import IconSettings from "~icons/tabler/Settings.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: followed = data.profile?.followed;

  // easter egg :)
  async function play() {
    let audio = new Audio("/sus.mp3");
    await audio.play();
  }

  async function follow() {
    followed = !followed;
    let followRequest = await fetchAuthed(
      "post",
      "/user/id/" + data.profile?.id + "/follow"
    );
    if (followRequest.ok) {
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
  class="flex w-full flex-col items-center bg-slate-50 px-0 transition-all md:items-start md:px-16 md:pt-32 lg:flex-row lg:px-24 dark:bg-zinc-900">
  <div class="w-full rounded-lg p-3">
    <div class="relative mb-4 flex h-auto flex-col gap-4 md:flex-row lg:gap-8">
      <div class="flex w-full flex-col items-center md:w-1/5">
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src="{appendSize(data.profile?.profile_icon, 256)}"
          alt="{data.profile?.username}'s profile picture"
          on:click="{data.profile?.id == 3 ? play : undefined}"
          on:keypress="{event =>
            event.key == 'Enter' && data.profile?.id == 3 ? play : undefined}"
          height="128"
          width="128"
          class="rounded-full md:h-24 md:w-24 lg:h-32 lg:w-32" />
        {#if data.profile.id != $user.id}
          <Button style="sm" classes="mt-4" click="{follow}"
            ><IconPlus class="inline-block align-text-top" />
            {#if followed}Unfollow{:else}Follow{/if}</Button>
        {/if}
        {#if data.profile.id == $user.id}
          <Button
            click="{data.profile.id == $user.id
              ? '/settings#profile'
              : `/user/${data.profile.username}/edit`}"
            style="sm"
            classes="mt-2">
            <IconSettings
              class="inline-block align-text-top dark:text-zinc-100" />
            Edit Profile
          </Button>
        {/if}
        {#if moderatorOrAbove($roleInfo)}
          <UserModeration user="{data.profile}" />
        {/if}
      </div>
      <div class="flex w-full flex-col justify-between md:w-2/5">
        <div>
          <p
            class="text-center text-4xl font-bold text-zinc-950 md:text-left md:text-3xl lg:text-4xl dark:text-white">
            {data.profile?.username}
            {#if moderatorOrAbove(data.role)}
              <Tooltip
                tooltipText="Verified for being part of the Datapack Hub staff team."
                classes="inline-block"
                placement="{'bottom'}">
                <IconVerified classes="{'icon text-dph-orange'}" />
              </Tooltip>
            {:else if data.profile?.role == "helper"}
              <Tooltip
                tooltipText="Verified for being known to help with troubles."
                classes="inline-block"
                placement="{'bottom'}">
                <IconVerified classes="{'icon text-blue-500'}" />
              </Tooltip>
            {:else if data.profile?.role == "verified"}
              <Tooltip
                tooltipText="Verified for high-quality datapacks or being active in the community."
                classes="inline-block"
                placement="{'bottom'}">
                <IconVerified classes="{'icon text-emerald-500'}" />
              </Tooltip>
            {/if}
          </p>
          <p
            class="mt-1 text-center font-semibold text-zinc-950 sm:text-base md:text-left md:text-lg dark:text-white">
            {#if data.role?.name != "default"}
              <span style="color: {data.role?.color};">
                {#if data.role?.name == "nerd"}🤓
                {:else if data.role?.name == "admin"}<img
                    src="/logos/dph.svg"
                    alt="logo"
                    class="mr-1 inline-block"
                    height="24"
                    width="24" />Datapack Hub Team{:else}{title(
                    data.role?.name
                  )}{/if}
              </span>
            {/if}
          </p>
        </div>
        <div>
          <h2
            class="mb-1 mt-4 w-full text-center md:text-left dark:text-zinc-100">
            <IconTime class="mr-1 inline-block" />
            <b class="mr-2">Joined: </b>{data.profile?.join_date
              ? timeAgo(data.profile?.join_date)
              : "we forgor 🦆"}
          </h2>
          <h2 class="mb-1 text-center md:text-left dark:text-zinc-100">
            <IconDL class="mr-1 inline-block" />
            <b class="mr-2">Total Downloads: </b>{data.downloads}
          </h2>
        </div>
        <div>
          <h2
            class="mb-1 mt-4 text-center text-lg font-bold md:text-left dark:text-zinc-100">
            <IconBadge class="mr-1 inline-block" /> Badges
          </h2>
          <div
            class="flex min-h-[3rem] w-full justify-center space-x-3 rounded-lg bg-slate-200 p-3 md:justify-start dark:bg-zinc-800 dark:text-zinc-300">
            {#if data.profile && data.profile.badges && data.profile?.badges?.length != 0}
              {#each data.profile?.badges ?? [] as badge}
                <Tooltip
                  allowHTML="{true}"
                  tooltipText="{badges.find(index => index.name == badge)
                    ?.tooltip || 'Badge not found, whoops!'}"
                  placement="{'top'}">
                  <img
                    alt="{badge} badge"
                    src="/badges/{badge}.png"
                    class="h-8 w-8 rounded-lg lg:h-12 lg:w-12" />
                </Tooltip>
              {/each}
            {:else}
              Whoops, nothing here...
            {/if}
          </div>
        </div>
      </div>
      <span
        class="styled-scrollbar w-full overflow-y-auto rounded-xl bg-slate-200 p-4 md:w-1/2 dark:bg-zinc-800">
        <RawMarkdownRenderer html="{data.profile?.bio}" />
      </span>
    </div>
    <div class="px-3 pt-16">
      <div class="mb-4 flex items-center">
        <h1
          class="flex-grow text-center text-base font-bold text-zinc-900 md:text-left md:text-lg lg:text-xl dark:text-zinc-100">
          {data.profile?.username}'s projects
        </h1>
        {#if data.profile?.id == $user.id}
          <Button style="sm" click="/projects/new" classes="ml-6"
            >New Project</Button>
        {/if}
        <CasualLine />
      </div>
      <div class="sm:grid-auto-fit-2xl grid grid-cols-1 gap-3">
        {#if data.projects?.length == 0}
          <p
            class="col-span-2 mt-24 text-center text-3xl text-zinc-950/40 md:mt-48 dark:text-white/40">
            No projects here...
          </p>
        {:else}
          {#each data.projects ?? [] as project}
            <ProjectComponent {project} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</main>
<div class="py-3"></div>
