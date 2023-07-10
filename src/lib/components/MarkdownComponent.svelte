<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";

  export let source: string | undefined = "";
  export let classes = "";

  let html = "";

  async function renderMarkdown(str: string) {
    const DOMPurify = await import("isomorphic-dompurify");
    const marked = await import("marked");

    const renderer = new marked.Renderer();

    renderer.link = (href, _, text) => {
      if (!href?.startsWith("https://datapackhub.net")) {
        return `<a href="https://datapackhub.net/linkout?url=${href}" target="_blank">${text}</a>`;
      } else {
        return `<a href="${href}" target="_blank">${text}</a>`;
      }
    };

    return marked.marked(
      DOMPurify.sanitize(
        // eslint-disable-next-line no-misleading-character-class
        str.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""),
        {
          FORBID_ATTR: ["style", "class", "placeholder", "src"],
          FORBID_TAGS: ["canvas", "svg", "iframe"],
          ALLOWED_TAGS: ["details", "summary"]
        }
      ),
      {
        renderer: renderer,
        async: true,
        breaks: true,
        mangle: false,
        headerIds: false
      }
    );
  }

  onMount(async () => {
    if (!browser) {
      return;
    }
    const msp = await import("marked-smartypants");
    const marked = await import("marked");

    marked.marked.use(msp.markedSmartypants());

    if (!source) html = "";
    else {
      html = await renderMarkdown(source);
    }
  });

  afterNavigate(async () => {
    if (!browser) {
      return;
    }

    const msp = await import("marked-smartypants");
    const marked = await import("marked");

    marked.marked.use(msp.markedSmartypants());

    if (!source) html = "";
    else {
      html = await renderMarkdown(source);
    }
  });
</script>

<div
  class="prose dark:prose-invert leading-snug break-words prose-table:bg-pearl-lusta-300 prose-table:dark:bg-stone-800 prose-td:p-2 prose-th:p-2 prose-table:rounded-md prose-tbody:odd:bg-stone-600 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
