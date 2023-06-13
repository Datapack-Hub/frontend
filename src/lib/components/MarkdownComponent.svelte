<script lang="ts">
  import "highlight.js/styles/github-dark-dimmed.css";
  import DOMPurify from "isomorphic-dompurify";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let source: string | undefined = "";

  let html = "";

  onMount(async () => {
    if (browser) {
      const msp =  import("marked-smartypants");
      const marked = await import("marked")
      marked.marked.use(msp.markedSmartypants());
      if (!source) html = "";
      else {
        html = await marked.marked.parse(
          DOMPurify.sanitize(source, {
            FORBID_ATTR: ["style", "class", "placeholder", "src"],
            FORBID_TAGS: ["canvas", "svg", "iframe", "img"],
            ALLOWED_TAGS: ["details", "summary"]
          }),
          {
            async: true,
            breaks: true,
            gfm: true,
            mangle: false,
            headerIds: false
          }
        );
      }
    }
  });
</script>

<div
  class="prose prose-headings:mb-1 prose-p:my-2 prose-ul:my-2 prose-img:my-3 dark:prose-invert leading-snug">
  {@html html}
</div>
