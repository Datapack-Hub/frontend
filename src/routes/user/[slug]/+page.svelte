<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import ProjectComponent from "$lib/components/ProjectComponent.svelte";
  import ProfileCard from "$lib/components/profile/FullProfileCard.svelte";
  import UserModeration from "$lib/components/profile/UserModeration.svelte";
  import { authed, role, user } from "$lib/globals/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.profile?.username} | Datapack Hub</title>

  <meta property="title" content="Silabear | Datapack Hub" />
  <meta property="description" content="{data.profile?.bio}" />

  <meta property="og:title" content="{data.profile?.username} | Datapack Hub" />
  <meta property="og:description" content="{data.profile?.bio}" />
  <meta property="og:type" content="profile" />

  <meta name="og:profile:username" content="Silabear" />
  <meta name="og:image" content="{data.profile?.profile_icon}" />
  <meta name="og:image:secure_url" content="{data.profile?.profile_icon}" />
  <meta name="og:image:width" content="120" />
  <meta name="og:image:height" content="120" />
</svelte:head>

<main
  class="flex w-full -translate-y-20 flex-col items-center bg-pearl-lusta-100 px-8 transition-all dark:bg-stone-900 md:translate-y-0 md:flex-row md:items-start md:px-16 md:pt-32 lg:px-24">
  <div class="w-full md:w-1/2 2xl:w-1/3">
    <ProfileCard profile="{data.profile}" profileRole="{data.role}" />
    {#if $authed && ["moderator", "developer", "admin"].includes($role.name)}
      <UserModeration user="{data.profile}" />
    {/if}
  </div>
  <div
    class="styled-scrollbar ml-0 mt-16 h-full w-2/3 overflow-y-auto md:ml-24 md:mt-0">
    <div class="mb-2 flex items-center">
      <h1
        class="flex-grow text-center text-xl font-bold dark:text-white md:text-left">
        {data.profile?.username}'s projects
      </h1>
      {#if data.profile?.id == $user.id}
        <Button style="sm" click="/projects/new" classes="ml-6"
          >New Project</Button>
      {/if}
    </div>
    <CasualLine />
    <div class="mb-2"></div>
    {#if data.projects?.length == 0}
      <p
        class="mt-24 text-center text-3xl text-pearl-lusta-950/40 dark:text-white/40 md:mt-48">
        No projects!
      </p>
    {:else}
      <div class="space-y-2">
        {#each data.projects ?? [] as project}
          <ProjectComponent project="{project}" />
        {/each}
      </div>
    {/if}
    <div class="mb-48 md:mb-0"></div>
  </div>
</main>
