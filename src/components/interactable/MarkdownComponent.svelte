<script lang="ts">
  import { marked } from "marked";
  import DOMPurify from "isomorphic-dompurify"
  
  export let placeholder: string | undefined;
  
  let text: string = "";
  $: output = marked.parse(DOMPurify.sanitize(text.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,""), {
    FORBID_ATTR: ['style','class'], FORBID_TAGS: ['style', 'script', 'iframe', 'svg', 'canvas']
  }))

</script>

<div class="">
  <textarea cols="30" rows="10" bind:value={text} spellcheck="false" placeholder="{placeholder}" ></textarea>
  <p class="text-white prose dark:prose-invert">{@html output}</p>
</div>