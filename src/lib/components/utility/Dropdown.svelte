<script lang="ts">
  import { sort } from "radash";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import IconUp from "~icons/tabler/ChevronUp.svelte";
  import IconCheck from "~icons/tabler/Check.svelte";

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
      class="absolute z-30 bg-slate-200 last:rounded-b-lg dark:bg-zinc-800 border border-black/20 dark:border-white/20 gap-3"
      style="width: {longest[0].length + 5}ch;">
      {#each options as opt, index}
        <li>
          <button
            class="flex justify-between items-center h-10 w-full cursor-pointer p-3 text-left hover:bg-dph-orange dark:text-zinc-100
            {selected == options[index] ? 'dark:bg-dph-orange/10' : ''}"
            on:click="{() => chooseOption(index)}">
            {opt}
            {#if selected == options[index]}
              <IconCheck/>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
