<script lang="ts">
  import type { PageData } from "./$types";
  import Notification from "$lib/components/Notification.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { onMount } from "svelte";

  export let data: PageData;
  let localNotifCopy = data.notifications;
  let visible = false;

  onMount(() => (visible = true));
</script>

<svelte:head>
  <title>Notifications | Datapack Hub</title>
  <meta name="description" content="View your notifications" />
</svelte:head>

<main
  class="bg-pearl-lusta-50 transition-all dark:bg-stone-900 h-full px-4 sm:px-8 md:px-16 lg:px-24">
  <div class="flex-col items-center md:flex-row md:items-start">
    <h1
      class="pt-24 pb-2 text-center text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-5xl lg:text-6xl">
      Notifications
    </h1>
    <div use:autoAnimate>
      {#if visible}
        {#if data.notifications?.length == 0}
          <div class="flex items-center justify-center w-full h-96">
            <h1 class="text-xl text-pearl-lusta-950 dark:text-white">
              It's feeling lonely in here...
            </h1>
          </div>
        {/if}
        <ul use:autoAnimate>
          {#each localNotifCopy ?? [] as notification}
            <Notification notification="{notification}" />
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</main>
