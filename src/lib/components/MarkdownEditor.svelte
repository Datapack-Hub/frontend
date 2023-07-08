<script lang="ts">
  import { fly } from "svelte/transition";
  import MarkdownComponent from "./MarkdownComponent.svelte";
  import { createEventDispatcher } from "svelte";

  export let maxEditorLength = 2000;
  export let classes = "";
  export let content = "";

  let tab = "editor";

  let dispatch = createEventDispatcher();

  function input() {
    dispatch("input", content);
  }
</script>

<div class="{classes}">
  <div class="flex items-center space-x-1.5 mb-3">
    <button
      class="button-base {tab === 'editor' ? 'bg-stone-600' : 'bg-stone-800'}"
      on:click="{() => (tab = 'editor')}">Edit</button>
    <button
      class="button-base {tab === 'preview' ? 'bg-stone-600' : 'bg-stone-800'}"
      on:click="{() => (tab = 'preview')}">Preview</button>
  </div>

  {#if tab === "editor"}
    <div transition:fly="{{ x: -320 }}">
      <textarea
        bind:value="{content}"
        maxlength="{maxEditorLength}"
        on:input="{input}"
        class="input w-full h-64"></textarea>
    </div>
  {:else}
    <div transition:fly="{{ x: -320 }}" class="input w-full">
      <MarkdownComponent source="{content}" />
    </div>
  {/if}
</div>
