
import { unified } from "unified"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import remarkMentions from "remark-mentions"
import remarkRehype from "remark-rehype"
import remarkParse from "remark-parse"
import { browser } from "$app/environment"

onmessage = message => {
  const [source, limited] = message.data;

  // const renderer = new Renderer();

  // renderer.link = (href, _, text) => {
  //   return href?.startsWith("https://datapackhub.net")
  //     ? `<a href="${href}" target="_blank" class="break-all">${text}</a>`
  //     : `<a href="https://datapackhub.net/linkout?url=${href}" class="break-all">${text}</a>`;
  // };

  // if (limited) {
  //   renderer.image = (_href, _title, text) => text;
  // }

  if (browser) {
    if (limited) console.log("limited");

    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .use(remarkMentions, {
        usernameLink: (uname) => `/user/${uname}`
      })
      .process(source).then(v => {
        postMessage(String(v));
      });
  }

};
