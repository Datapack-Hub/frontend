<script lang="ts">
  import { fly } from "svelte/transition";

  let instance: HTMLDialogElement

  let visible = false;
  export function open() {
    instance.show()
  }

  export function close() {
    instance.close()
  }
</script>

{#if visible}
  <dialog
    bind:this={instance}
    class="backdrop:blur-lg backdrop:transform-gpu">
    <div
      in:fly="{{ y: 300 }}"
      class="relative m-auto w-1/3 justify-self-center rounded-xl p-3 align-middle dark:bg-stone-800">
      <form method="dialog">
        <button
          class="float-right cursor-pointer select-none font-black text-pearl-lusta-950 dark:text-white"
          >X</button>
      </form>
      <slot />
    </div>
  </dialog>
{/if}
