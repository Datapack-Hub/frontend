import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGFM from "remark-gfm";
import RemarkLinkRewrite from "remark-link-rewrite";
import remarkMentions from "remark-mentions";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function processMarkdown(source: string): Promise<string> {
  const markdownProcessor = unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(RemarkLinkRewrite, {
      replacer: (url: string) => {
        if (new URL(url).host !== "datapackhub.net") {
          url =
            "https://datapackhub.net/linkout?url=" + encodeURIComponent(url);
        }
        return url;
      }
    })
    .use(remarkMentions, {
      usernameLink: (uname: string) => `https://datapackhub.net/user/${uname}`
    })
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeStringify);

  return markdownProcessor.process(source).then(String);
}
