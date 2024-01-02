<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import MarkdownComponent from "./MarkdownRenderer.svelte";
  import IconMD from "~icons/tabler/Markdown.svelte";
  import Tooltip from "../utility/Tooltip.svelte";

  export let maxEditorLength = 1e4;
  export let classes = "";
  export let content = "";
  export let name = "";
  export let disabledEditor = false;

  let tab = "editor";
  $: remainingCharacters = maxEditorLength - content.length;

  let dispatch = createEventDispatcher();

  function calcRemaining() {
    remainingCharacters = maxEditorLength - content.length;
  }

  function input() {
    dispatch("input");
    calcRemaining();
  }
</script>

<div class="{classes} h-fit">
  <div class="mb-3 flex items-center space-x-1">
    <button
      type="button"
      role="tab"
      class="button-base text-zinc-950 dark:text-zinc-100 {tab === 'editor'
        ? 'bg-slate-400 dark:bg-zinc-500'
        : 'bg-slate-300 dark:bg-zinc-700'}"
      on:click="{() => (tab = 'editor')}">Edit</button>
    <button
      type="button"
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
        {name}
        maxlength="{maxEditorLength}"
        on:input="{() => input}"
        class="input h-64 w-full font-mono"></textarea>
      <a
        href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
        class="absolute right-8 top-8 rounded-full bg-slate-800/70 p-1 transition-colors hover:text-blue-500 dark:text-zinc-100 dark:hover:text-blue-500">
        <Tooltip
          tooltipText="{'This input supports Markdown'}"
          classes="inline"
          placement="{'bottom'}">
          <IconMD />
        </Tooltip>
      </a>
      <p class="align-middle text-xs text-zinc-950 dark:text-zinc-100">
        {remainingCharacters} characters left
      </p>
    </div>
  {:else}
    {#if disabledEditor}
      <p class="text-zinc-950 dark:text-zinc-100">Disabled for security issues!</p>
    {:else}
      <div class="input w-full">
        <MarkdownComponent source="{content}" />
      </div>
    {/if}
  {/if}
</div>
