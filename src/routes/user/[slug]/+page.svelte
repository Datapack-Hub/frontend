<script lang="ts">
  import ProjectComponent from "$components/ProjectComponent.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  function titleCase(str: string): string {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
</script>

<main class="dark:bg-stone-900 bg-newWhite transition-all px-4 lg:px-32 xl:px-64">
  <div class="flex flex-col items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-32">
    <div class="flex flex-col items-center">
      {#if data.profile.role != "default"}
        <img
          src={data.profile.profile_icon}
          alt="{data.profile.username}'s profile picture"
          height="128"
          width="128"
          class="md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full outline outline-2 {data.profile
            .role}-outline outline-offset-4"
        />
      {:else}
        <img
          src={data.profile.profile_icon}
          alt="{data.profile.username}'s profile picture"
          height="128"
          width="128"
          class="md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full outline outline-2 outline-white outline-offset-4"
        />
      {/if}

      <p class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8">
        {data.profile.username}
      </p>

      <p class="dark:text-white sm:text-base md:text-lg font-brand font-bold">
        {#if data.profile.role != "default"}
          <span class="{data.profile.role}-text">
            ⬤ {titleCase(data.profile.role)}
          </span>
        {/if}
      </p>
      <p class="dark:text-white text-lg mt-4 font-brand font-light">
        "{data.profile.bio}"
      </p>
    </div>
    <div class="w-full mx-24 h-full overflow-auto md:overflow-y-scroll mt-16 md:mt-0">
      {#if data.projects.length == 0}
        <p class="dark:text-white text-opacity-40 text-3xl text-center mt-48">
          No projects!
        </p>
      {:else}
        {#each data.projects as project}
          <ProjectComponent {project} />
        {/each}
      {/if}
    </div>
  </div>
</main>

<style lang="postcss">
  .admin-outline {
    @apply outline-red-500;
  }

  .admin-text {
    @apply text-red-500;
  }

  .moderator-outline {
    @apply outline-orange-500;
  }

  .moderator-text {
    @apply text-orange-500;
  }

  .developer-outline {
    @apply outline-lime-500;
  }

  .developer-text {
    @apply text-lime-500;
  }

  .helper-outline {
    @apply outline-blue-500;
  }

  .helper-text {
    @apply text-blue-500;
  }
</style>
