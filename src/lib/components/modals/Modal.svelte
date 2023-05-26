<script lang="ts">
  import { fly } from "svelte/transition";
  import IconCross from "~icons/tabler/X.svelte";

  let visible = false;
  export function open() {
    visible = true;
  }

  export function close() {
    visible = false;
  }
</script>

{#if visible}
  <div
    class="fixed left-0 top-0 z-50 flex h-full w-full transform-gpu backdrop-blur-lg">
    <div
      in:fly="{{ y: 300 }}"
      class="relative m-auto w-1/3 justify-self-center rounded-xl p-3 align-middle dark:bg-stone-800">
      <button
        class="float-right cursor-pointer select-none font-black text-pearl-lusta-950 dark:text-white my-1"
        on:click="{() => close()}"><IconCross /></button>
      <slot />
    </div>
  </div>
{/if}
