<script lang="ts">
  import IconClose from "~icons/tabler/X.svelte";
  import { fly } from "svelte/transition";
  import autoAnimate from "@formkit/auto-animate";

  let instance: HTMLDialogElement;
  let visible: boolean = false

  export function open() {
    visible = true
  }

  export function close() {
    visible = false
  }
</script>

{#if visible}
<div
  use:autoAnimate
  in:fly="{{ y: -200, duration: 500 }}"
  class="absolute justify-self-center bg-transparent backdrop:backdrop-blur-lg backdrop:brightness-75 backdrop:transition-all transition-all w-1/3">
  <div class="rounded-xl p-3 bg-pearl-lusta-200 dark:bg-stone-800">
    <form method="dialog">
      <button class="float-right text-pearl-lusta-950 dark:text-white"
        ><IconClose /></button>
    </form>
    <slot />
  </div>
</div>
{/if}
