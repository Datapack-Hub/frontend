<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import rehypeUrls from "@jsdevtools/rehype-url-inspector";
  import rehypeSanitize from "rehype-sanitize";
  import rehypeStringify from "rehype-stringify";
  import remarkGFM from "remark-gfm";
  import remarkMentions from "remark-mentions";
  import remarkParse from "remark-parse";
  import remarkRehype from "remark-rehype";
  import { unified } from "unified";

  export let source: string = "";
  export let classes = "";

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
        let properties = node.properties!;
        properties.href =
          node.tagName === "a" && new URL(url).host !== "datapackhub.net"
            ? "https://datapackhub.net/linkout?url=" + encodeURIComponent(url)
            : url;
      }
    })
    .use(rehypeSanitize)
    .use(rehypeStringify);

  $: html = ""

  markdownProcessor.process(source).then(md => {
    html = String(md)
  });
</script>

<div
  use:autoAnimate
  class="prose dark:prose-invert leading-snug break-words prose-a:break-all prose-table:bg-slate-300 prose-table:dark:bg-zinc-800 prose-td:p-2 prose-th:p-2 prose-table:rounded-md prose-code:before:content-none prose-code:after:content-none prose-tbody:odd:bg-zinc-600 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
