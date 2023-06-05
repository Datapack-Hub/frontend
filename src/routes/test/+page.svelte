<script lang="ts">
  import Modal from "$lib/components/modals/Modal.svelte";

  let modal: Modal;
</script>

<Modal bind:this="{modal}">
  <h1 class="font-brand text-xl font-bold text-pearl-lusta-950 dark:text-white">
    Warn
  </h1>
  <p class="font-brand text-pearl-lusta-950 dark:text-white">
    This message is sent to the user as a notification. Always be professional,
    even when they are not.
  </p>
  <p
    class="mt-3 align-middle font-brand text-pearl-lusta-950 dark:text-pearl-lusta-100">
    Warn Message
  </p>
  <textarea
    class="mb-4 h-24 w-full resize-none rounded-md bg-pearl-lusta-200 p-2 font-brand text-lg text-pearl-lusta-950 dark:bg-stone-700 dark:text-white"
    placeholder="..."
    id="warn-message"></textarea>
</Modal>

<main class="flex w-screen h-screen justify-center items-center">
  <button on:click="{() => modal.open()}">click me</button>
</main>

