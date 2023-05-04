<script lang="ts">
  import { fly } from "svelte/transition";

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
    in:fly="{{ y: 300 }}"
    class="fixed left-0 top-0 flex h-screen w-screen backdrop-blur-lg">
    <div
      class="relative m-auto w-1/3 justify-self-center rounded-xl p-3 align-middle dark:bg-stone-800">
      <button
        class="float-right cursor-pointer select-none font-black dark:text-white"
        on:click="{() => close()}">X</button>
      <slot />
    </div>
  </div>
{/if}
