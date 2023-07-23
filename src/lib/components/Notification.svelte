<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import { toast } from "svelte-sonner";
  import IconX from "~icons/tabler/X.svelte";
  import type { Notif } from "$lib/globals/schema";
  import MarkdownComponent from "./MarkdownComponent.svelte";

  export let notification: Notif | undefined;
  let visible = true;

  async function remove() {
    visible = false;
    toast.promise(
      fetchAuthed("DELETE", `/notifs/delete/${notification?.id}`)
        .then(res => {
          if (!res.ok) {
            visible = true;
          }
        })
        .catch(err => {
          visible = true;
          console.error(err);
        }),
      {
        success: "Removed Notification!",
        error: "Something went wrong 😵",
        loading: "Removing..."
      }
    );
  }
</script>

{#if visible}
  <li
    class="flex w-full {notification?.type}-background testNotif my-2 rounded-xl p-4">
    <div class="flex-auto">
      <h1 class="text-xl font-bold {notification?.type}-text">
        {#if notification?.read == 0}•
        {/if}{notification?.message}
      </h1>
      <MarkdownComponent
        limitedMode="{true}"
        source="{notification?.description}" />
    </div>
    <button
      class="closeButton right-0 top-0 h-1 text-slate-950 dark:text-white"
      on:click="{remove}"><IconX /></button>
  </li>
{/if}

<style lang="postcss">
  /* @HoodieRocks can you fix this so it works on light mode too */
  .default-text {
    @apply text-slate-950 dark:text-white;
  }
  .default-background {
    @apply bg-slate-200 dark:bg-stone-800;
  }

  .important-text {
    @apply text-red-500;
  }
  .important-background {
    @apply bg-red-500/20;
  }

  .announcement-text {
    @apply text-yellow-500;
  }
  .announcement-background {
    @apply bg-yellow-500/20;
  }

  .rainbow-text {
    @apply text-white;
  }
  .rainbow-background {
    @apply bg-gradient-to-r from-red-500/75 via-green-500/75 to-purple-500/75;
  }
</style>
