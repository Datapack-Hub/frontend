<script lang="ts">
  import { createToggleGroup, melt } from "@melt-ui/svelte";
  import { toast } from "svelte-sonner";

  export let limit = 3;
  export let options: string[];
  export let selected: string | undefined;
  export let name = "";
  export let debug = false;

  const {
    elements: { root, item }
  } = createToggleGroup({
    type: "multiple",
    onValueChange: value => {
      return toggleClicked([...value.next!]);
    }
  });

  function toggleClicked(options: string[]) {
    if (options.length > limit) {
      toast.error("Too many!");
      options.pop();
      return options;
    }
    selected = options.toString();
    return options;
  }
</script>

<input {name} type="text" bind:value="{selected}" hidden="{!debug}" />
<div
  use:melt="{$root}"
  class="col-span-2 grid grid-cols-2 gap-3 rounded-lg md:grid-cols-3 lg:grid-cols-4">
  {#each options as option}
    <button
      use:melt="{$item(option)}"
      class="cursor-pointer select-none rounded-lg border-2
        border-slate-400 bg-slate-300 p-3 text-zinc-950 transition-all hover:border-dph-orange
        data-[state='on']:border-dph-orange data-[state='on']:bg-dph-orange/40 data-[state='on']:hover:brightness-75 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-dph-orange data-[state='on']:dark:bg-dph-orange/20"
      >{option}</button>
  {/each}
</div>
