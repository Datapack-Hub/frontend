<script lang="ts">
  import ProfileCard from "$components/ProfileCard.svelte";
  import ProjectComponent from "$components/interactable/ProjectComponent.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.profile?.username} | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-8 md:px-16 lg:px-24"
>
  <div
    class="flex flex-col items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-32"
  >
    <ProfileCard profileData={data.profile} />
    <div
      class="w-full mx-24 h-full overflow-y-auto mt-16 md:mt-0 styled-scrollbar"
    >
      {#if data.projects?.length == 0}
        <p class="dark:text-white text-opacity-40 text-3xl text-center mt-48">
          No projects!
        </p>
      {:else}
        {#each data.projects ?? [] as project}
          <ProjectComponent {project} />
        {/each}
      {/if}
    </div>
  </div>
</main>

