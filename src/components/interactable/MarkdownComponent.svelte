<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'

  export let placeholder: string | undefined;

  let source: string = "";
</script>

<div class="flex w-full justify-between">
  <textarea
    cols="30"
    rows="10"
    bind:value={source}
    spellcheck="false"
    {placeholder}
  />
  <div class="prose dark:prose-invert">
    <SvelteMarkdown {source}/>
  </div>
</div>
