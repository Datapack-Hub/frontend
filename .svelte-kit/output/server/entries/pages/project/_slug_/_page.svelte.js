import { c as create_ssr_component, e as escape, b as add_attribute } from "../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let visible = false;
  let author = "Loading...";
  (async () => {
    visible = true;
  })();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1p1nz4t_START -->${$$result.title = `<title>${escape(data.project?.title)} | Datapack Hub</title>`, ""}<!-- HEAD_svelte-1p1nz4t_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-0 sm:px-8 md:px-16 lg:px-24 h-screen"><div class="pt-16"></div>
  <div class="flex w-full dark:bg-new-white bg-dark-white dark:bg-opacity-10 p-4 rounded-xl mt-12"><img${add_attribute("src", data.project?.icon, 0)} alt="${"Icon for " + escape(data.project?.title, true)}" class="rounded-lg mr-6 w-24 h-24">
    <div><h1 class="dark:text-white text-5xl font-brand font-black">${escape(data.project?.title)}</h1>
      ${visible ? `<h2 class="dark:text-white text-xl mt-4 transition-all font-brand font-bold">${escape(author)}</h2>` : ``}
      <h2 class="dark:text-white text-md transition-all font-brand">${escape(data.project?.description)}</h2></div></div>
  <div class="dark:bg-new-white bg-dark-white dark:bg-opacity-10 p-4 rounded-xl mt-8"><p class="dark:text-white text-lg font-brand font-light">${escape(data.project?.body)}</p></div></main>`;
});
export {
  Page as default
};
