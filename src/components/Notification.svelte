<script lang="ts">
  import { fetchAuthed, apiURL } from "$globals";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";

  let moi: HTMLDivElement;

  export let notification: Notif | undefined;
  let visible = true;

  async function removeThis() {
    visible = false;
    let de = await fetchAuthed(
      "DELETE",
      `${apiURL}/notifs/delete/${notification?.id}`
    );
    if (de.ok) {
      toasts.success("Removed the notification!");
      moi.parentNode!.removeChild(moi);
    } else {
      visible = true;
      toasts.error("Failed to remove the notification.");
    }
  }
</script>

{#if visible}
  <div
    class="flex w-full {notification?.type}-background my-2 rounded-xl p-4"
    bind:this="{moi}">
    <div class="flex-auto">
      <h1 class="font-brand text-xl font-bold {notification?.type}-text">
        {#if notification?.read == false}• {/if}{notification?.message}
      </h1>
      <p class="font-brand dark:text-white">{notification?.description}</p>
    </div>
    <button
      class="right-0 top-0 h-1 font-brand dark:text-white"
      on:click="{removeThis}">X</button>
  </div>
{/if}

<ToastContainer placement="bottom-right" let:data>
  <FlatToast data="{data}" />
  <!-- Provider template for your toasts -->
</ToastContainer>

<style lang="postcss">
  /* @HoodieRocks can you fix this so it works on light mode too */
  .default-text {
    @apply text-white;
  }
  .default-background {
    @apply bg-stone-800;
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
