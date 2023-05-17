<script lang="ts">
  import { apiURL } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import { toastStyle } from "$lib/globals/consts";
  import toast from "svelte-french-toast";
  import IconX from "~icons/tabler/X.svelte";

  let moi: HTMLDivElement;

  export let notification: Notif | undefined;
  let visible = true;

  async function removeThis() {
    visible = false;
    let res = await fetchAuthed("DELETE", `${apiURL}/notifs/delete/${notification?.id}`)

    if (res.ok) {
      moi.parentNode!.removeChild(moi);
    } else {
      visible = true;
    }

    toast.success("Removed notification!", toastStyle);
  }
</script>

{#if visible}
  <div
    class="flex w-full {notification?.type}-background testNotif my-2 rounded-xl p-4"
    bind:this="{moi}">
    <div class="flex-auto">
      <h1 class="font-brand text-xl font-bold {notification?.type}-text">
        {#if notification?.read == false}• {/if}{notification?.message}
      </h1>
      <p class="font-brand text-pearl-lusta-950 dark:text-white">
        {notification?.description}
      </p>
    </div>
    <button
      class="right-0 top-0 h-1 font-brand text-pearl-lusta-950 dark:text-white"
      on:click="{removeThis}"><IconX /></button>
  </div>
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
