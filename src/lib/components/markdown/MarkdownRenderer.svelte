<script lang="ts">
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
    .use(remarkParse) // ignore these errors plz
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

  $: html = "";

  markdownProcessor.process(source).then(md => {
    html = String(md);
  });
</script>

<div
  class="prose-tbody:odd:bg-zinc-600 prose break-words leading-snug dark:prose-invert prose-p:my-4 prose-a:break-all prose-code:before:content-none prose-code:after:content-none prose-table:rounded-md prose-table:bg-slate-300 prose-th:p-3 prose-td:p-3 prose-img:py-3 prose-table:dark:bg-zinc-800 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
