<script lang="ts">
  import { fly } from "svelte/transition";
  import IconClose from "~icons/tabler/X.svelte";

  let visible = false;

  export let wide= false;

  export function open() {
    visible = true;
  }

  export function close() {
    visible = false;
  }
</script>

{#if visible}
  <div class="absolute">
    <div
      class="fixed right-0 top-0 z-50 flex h-screen w-screen transform-gpu backdrop-blur-lg">
      <div
        in:fly="{{ y: 300 }}"
        class="relative m-auto {wide ? "w-1/2" : "w-1/3"} justify-self-center rounded-xl p-3 align-middle bg-slate-200 dark:bg-stone-800">
        <button
          class="float-right cursor-pointer select-none font-black text-slate-950 dark:text-white"
          on:click="{() => close()}"><IconClose /></button>
        <slot />
      </div>
    </div>
  </div>
{/if}
