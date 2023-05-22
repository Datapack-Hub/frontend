<script lang="ts">
  import MarkdownIt from "markdown-it";
  import mdSpoiler from "@traptitech/markdown-it-spoiler";
  import { onMount } from "svelte";

  export let source: string | undefined;
  let compiledSource = "";

  onMount(() => {
    let md = MarkdownIt({
      breaks: true,
      linkify: true
    }).use(mdSpoiler);

    if (source) compiledSource = md.render(source);
  });
</script>

<p class="prose prose-stone leading-snug dark:prose-invert">
  {@html compiledSource}
</p>
