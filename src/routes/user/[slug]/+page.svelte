<script lang="ts">
  import ProfileCard from "$components/ProfileCard.svelte";
  import ProjectComponent from "$components/interactable/ProjectComponent.svelte";
  import UserModeration from "$components/interactable/UserModeration.svelte";
  import { isAuthenticated, userData } from "$globals";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.profile?.username} | Datapack Hub</title>
</svelte:head>

<main
  class="styled-scrollbar h-screen overflow-y-scroll bg-new-white px-8 transition-all dark:bg-stone-900 md:px-16 lg:px-24">
  <div
    class="flex h-screen w-full flex-col items-center pt-16 md:flex-row md:items-start md:pt-32">
    <div class="w-full md:w-[calc(39ch*2.25)] lg:w-[calc(39ch*3)]">
      <ProfileCard profileData="{data.profile}" />
      {#if $isAuthenticated && ["moderator", "developer", "admin"].includes($userData.role)}
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
  </div>
</main>
