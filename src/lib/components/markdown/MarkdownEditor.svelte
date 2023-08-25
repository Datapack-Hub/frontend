<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import MarkdownComponent from "./MarkdownRenderer.svelte";

  export let maxEditorLength = 1e4;
  export let classes = "";
  export let content = "";

  let tab = "editor";
  let remainingCharacters = maxEditorLength - content.length;

  let dispatch = createEventDispatcher();

  function calcRemaining() {
    remainingCharacters = maxEditorLength - content.length;
  }

  function input() {
    dispatch("input", content);
    calcRemaining();
  }
</script>

<div class="{classes} h-fit">
  <div class="mb-3 flex items-center space-x-1">
    <button
      role="tab"
      class="button-base text-slate-950 dark:text-slate-100 {tab === 'editor'
        ? 'bg-slate-400 dark:bg-zinc-500'
        : 'bg-slate-300 dark:bg-zinc-700'}"
      on:click="{() => (tab = 'editor')}">Edit</button>
    <button
      role="tab"
      class="button-base text-slate-950 dark:text-slate-100 {tab === 'preview'
        ? 'bg-slate-400 dark:bg-zinc-500'
        : 'bg-slate-300 dark:bg-zinc-700'}"
      on:click="{() => (tab = 'preview')}">Preview</button>
  </div>

  {#if tab === "editor"}
    <div>
      <textarea
        bind:value="{content}"
        maxlength="{maxEditorLength}"
        on:input="{input}"
        class="input h-64 w-full"></textarea>
      <p class="align-middle text-xs text-slate-950 dark:text-slate-100">
        {remainingCharacters} characters left
      </p>
    </div>
  {:else}
    <div class="input w-full">
      <MarkdownComponent source="{content}" />
    </div>
  {/if}
</div>
