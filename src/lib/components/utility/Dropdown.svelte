<script lang="ts">
  import { sort } from "radash";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import IconUp from "~icons/tabler/ChevronUp.svelte";

  export let options: string[];
  export let selected = "";
  export let expand = false;
  export let selectedStyles = "";

  let dispatch = createEventDispatcher();

  $: longest = sort(options, index => index.length, true);

  function chooseOption(index: number) {
    selected = options[index];
    expand = false;
    dispatch("change", selected);
  }
</script>

<div class="relative w-max transition-all" on:pointerleave="{() => (expand = false)}">
  <button
    class="{selectedStyles}"
    on:keydown="{() => (expand = true)}"
    on:click="{() => (expand = !expand)}"
    style="width: {longest[0].length + 5}ch;">{selected}</button>
  <p
    aria-label="{expand ? 'Open' : 'Close'} dropdown"
    class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-sm dark:text-zinc-100 {expand
      ? 'rotate-180'
      : 'rotate-0'} transition-transform">
    <IconUp />
  </p>
  {#if expand}
    <ul
      out:fade="{{ duration: 100, delay: 0 }}"
      class="absolute z-30 border-2 border-slate-300 bg-slate-200 px-1.5 py-0.5 last:rounded-b-lg dark:border-zinc-700 dark:bg-zinc-800"
      style="width: {longest[0].length + 5}ch;">
      {#each options as opt, index}
        <li class="my-1">
          <button
            class="flex h-9 w-full cursor-pointer rounded-[4px] p-1.5 text-left hover:bg-dph-orange dark:text-zinc-100 dark:hover:bg-dph-orange
            {selected == options[index] ? 'dark:bg-zinc-700/70' : ''}"
            on:click="{() => chooseOption(index)}">{opt}</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
