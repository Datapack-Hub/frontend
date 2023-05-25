<script lang="ts">
  import DOMPurify from "isomorphic-dompurify";
  import { marked } from "marked";
  import { markedSmartypants } from "marked-smartypants";
  import { markedHighlight } from "marked-highlight";
  import hljs from "highlight.js/lib/common";
  import "highlight.js/styles/github-dark-dimmed.css";
  import { onMount } from "svelte";

  export let source = "";

  let html = "";

  onMount(async () => {
    // marked.use(markedHighlight({
    //   langPrefix: 'hljs language-',
    //   highlight(code, lang) {
    //     const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    //     return hljs.highlight(code, { language }).value;
    //   }
    // }), markedSmartypants());

    html = await marked.parse(
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
  });
</script>

<div class="prose prose-stone leading-snug dark:prose-invert">
  {@html html}
</div>
