<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import { createEventDispatcher } from "svelte";
  import MarkdownComponent from "./MarkdownComponent.svelte";

  export let maxEditorLength = 2000;
  export let classes = "";
  export let content = "";

  let tab = "editor";

  let dispatch = createEventDispatcher();

  function input() {
    dispatch("input", content);
  }
</script>

<div class="{classes} h-fit" use:autoAnimate>
  <div class="flex items-center space-x-1.5 mb-3">
    <button
      class="button-base {tab === 'editor' ? 'bg-stone-600' : 'bg-stone-800'}"
      on:click="{() => (tab = 'editor')}">Edit</button>
    <button
      class="button-base {tab === 'preview' ? 'bg-stone-600' : 'bg-stone-800'}"
      on:click="{() => (tab = 'preview')}">Preview</button>
  </div>

  {#if tab === "editor"}
    <div>
      <textarea
        bind:value="{content}"
        maxlength="{maxEditorLength}"
        on:input="{input}"
        class="input w-full h-64"></textarea>
    </div>
  {:else}
    <div class="input w-full">
      <MarkdownComponent source="{content}" />
    </div>
  {/if}
</div>
