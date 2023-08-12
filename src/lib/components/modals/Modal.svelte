<script lang="ts">
  import { fly } from "svelte/transition";
  import IconClose from "~icons/tabler/X.svelte";

  let visible = false;
  let innerWidth = 0;

  export let wide = false;
  export let title: string|undefined = undefined;

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
          : 'w-1/2'} justify-self-center">
        {#if title}
        <div class="dark:bg-zinc-900 p-3 rounded-t-xl flex items-center">
          <h2 class="dark:text-white font-bold text-lg">{title}</h2>
          <div class="flex-grow"></div>
          <button
          class="cursor-pointer select-none font-black text-slate-950 dark:text-white"
          on:click="{() => close()}"><IconClose /></button>
        </div>
        {/if}
        <div class="dark:bg-zinc-800 p-3 {title ? "rounded-b-xl" : "rounded-xl"}">
          {#if !title}
          <button
          class="float-right cursor-pointer select-none font-black text-slate-950 dark:text-white"
          on:click="{() => close()}"><IconClose /></button>
          {/if}
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}
