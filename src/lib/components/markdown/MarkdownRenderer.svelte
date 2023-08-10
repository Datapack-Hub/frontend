<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import { unified } from "unified";
  import rehypeSanitize from "rehype-sanitize";
  import rehypeStringify from "rehype-stringify";
  import rehypeUrls from "@jsdevtools/rehype-url-inspector";
  import remarkMentions from "remark-mentions";
  import remarkRehype from "remark-rehype";
  import remarkParse from "remark-parse";
  import remarkGFM from "remark-gfm";

  export let source: string | undefined = "";
  export let classes = "";
  export let limitedMode = false;

  let html = "";

  let markdownProcessor = unified()
    .use(remarkParse)
    // .use(remarkDisable, { // out of date, find alternative or do not use
    //   block: [
    //     'indentedCode',
    //     'fencedCode',
    //     'atxHeading',
    //     'setextHeading',
    //     'footnote',
    //     'table',
    //     'custom_blocks'
    //   ],
    // })
    .use(remarkGFM)
    .use(remarkMentions, {
      usernameLink: (uname: string) => `https://datapackhub.net/user/${uname}`
    })
    .use(remarkRehype)
    .use(rehypeUrls, {
      inspectEach({ node, url }) {
        console.log(url);
        let props = node.properties!;
        if (node.tagName === "a" && new URL(url).host !== "datapackhub.net") {
          props.href = "https://datapackhub.net/linkout?url=" + url.toString();
        } else {
          props.href = url;
        }
      }
    })
    .use(rehypeSanitize)
    .use(rehypeStringify);

  onMount(async () => {
    if (!browser) {
      return;
    }
    if (source) {
      let md = await markdownProcessor.process(source);
      html = String(md);
    }
  });

  afterNavigate(() => {
    if (!browser) {
      return;
    }

    if (source) {
      markdownProcessor.process(source).then(v => {
        html = String(v);
      });
    }
  });
</script>

<div
  class="prose dark:prose-invert leading-snug break-words prose-table:bg-slate-300 prose-table:dark:bg-stone-800 prose-td:p-2 prose-th:p-2 prose-table:rounded-md prose-code:before:content-none prose-code:after:content-none prose-tbody:odd:bg-stone-600 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
