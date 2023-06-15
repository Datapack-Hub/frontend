<script lang="ts">
  import IconClose from "~icons/tabler/X.svelte";
  import { fly } from "svelte/transition";
  import autoAnimate from "@formkit/auto-animate";

  let instance: HTMLDialogElement;

  export function open() {
    instance.showModal();
  }

  export function close() {
    instance.close();
  }
</script>

<dialog
  bind:this="{instance}"
  use:autoAnimate
  in:fly="{{ y: -200, duration: 500 }}"
  class="absolute bg-transparent backdrop:backdrop-blur-lg backdrop:brightness-75 backdrop:transition-all transition-all w-1/3">
  <div class="rounded-xl p-3 bg-pearl-lusta-200 dark:bg-stone-800">
    <form method="dialog">
      <button class="float-right text-pearl-lusta-950 dark:text-white"
        ><IconClose /></button>
    </form>
    <slot />
  </div>
</dialog>
