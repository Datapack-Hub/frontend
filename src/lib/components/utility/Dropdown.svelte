<script lang="ts">
  import { sort } from "radash";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import IconUp from "~icons/tabler/ChevronUp.svelte";

  export let options: string[] = [];
  export let selected = "";
  // export let arrowStyles = ""

  let expand = false;
  let dispatch = createEventDispatcher();

  $: longest = sort(options, i => i.length, true);

  function chooseOption(i: number) {
    selected = options[i];
    expand = false;
    dispatch("change", selected);
  }
</script>

<div class="relative w-max transition-all">
  <button
    class="h-11 bg-zinc-800 p-2 text-left dark:text-slate-100 {expand
      ? 'rounded-tr-lg'
      : 'rounded-r-lg'}"
    on:keydown="{() => (expand = !expand)}"
    on:click="{() => (expand = !expand)}"
    style="width: {longest[0].length + 5}ch;">{selected}</button>
  <button
    class="absolute right-2 top-1/2 -translate-y-1/2 text-sm dark:text-slate-100 {expand
      ? 'rotate-180'
      : 'rotate-0'} transition-transform"
    on:keydown="{() => (expand = !expand)}"
    on:click="{() => (expand = !expand)}"><IconUp /></button>
  {#if expand}
    <ul
      out:fade="{{ duration: 100, delay: 0 }}"
      class="absolute z-30 border-2 border-zinc-700 bg-zinc-800 p-1 last:rounded-b-lg"
      style="width: {longest[0].length + 5}ch;">
      {#each options as opt, i}
        <li>
          <button
            class="w-full cursor-pointer rounded-[4px] p-2 text-left hover:bg-dph-orange dark:text-slate-100"
            on:click="{() => chooseOption(i)}">{opt}</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
