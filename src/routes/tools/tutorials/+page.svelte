<script lang="ts">
  import MarkdownRenderer from "$lib/components/markdown/MarkdownRenderer.svelte";
  import Dropdown from "$lib/components/utility/Dropdown.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let selections: string[] = [];
  let page = ""
  let expanded = false

  let content: {title: string | undefined, content: string}

  for (const v of data.content) {
    selections.push(v.title || "ERROR");
  }

  function change() {
    content = data.content.find(v => page == v.title) || {title: "", content: ""}
  }
</script>

<div class="flex flex-col gap-3 px-0 py-32 md:px-16 lg:px-24">
  <Dropdown
    options="{selections}"
    bind:selected="{page}"
    bind:expand="{expanded}"
    selectedStyles="h-11 bg-slate-200 dark:bg-zinc-800 p-3 text-left dark:text-zinc-100 {expanded
      ? 'rounded-tr-lg'
      : 'rounded-r-lg'}"
    on:change="{change}" />
  {#if content != undefined}
    <div class="rounded-2xl bg-zinc-800 dark:text-white">
      <div class="rounded-t-2xl bg-zinc-950/70 p-3">
        <p>{content.title}</p>
      </div>
      <MarkdownRenderer source="{content.content}" classes="mt-3 p-3" />
    </div>
  {/if}
</div>
