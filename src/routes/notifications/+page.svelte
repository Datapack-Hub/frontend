<script lang="ts">
  import Notification from "$lib/components/Notification.svelte";
  import Button from "$lib/components/decorative/Button.svelte";
  import { fetchAuthed } from "$lib/globals/functions";
  import autoAnimate from "@formkit/auto-animate";
  import type { PageData } from "./$types";

  export let data: PageData;
  let localNotifCopy = data.notifications;

  function deleteAll() {
    for (const n of localNotifCopy) {
      fetchAuthed("DELETE", `/notifs/delete/${n?.id}`);
    }
    localNotifCopy = [];
  }
</script>

<svelte:head>
  <title>Notifications | Datapack Hub</title>
  <meta name="description" content="View your notifications" />
</svelte:head>

<main
  id="main-content"
  class="bg-slate-50 transition-all dark:bg-zinc-900 h-full px-4 sm:px-8 md:px-16 lg:px-24">
  <div class="flex-col items-center md:flex-row md:items-start">
    <div
      class="flex flex-col md:flex-row items-center justify-between pt-24 pb-6">
      <h1
        class="pb-2 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-5xl lg:text-6xl">
        Notifications
      </h1>
      <Button click="{deleteAll}">Remove All Notifications</Button>
    </div>
    <div use:autoAnimate>
      {#if data.notifications?.length == 0}
        <div class="flex items-center justify-center w-full h-96">
          <h1 class="text-xl text-slate-950 dark:text-white">
            It's feeling lonely in here...
          </h1>
        </div>
      {/if}
      <ul use:autoAnimate class="grid grid-cols-1 gap-2">
        {#each localNotifCopy ?? [] as notification}
          <Notification {notification} />
        {/each}
      </ul>
    </div>
  </div>
</main>
