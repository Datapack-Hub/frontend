<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import MarkdownComponent from "./MarkdownComponent.svelte";
  import { fly } from "svelte/transition";

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
      class="button-base {tab === 'editor' ? 'bg-stone-600' : 'bg-stone-800'}"
      on:click="{() => (tab = 'editor')}">Edit</button>
    <button
      class="button-base {tab === 'preview' ? 'bg-stone-600' : 'bg-stone-800'}"
      on:click="{() => (tab = 'preview')}">Preview</button>
  </div>

  {#if tab === "editor"}
    <div transition:fly={{x: -320}}>
      <textarea
        bind:value="{content}"
        maxlength="{maxEditorLength}"
        on:input="{input}"
        class="input w-full h-64"></textarea>
      <p
        class="align-middle text-xs text-pearl-lusta-950 dark:text-pearl-lusta-100">
        {remainingCharacters} characters left
      </p>
    </div>
  {:else}
    <div class="input w-full" transition:fly={{x: -320}}>
      <MarkdownComponent source="{content}" />
    </div>
  {/if}
</div>
