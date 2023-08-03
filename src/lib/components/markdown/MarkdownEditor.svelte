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
  <div class="flex items-center space-x-1.5 mb-3">
    <button
      role="tab"
      class="button-base {tab === 'editor'
        ? 'bg-slate-400 dark:bg-stone-500'
        : 'bg-slate-300 dark:bg-stone-700'}"
      on:click="{() => (tab = 'editor')}">Edit</button>
    <button
      role="tab"
      class="button-base {tab === 'preview'
        ? 'bg-slate-400 dark:bg-stone-500'
        : 'bg-slate-300 dark:bg-stone-700'}"
      on:click="{() => (tab = 'preview')}">Preview</button>
  </div>

  {#if tab === "editor"}
    <div>
      <textarea
        bind:value="{content}"
        maxlength="{maxEditorLength}"
        on:input="{input}"
        class="input w-full h-64"></textarea>
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