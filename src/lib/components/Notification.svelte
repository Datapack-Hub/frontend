<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import { createEventDispatcher } from "svelte";
  import toast from "svelte-french-toast";
  import IconX from "~icons/tabler/X.svelte";
  import type { Notif } from "$lib/globals/schema";

  const dispatch = createEventDispatcher();

  export let notification: Notif | undefined;
  let visible = true;

  async function removeThis() {
    visible = false;
    let res = await fetchAuthed("DELETE", `/notifs/delete/${notification?.id}`);

    if (res.ok) {
      dispatch("close", {
        id: notification?.id
      });
    } else {
      visible = true;
    }

    toast.success("Removed notification!");
  }
</script>

{#if visible}
  <li
    class="flex w-full {notification?.type}-background testNotif my-2 rounded-xl p-4">
    <div class="flex-auto">
      <h1 class=" text-xl font-bold {notification?.type}-text">
        {#if notification?.read == false}• {/if}{notification?.message}
      </h1>
      <p class=" text-pearl-lusta-950 dark:text-white">
        {notification?.description}
      </p>
    </div>
    <button
      class="closeButton right-0 top-0 h-1 text-pearl-lusta-950 dark:text-white"
      on:click="{removeThis}"><IconX /></button>
  </li>
{/if}

<!-- <ToastContainer placement="bottom-right" let:data>
  <FlatToast data="{data}" />
  Provider template for your toasts
</ToastContainer> -->

<style lang="postcss">
  /* @HoodieRocks can you fix this so it works on light mode too */
  .default-text {
    @apply text-pearl-lusta-950 dark:text-white;
  }
  .default-background {
    @apply bg-pearl-lusta-200 dark:bg-stone-800;
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
    @apply bg-gradient-to-r from-red-500/75 via-green-500/75 via-orange-500/75 via-yellow-500/75 to-blue-500/75;
  }
</style>
