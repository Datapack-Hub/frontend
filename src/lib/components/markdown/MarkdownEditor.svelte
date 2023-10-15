<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import MarkdownComponent from "./MarkdownRenderer.svelte";
  import IconMD from "~icons/tabler/Markdown.svelte";
  import tippy from "sveltejs-tippy";

  export let maxEditorLength = 1e4;
  export let classes = "";
  export let content = "";
  export let name = "";

  let tab = "editor";
  let remainingCharacters = maxEditorLength - content.length;

  let dispatch = createEventDispatcher();

  function calcRemaining() {
    remainingCharacters = maxEditorLength - content.length;
  }

  let markdownTip = {
    content: "This input supports Markdown",
    placement: "bottom"
  };

  function input() {
    dispatch("input", content);
    calcRemaining();
  }
</script>

<div class="{classes} h-fit">
  <div class="mb-3 flex items-center space-x-1">
    <button
      role="tab"
      class="button-base text-zinc-950 dark:text-zinc-100 {tab === 'editor'
        ? 'bg-slate-400 dark:bg-zinc-500'
        : 'bg-slate-300 dark:bg-zinc-700'}"
      on:click="{() => (tab = 'editor')}">Edit</button>
    <button
      role="tab"
      class="button-base text-zinc-950 dark:text-zinc-100 {tab === 'preview'
        ? 'bg-slate-400 dark:bg-zinc-500'
        : 'bg-slate-300 dark:bg-zinc-700'}"
      on:click="{() => (tab = 'preview')}">Preview</button>
  </div>

  {#if tab === "editor"}
    <div class="relative">
      <textarea
        bind:value="{content}"
        name={name}
        maxlength="{maxEditorLength}"
        on:input="{input}"
        class="input h-64 w-full"></textarea>
      <a
        use:tippy="{markdownTip}"
        href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
        class="absolute right-4 top-4 rounded-full bg-slate-800/70 p-1 transition-colors hover:text-blue-500 dark:text-zinc-100 dark:hover:text-blue-500"
        ><IconMD /></a>
      <p class="align-middle text-xs text-zinc-950 dark:text-zinc-100">
        {remainingCharacters} characters left
      </p>
    </div>
  {:else}
    <div class="input w-full">
      <MarkdownComponent source="{content}" />
    </div>
  {/if}
</div>
