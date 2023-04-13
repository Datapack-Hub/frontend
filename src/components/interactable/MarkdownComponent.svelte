<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import DOMPurify from 'isomorphic-dompurify'

  export let placeholder: string | undefined;

  let source = "";
  $: cleanedSource = DOMPurify.sanitize(source, {
    FORBID_ATTR: ['style', 'class', 'placeholder', 'src'],
    FORBID_TAGS: ['canvas', 'svg', 'iframe', 'img']
  })
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
    <SvelteMarkdown source={cleanedSource} />
  </div>
</div>
