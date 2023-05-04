<script lang="ts">
  import type { PageData } from "./$types";
  import Notification from "$components/Notification.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Notifications | Datapack Hub</title>
</svelte:head>

<main
  class="overflow-y-scroll bg-new-white-200 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64 -translate-y-20 md:translate-y-0">
  <div
    class=" h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-2 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Notifications
    </h1>
    {#if data.notifications?.length == 0}
      <h1 class="font-brand dark:text-white">
        <b>No notifications!</b> It's lonely in here
      </h1>
    {/if}
    {#each data.notifications ?? [] as notification}
      <Notification notification="{notification}" />
    {/each}
  </div>
</main>
