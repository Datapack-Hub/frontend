<script lang="ts">
  import ProfileCard from "$components/FullProfileCard.svelte";
  import ProjectComponent from "$components/ProjectComponent.svelte";
  import UserModeration from "$components/UserModeration.svelte";
  import { isAuthenticated, useUser } from "$globals";
  import type { PageData } from "./$types";

  export let data: PageData;

  let user = useUser()
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
  class="flex w-full -translate-y-20 flex-col items-center bg-new-white-200 px-8 transition-all dark:bg-stone-900 md:translate-y-0 md:flex-row md:items-start md:px-16 md:pt-32 lg:px-24">
  <div class="w-full">
    <ProfileCard profile="{data.profile}" profileRole="{data.role}" />
    {#if $isAuthenticated && ["moderator", "developer", "admin"].includes(user.role)}
      <UserModeration user="{data.profile}" />
    {/if}
  </div>
  <div
    class="styled-scrollbar mx-24 mt-16 h-full w-full overflow-y-auto md:mt-0">
    <h1 class="text-center text-xl font-bold dark:text-white md:text-left">
      {data.profile?.username}'s projects
    </h1>
    {#if data.projects?.length == 0}
      <p class="mt-48 text-center text-3xl text-opacity-40 dark:text-white">
        No projects!
      </p>
    {:else}
      {#each data.projects ?? [] as project}
        <ProjectComponent project="{project}" />
      {/each}
    {/if}
  </div>
</main>
