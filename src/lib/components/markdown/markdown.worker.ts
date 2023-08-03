import { marked, Renderer } from "marked";

onmessage = message => {
  const [source, limited] = message.data;

  const renderer = new Renderer();

  renderer.link = (href, _, text) => {
    return href?.startsWith("https://datapackhub.net")
      ? `<a href="${href}" target="_blank" class="break-all">${text}</a>`
      : `<a href="https://datapackhub.net/linkout?url=${href}" target="_blank" class="break-all">${text}</a>`;
  };

  if (limited) {
    renderer.image = (_href, _title, text) => text;
  }

  const compileFunction = limited ? marked.parseInline : marked.parse;

  postMessage(
    compileFunction(source, {
      renderer: renderer,
      breaks: true,
      mangle: false,
      headerIds: false
    })
  );
};
