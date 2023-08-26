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

  //  {:else if data.profile?.role == "helper"}<span
  //           class="icon text-blue-500"
  //           use:tippy="{blueVerifiedHover}"><IconVerified /></span
  //         >{:else if data.profile?.role == "verified"}<span
  //           class="icon text-emerald-500"
  //           use:tippy="{emeraldVerifiedHover}"
  //           ><IconVerified />
  //         </span>
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
    <div class="mb-4 flex flex-col md:flex-row gap-4 lg:gap-8 h-auto md:h-64">
      <div class="flex w-full md:w-1/5 flex-col items-center">
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
        <Button
          style="sm"
          classes="mt-4 flex w-fit items-center justify-center space-x-1"
          click="{follow}"
          ><IconPlus />
          {#if followed}Unfollow{:else}Follow{/if}</Button>
            {#if moderatorOrAbove($roleInfo)}
      <UserModeration user="{data.profile}" />
    {/if}
      </div>
      <div class="w-full md:w-2/5">
        <p
          class="text-center md:text-left text-4xl font-bold text-slate-950 dark:text-white md:text-3xl lg:text-4xl">
          {data.profile?.username}
          {#if moderatorOrAbove(data.role)}
            <span
              class="icon text-dph-orange"
              use:tippy="{orangeVerifiedHover}">
              <IconVerified />
            </span>
          {/if}
        </p>
        <p
          class="mt-1 text-center md:text-left font-semibold text-slate-950 dark:text-white sm:text-base md:text-lg">
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
        <h2 class="text-center md:text-left w-full mb-1 mt-4 dark:text-slate-100">
          <IconTime class="mr-1 inline-block" /> <b class="mr-2">Joined: </b>we
          forgor 🦆
        </h2>
        <h2 class="text-center md:text-left  mb-1 dark:text-slate-100">
          <IconDL class="mr-1 inline-block" />
          <b class="mr-2">Total Downloads: </b>{data.downloads}
        </h2>
        <h2
          class="text-center md:text-left mb-1 mt-4 text-lg font-bold dark:text-slate-100">
          <IconBadge class="mr-1 inline-block" /> Badges
        </h2>
        <div
          class="flex min-h-[3rem] justify-center md:justify-start w-full space-x-3 rounded-lg bg-slate-300 p-3 dark:bg-zinc-800">
          {#if data.profile?.badges?.length != 0}
            {#each data.profile?.badges ?? [] as badge}
              <img
                alt="{badge} badge"
                src="/badges/{badge}.png"
                class="h-8 lg:h-12 w-8 lg:w-12 rounded-lg"
                use:tippy="{badges.find(index => index.name == badge)
                  ?.tippy}" />
            {/each}
          {/if}
        </div>
      </div>
      <span class="rounded-xl w-full md:w-1/2 bg-slate-300 p-4 dark:bg-zinc-800 styled-scrollbar overflow-y-auto">
        <MarkdownComponent source="{data.profile?.bio}" />
      </span>
    </div>
    {#if $authed && $user.id === data.profile?.id}
      <Button
        style="secondary"
        click="/settings#profile"
        classes="mt-4 flex w-fit items-center">
        <IconSettings
          width="24"
          height="24"
          class="float-left mr-2 stroke-blue-400" />
        Profile Settings
      </Button>
    {/if}
    <div class="px-3 pt-16">
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
      <div class="grid-auto-fit-2xl grid gap-3">
        {#if data.projects?.length == 0}
          <p
            class="col-span-2 mt-24 text-center text-3xl text-slate-950/40 dark:text-white/40 md:mt-48">
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
