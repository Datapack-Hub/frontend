<script lang="ts">
  import { marked } from "marked";
  import DOMPurify from "isomorphic-dompurify";
  import { browser } from "$app/environment";

  export let placeholder: string | undefined;

  let text: string = "";
  $: output = "";

  if (browser) {
    output = marked.parse(text.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""));
  }
</script>

<div class="">
  <textarea
    cols="30"
    rows="10"
    bind:value={text}
    spellcheck="false"
    {placeholder}
  />
  <p class="text-white prose dark:prose-invert">
    {@html DOMPurify.sanitize(output, {
      FORBID_ATTR: ["style", "class"],
      FORBID_TAGS: ["style", "script", "iframe", "svg", "canvas"],
    })}
  </p>
</div>
