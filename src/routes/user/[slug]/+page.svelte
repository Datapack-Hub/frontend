<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import ProfileCard from "$lib/components/profile/FullProfileCard.svelte";
  import UserModeration from "$lib/components/profile/UserModeration.svelte";
  import { authed, role, user } from "$lib/globals/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
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
  class="flex flex-col lg:flex-row w-full -translate-y-20 items-center bg-pearl-lusta-100 px-8 transition-all dark:bg-stone-900 md:translate-y-0 md:items-start md:px-16 md:pt-32 lg:px-24">
  <div class="w-full lg:w-2/5 xl:w-1/3">
    <ProfileCard profile="{data.profile}" profileRole="{data.role}" />
    {#if $authed && ["moderator", "developer", "admin"].includes($role.name)}
      <UserModeration user="{data.profile}" />
    {/if}
  </div>
  <div
    class="grid grid-flow-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 auto-rows-min styled-scrollbar ml-0 mt-16 lg:ml-12 lg:mt-0 flex-grow">
    <div class="mb-2 flex items-center col-span-1 sm:col-span-2 lg:col-span-1">
      <h1
        class="flex-grow text-center text-xl font-bold text-pearl-lusta-900 dark:text-pearl-lusta-100 md:text-left">
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
        class="mt-24 text-center text-3xl text-pearl-lusta-950/40 dark:text-white/40 md:mt-48 col-span-2">
        No projects!
      </p>
    {:else}
      {#each data.projects ?? [] as project}
        <ProjectComponent project="{project}" />
      {/each}
    {/if}
  </div>
  <div class="mb-16"></div>
</main>
