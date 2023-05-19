<script lang="ts">
  import type { PageData } from "./$types";
  import Notification from "$lib/components/Notification.svelte";

  export let data: PageData;
  let localNotifCopy = data.notifications;

  function remove(e: CustomEvent<any>) {
    localNotifCopy = localNotifCopy?.filter((v) => v.id != e.detail.id);
  }
</script>

<svelte:head>
  <title>Notifications | Datapack Hub</title>
</svelte:head>

<main
  class="-translate-y-20 overflow-y-scroll bg-pearl-lusta-100 transition-all dark:bg-stone-900 md:translate-y-0 lg:px-16 xl:px-32">
  <div
    class="h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-2 text-center font-brand text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-5xl lg:text-6xl">
      Notifications
    </h1>
    {#if data.notifications?.length == 0}
      <h1 class="font-brand text-xl text-pearl-lusta-950 dark:text-white">
        <b>No notifications!</b> It's lonely in here
      </h1>
    {/if}
    {#each localNotifCopy ?? [] as notification}
      <Notification
        on:close="{(e) => remove(e)}"
        notification="{notification}" />
    {/each}
  </div>
</main>
