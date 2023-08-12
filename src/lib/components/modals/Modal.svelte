<script lang="ts">
  import { fly } from "svelte/transition";
  import IconClose from "~icons/tabler/X.svelte";

  let visible = false;
  let innerWidth = 0;

  export let wide = false;

  export function open() {
    visible = true;
  }

  export function close() {
    visible = false;
  }

  $: isSmall = innerWidth < 1181;
</script>

<svelte:window bind:innerWidth />

{#if visible}
  <div class="absolute">
    <div
      class="fixed right-0 top-0 z-50 flex h-screen w-screen transform-gpu backdrop-blur-lg overflow-y-auto">
      <div
        in:fly="{{ y: 300 }}"
        class="relative m-auto {wide
          ? 'w-3/4'
          : isSmall
          ? 'w-2/3'
          : 'w-1/2'} justify-self-center rounded-xl p-3 align-middle bg-slate-200 dark:bg-zinc-800">
        <button
          class="float-right cursor-pointer select-none font-black text-slate-950 dark:text-white"
          on:click="{() => close()}"><IconClose /></button>
        <slot />
      </div>
    </div>
  </div>
{/if}
