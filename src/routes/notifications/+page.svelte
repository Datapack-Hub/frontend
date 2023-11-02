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
  class="h-full bg-slate-50 px-4 transition-all dark:bg-zinc-900 sm:px-8 md:px-16 lg:px-24">
  <div class="pt-0 md:pt-32"></div>
  <div class="flex-col items-center md:flex-row md:items-start">
    <div
      class="flex flex-col items-center justify-between pb-6 md:flex-row">
      <h1
        class="pb-2 text-center text-5xl font-bold text-zinc-950 dark:text-white md:text-start md:text-5xl lg:text-6xl">
        Notifications
      </h1>
      <Button click="{deleteAll}" style="base" classes="bg-red-500 text-white"
        >Delete All</Button>
    </div>
    <div use:autoAnimate>
      {#if data.notifications?.length == 0}
        <div class="flex h-96 w-full items-center justify-center">
          <h1 class="text-xl text-zinc-950 dark:text-white">
            It's feeling lonely in here...
          </h1>
        </div>
      {/if}
      <ul use:autoAnimate class="grid grid-cols-1 gap-3">
        {#each localNotifCopy ?? [] as notification}
          <Notification {notification} />
        {/each}
      </ul>
    </div>
  </div>
</main>
