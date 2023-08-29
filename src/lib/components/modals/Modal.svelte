<script lang="ts">
  import { windowWidth } from "$lib/globals/stores";
  import { quartOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import IconClose from "~icons/tabler/X.svelte";

  let visible = false;

  export let wide = false;
  export let title: string | undefined = undefined;

  export function open() {
    visible = true;
  }

  export function close() {
    visible = false;
  }

  $: isSmall = $windowWidth < 1181;
</script>

{#if visible}
  <div class="absolute">
    <div
      class="fixed right-0 top-0 z-50 flex h-screen w-screen transform-gpu overflow-y-auto backdrop-blur-lg backdrop-brightness-75">
      <div
        in:fly="{{ x: -300, easing: quartOut }}"
        class="relative m-auto {wide
          ? 'w-3/4'
          : (isSmall
          ? 'w-2/3'
          : 'w-1/2')} justify-self-center">
        {#if title}
          <div
            class="flex items-center rounded-t-xl bg-slate-300 p-3 dark:bg-zinc-900">
            <h2 class="text-lg font-bold dark:text-white">{title}</h2>
            <div class="flex-grow"></div>
            <button
              class="cursor-pointer select-none font-black text-slate-950 dark:text-white"
              on:click="{() => close()}"><IconClose /></button>
          </div>
        {/if}
        <div
          class="bg-slate-200 p-3 dark:bg-zinc-800 {title
            ? 'rounded-b-xl'
            : 'rounded-xl'}">
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
