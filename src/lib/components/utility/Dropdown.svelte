<script lang="ts">
  import { sort } from "radash";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import IconUp from "~icons/tabler/ChevronUp.svelte"

  export let options: string[] = []
  export let selected = ""
  // export let arrowStyles = ""

  let expand = false;
  let dispatch = createEventDispatcher()

  $: longest = sort(options, i => i.length, true)

  function chooseOption(i: number) {
    selected = options[i]
    expand = false
    dispatch("change", selected)
  }
</script>

<div class="w-max transition-all relative">
  <button class="h-11 text-left p-2 bg-zinc-800 dark:text-slate-100 {expand ? "rounded-tr-lg" : "rounded-r-lg"}" on:keydown="{() => expand = !expand}" on:click="{() => expand = !expand}" style="width: {longest[0].length + 5}ch;">{selected}</button>
  <button class="absolute right-2 top-1/2 -translate-y-1/2 dark:text-slate-100 text-sm {expand ? "rotate-180" : "rotate-0"} transition-transform" on:keydown="{() => expand = !expand}" on:click="{() => expand = !expand}"><IconUp/></button>
  {#if expand}
    <ul out:fade={{duration:100, delay: 0}} class="border-2 border-zinc-700 last:rounded-b-lg p-1 bg-zinc-800 absolute z-30" style="width: {longest[0].length + 5}ch;">
      {#each options as opt, i}
        <li><button class="hover:bg-dph-orange rounded-[4px] cursor-pointer dark:text-slate-100 w-full p-2 text-left" on:click="{() => chooseOption(i)}">{opt}</button></li>
      {/each}
    </ul>
  {/if}
</div>
