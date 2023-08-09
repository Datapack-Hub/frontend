<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import { unified } from "unified"
  import rehypeSanitize from "rehype-sanitize"
  import rehypeStringify from "rehype-stringify"
  import remarkMentions from "remark-mentions"
  import remarkRehype from "remark-rehype"
  import remarkParse from "remark-parse"
  import remarkGFM from "remark-gfm"
  import remarkUnlink from "remark-unlink"
  // import MKDWorker from "./markdown.worker?worker";

  export let source: string | undefined = "";
  export let classes = "";
  export let limitedMode = false;

  let html = "";

  let thing = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .use(remarkGFM)
      .use(remarkMentions, {
        usernameLink: (uname) => `/user/${uname}`
      })

  onMount(async () => {
    if (!browser) {
      return;
    }
    if(source) {
      let md = await thing.process(source)
      html = String(md)
    }
  });

  afterNavigate(() => {
    if (!browser) {
      return;
    }

    if(source) {
      thing
        .process(source)
        .then(v => {
          html = String(v)
        })
    }
  });
</script>

<div
  class="prose dark:prose-invert leading-snug break-words prose-table:bg-slate-300 prose-table:dark:bg-stone-800 prose-td:p-2 prose-th:p-2 prose-table:rounded-md prose-code:before:content-none prose-code:after:content-none prose-tbody:odd:bg-stone-600 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
