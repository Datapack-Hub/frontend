<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import { toast } from "svelte-sonner";
  import IconX from "~icons/tabler/X.svelte";
  import IconUnread from "~icons/tabler/BellRinging.svelte";
  import type { Notif } from "$lib/globals/schema";
  import MarkdownComponent from "./markdown/MarkdownRenderer.svelte";

  export let notification: Notif | undefined;
  let visible = true;

  async function remove() {
    visible = false;
    toast.promise(
      fetchAuthed("DELETE", `/notifs/delete/${notification?.id}`)
        .then(response => {
          if (!response.ok) {
            visible = true;
          }
        })
        .catch(error => {
          visible = true;
          console.error(error);
        }),
      {
        success: "Removed Notification!",
        error: "Something went wrong 😵",
        loading: "Removing...",
        info: "",
        warning: ""
      }
    );
  }
</script>

{#if visible}
  <li
    class="w-full md:w-2/3 {notification?.type}-background testNotif relative rounded-xl p-4">
    <div class="flex-auto">
      <div class="flex items-center gap-3">
        {#if notification?.read == 0}<IconUnread
            class="p-0.5 text-xl font-bold dark:text-white" />{/if}
        <h1 class="mr-4 text-xl font-bold dark:text-white">
          {notification?.message}
        </h1>
      </div>
      <MarkdownComponent classes="mt-3" source="{notification?.description}" />
    </div>
    <button
      title="Dismiss"
      class="closeButton absolute right-3.5 top-3.5 rounded-full p-0.5 text-zinc-950 dark:text-white"
      on:click="{remove}"><IconX /></button>
  </li>
{/if}

<style lang="postcss">
  .default-background {
    @apply bg-slate-200 dark:bg-zinc-800;
  }

  .important-background {
    @apply bg-red-500/40;
  }

  .announcement-background {
    @apply bg-yellow-500/40;
  }

  .rainbow-background {
    background-image: linear-gradient(
      90deg,
      #ff000066,
      #ff880066,
      #ffff0066,
      #00ff0066,
      #00ff8866,
      #00ffff66,
      #0000ff66
    );
  }
</style>
