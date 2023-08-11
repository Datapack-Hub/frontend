<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import { toast } from "svelte-sonner";
  import IconX from "~icons/tabler/X.svelte";
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
    class="{notification?.type}-background testNotif rounded-xl p-4 relative">
    <div class="flex-auto">
      <h1 class="text-xl font-bold dark:text-white">
        {notification?.read == 0 ? "•" : ""}
        {notification?.message}
      </h1>
      <MarkdownComponent
        limitedMode="{true}"
        classes="mt-3"
        source="{notification?.description}" />
    </div>
    <button
      class="closeButton absolute right-4 top-4 text-slate-950 dark:text-white"
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
    background-image: linear-gradient(90deg, #ff000066, #ff880066, #ffff0066, #00ff0066, #00ff8866, #00ffff66, #0000ff66);
  }
</style>
