<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import DOMPurify from "isomorphic-dompurify";

  export let source = "";

  $: cleanedSource = DOMPurify.sanitize(source, {
    FORBID_ATTR: ["style", "class", "placeholder", "src"],
    FORBID_TAGS: ["canvas", "svg", "iframe", "img"],
    ALLOWED_TAGS: ["details", "summary"]
  });
</script>

<div class="prose prose-stone leading-snug dark:prose-invert">
  <SvelteMarkdown source="{cleanedSource}" />
</div>
