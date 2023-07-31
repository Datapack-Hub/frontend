import { marked, Renderer } from "marked";

onmessage = (msg) => {
  const [source, limited] = msg.data;

  const renderer = new Renderer();

  renderer.link = (href, _, text) => {
    if (!href?.startsWith("https://datapackhub.net")) {
      return `<a href="https://datapackhub.net/linkout?url=${href}" target="_blank">${text}</a>`;
    } else {
      return `<a href="${href}" target="_blank">${text}</a>`;
    }
  };

  if (limited) {
    renderer.image = (_href, _title, text) => text;
  }

  const compileFunc = limited ? marked.parseInline : marked.parse;

  postMessage(compileFunc(
    source,
    {
      renderer: renderer,
      breaks: true,
      mangle: false,
      headerIds: false,
    },
  ));
};
