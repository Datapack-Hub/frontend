<script lang="ts">
  import "../../../code-colors.css";

  import rehypeUrls from "@jsdevtools/rehype-url-inspector";
  import rehypeSanitize from "rehype-sanitize";
  import rehypeStringify from "rehype-stringify";
  import rehypeHighlight from "rehype-highlight";
  import remarkGFM from "remark-gfm";
  import remarkMentions from "remark-mentions";
  import remarkParse from "remark-parse";
  import remarkRehype from "remark-rehype";
  import { unified } from "unified";

  export let source: string;
  export let classes = "";

  $: html = "";

  let markdownProcessor = unified()
    .use(remarkParse)
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
    .use(rehypeHighlight)
    .use(rehypeStringify);

  $: markdownProcessor.process(source).then(md => {
    html = String(md);
  });
</script>

<!-- we have way too many classes -->
<!-- tailwind is so clean ._. -->
<div
  class="prose break-words
  leading-snug dark:prose-invert prose-a:break-all
  prose-a:underline
  prose-code:before:content-none prose-code:after:content-none
  prose-table:rounded-lg prose-table:bg-slate-300/40
  prose-th:p-3 prose-td:p-3 prose-img:py-3
  prose-table:dark:bg-zinc-700/40 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
