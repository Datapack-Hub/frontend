<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";

  export let source: string | undefined = "";
  export let classes: string = ""

  let html = "";

  onMount(async () => {
    if (!browser) {
      return;
    }
    const DOMPurify = await import("isomorphic-dompurify");
    const msp = await import("marked-smartypants");
    const marked = await import("marked");
    marked.marked.use(msp.markedSmartypants());
    if (!source) html = "";
    else {
      html = await marked.marked.parse(
        DOMPurify.sanitize(source.replace("\n", "\\n").replace(/http(s)?/, "https://datapackhub.net/link_warning?url=https"), {
          FORBID_ATTR: ["style", "class", "placeholder", "src"],
          FORBID_TAGS: ["canvas", "svg", "iframe"],
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
  });

  afterNavigate(async () => {
    if (!browser) {
      return;
    }
    const DOMPurify = await import("isomorphic-dompurify");
    const msp = await import("marked-smartypants");
    const marked = await import("marked");
    marked.marked.use(msp);
    if (!source) html = "";
    else {
      html = await marked.marked.parse(
        DOMPurify.sanitize(source.replace(/http(s)?/, "https://datapackhub.net/link_warning?url=https"), {
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
  });
</script>

<div
  class="prose prose-headings:mb-1 prose-p:my-2 prose-ul:my-2 prose-img:my-3 dark:prose-invert leading-snug break-words {classes}">
  {@html html}
</div>
