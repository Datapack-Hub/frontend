<script lang="ts">
  import { isDark } from "$lib/globals/stores";
  import { createSelect, melt } from "@melt-ui/svelte";
  import { createEventDispatcher } from "svelte";
  import type { Readable } from "svelte/store";
  import { fade } from "svelte/transition";
  import IconCheck from "~icons/tabler/Check.svelte";
  import IconUp from "~icons/tabler/ChevronDown.svelte";

  export let options: string[];
  export let label = "";
  export let emptyString: string;
  export let multi = false;
  // eslint-disable-next-line unicorn/no-useless-undefined
  export let name: string | undefined = undefined;
  // eslint-disable-next-line unicorn/no-useless-undefined
  export let defaultOption: string | undefined = undefined;

  const dispatch = createEventDispatcher();

  const {
    elements: { trigger, menu, option, label: meltLabel, hiddenInput },
    states: { selectedLabel, open },
    helpers: { isSelected }
  } = createSelect({
    forceVisible: true,
    positioning: {
      placement: "bottom",
      fitViewport: true,
      sameWidth: true
    },
    defaultSelected: {
      value: defaultOption,
      label: defaultOption
    },
    multiple: multi,
    name: name,
    onSelectedChange: s => {
      dispatch("change", s.next);
      return s.next;
    }
  });

  export const selected: Readable<string | string[]> = selectedLabel;
</script>

<div class="flex flex-col gap-1">
  <input type="text" use:melt="{$hiddenInput}">
  {#if label === ""}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="block text-black dark:text-white" use:melt="{$meltLabel}"
      >{label}</label>
  {/if}
  <button
    type="button"
    class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-slate-200 px-3 py-2 text-black
  shadow transition-opacity hover:opacity-90 dark:bg-zinc-800 dark:text-white"
    use:melt="{$trigger}"
    aria-label="Options">
    {$selectedLabel || emptyString}
    <IconUp class="square-5" />
  </button>
  {#if $open}
    <div
      class="{$isDark ? 'dark' : ''}"
      use:melt="{$menu}"
      transition:fade="{{ duration: 100 }}">
      <div
        class="z-10 flex flex-col
    overflow-y-auto rounded-lg bg-slate-200 p-1 shadow focus:!ring-0 dark:bg-zinc-800">
        {#each options as item}
          <div
            class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 hover:bg-slate-300
          focus:z-10
            data-[highlighted]:bg-slate-300
            data-[selected]:bg-dph-orange
            data-[highlighted]:text-black
            data-[selected]:text-white
            data-[disabled]:opacity-50
            dark:text-white dark:hover:bg-zinc-800 dark:data-[highlighted]:bg-zinc-700
            dark:data-[highlighted]:text-white"
            use:melt="{$option({ value: item, label: item })}">
            <div class="check {$isSelected(item) ? 'block' : 'hidden'}">
              <IconCheck class="square-4" />
            </div>

            {item}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .check {
    position: absolute;
    left: theme(spacing.2);
    top: 50%;
    z-index: theme(zIndex.20);
    translate: 0 calc(-50% + 1px);
  }
</style>
