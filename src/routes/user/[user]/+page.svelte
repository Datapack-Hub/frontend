<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import IconVerified from "$lib/components/decorative/IconVerified.svelte";
  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import UserModeration from "$lib/components/user/UserModeration.svelte";
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
  import tippy from "sveltejs-tippy";
  import IconBadge from "~icons/tabler/Award.svelte";
  import IconTime from "~icons/tabler/Clock.svelte";
  import IconDL from "~icons/tabler/Download.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import IconSettings from "~icons/tabler/Settings.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let followed = data.profile?.followed;
  let staffTip = {
    content: "Verified for being part of the Datapack Hub staff team.",
    placement: "right"
  };

  let helperTip = {
    content:
      "Verified for being known for helping others with their datapacks.",
    placement: "right"
  };

  let verifiedTip = {
    content:
      "Verified for their datapacks being high-quality or being active in the community.",
    placement: "right"
  };

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
  class="flex w-full flex-col items-center bg-slate-50 px-0 transition-all dark:bg-zinc-900 md:items-start md:px-16 md:pt-32 lg:flex-row lg:px-24">
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
          class="rounded-full outline outline-2 outline-offset-4 md:h-24 md:w-24 lg:h-32 lg:w-32"
          style="outline-color:{data.role?.color};" />
        <Button style="sm" classes="mt-4" click="{follow}"
          ><IconPlus class="inline-block align-text-top" />
          {#if followed}Unfollow{:else}Follow{/if}</Button>
        {#if data.profile.id == $user.id || $roleInfo.permissions.includes("EDIT_USER")}
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
            class="text-center text-4xl font-bold text-zinc-950 dark:text-white md:text-left md:text-3xl lg:text-4xl">
            {data.profile?.username}
            {#if moderatorOrAbove(data.role)}
              <span class="icon text-dph-orange" use:tippy="{staffTip}">
                <IconVerified />
              </span>
            {:else if data.profile?.role == "helper"}
              <span class="icon text-blue-500" use:tippy="{helperTip}">
                <IconVerified />
              </span>
            {:else if data.profile?.role == "verified"}
              <span class="icon text-emerald-500" use:tippy="{verifiedTip}">
                <IconVerified />
              </span>
            {/if}
          </p>
          <p
            class="mt-1 text-center font-semibold text-zinc-950 dark:text-white sm:text-base md:text-left md:text-lg">
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
            class="mb-1 mt-4 w-full text-center dark:text-zinc-100 md:text-left">
            <IconTime class="mr-1 inline-block" />
            <b class="mr-2">Joined: </b>{data.profile?.join_date
              ? timeAgo(data.profile?.join_date)
              : "we forgor 🦆"}
          </h2>
          <h2 class="mb-1 text-center dark:text-zinc-100 md:text-left">
            <IconDL class="mr-1 inline-block" />
            <b class="mr-2">Total Downloads: </b>{data.downloads}
          </h2>
        </div>
        <div>
          <h2
            class="mb-1 mt-4 text-center text-lg font-bold dark:text-zinc-100 md:text-left">
            <IconBadge class="mr-1 inline-block" /> Badges
          </h2>
          <div
            class="flex min-h-[3rem] w-full justify-center space-x-3 rounded-lg bg-slate-300 p-3 dark:bg-zinc-800 md:justify-start">
            {#if data.profile?.badges?.length != 0}
              {#each data.profile?.badges ?? [] as badge}
                <img
                  alt="{badge} badge"
                  src="/badges/{badge}.png"
                  class="h-8 w-8 rounded-lg lg:h-12 lg:w-12"
                  use:tippy="{badges.find(index => index.name == badge)
                    ?.tippy}" />
              {/each}
            {/if}
          </div>
        </div>
      </div>
      <span
        class="styled-scrollbar w-full overflow-y-auto rounded-xl bg-slate-300 p-4 dark:bg-zinc-800 md:w-1/2">
        <MarkdownComponent source="{data.profile?.bio}" />
      </span>
    </div>
    <div class="px-3 pt-16">
      <div class="mb-4 flex items-center">
        <h1
          class="flex-grow text-center text-base font-bold text-zinc-900 dark:text-zinc-100 md:text-left md:text-lg lg:text-xl">
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
            class="col-span-2 mt-24 text-center text-3xl text-zinc-950/40 dark:text-white/40 md:mt-48">
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

<style lang="postcss">
  .icon {
    @apply inline-block align-middle text-lg transition-all hover:scale-125 md:text-xl lg:text-2xl;
  }
</style>
