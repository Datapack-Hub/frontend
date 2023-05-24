<script lang="ts">
  import DOMPurify from "isomorphic-dompurify";
  import { marked } from "marked";

  export let source = "";

  $: html = marked.parse(DOMPurify.sanitize(source, {
    FORBID_ATTR: ["style", "class", "placeholder", "src"],
    FORBID_TAGS: ["canvas", "svg", "iframe", "img"],
    ALLOWED_TAGS: ["details", "summary"]
  }), {
    async: true,
    breaks: true,
    gfm: true
  })
</script>

<div class="prose prose-stone leading-snug dark:prose-invert">
  {#await html then out}
    {@html out}
  {/await}
</div>
