<script lang="ts">
  import MarkdownRenderer from "$lib/components/markdown/MarkdownRenderer.svelte";
  import Select from "$lib/components/utility/Select.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let selections: string[] = [];

  let content: { title: string | undefined; content: string };

  for (const v of data.content) {
    selections.push(v.title || "ERROR");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function change(event: CustomEvent<any>) {
    content = data.content.find(v => event.detail.label == v.title) || {
      title: "",
      content: ""
    };
  }
</script>

<div class="flex flex-col gap-3 px-0 py-32 md:px-16 lg:px-24">
  <Select
    options="{selections}"
    label="Page"
    emptyString="Choose a page!"
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
