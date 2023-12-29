<script lang="ts">
  import { processMarkdown } from "$lib/globals/markdown";
  import RawMarkdownRenderer from "./RawMarkdownRenderer.svelte";

  export let source: string;
  export let classes = "";

  $: html = "";

  $: processMarkdown(source).then(md => {
    html = md;
  });
</script>

<RawMarkdownRenderer {html} {classes} />
