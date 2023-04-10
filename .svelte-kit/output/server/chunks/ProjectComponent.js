import { c as create_ssr_component, e as escape, b as add_attribute } from "./index3.js";
const ProjectComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { project } = $$props;
  let author = "Loading...";
  let visible = false;
  (async () => {
    visible = true;
  })();
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  return `<div class="dark:bg-stone-800 bg-dark-white dark:text-white flex items-center rounded-xl my-1 w-full p-2"><a href="${"/project/" + escape(project.url, true)}" class=""><img${add_attribute("src", project.icon, 0)} alt="${escape(project.title, true) + " icon"}" class="aspect-square bg-cover rounded-lg w-24"></a>
    <div class="w-2/3 ml-4"><a href="${"/project/" + escape(project.url, true)}" class="font-brand text-lg md:text-xl lg:text-2xl hover:underline">${escape(project.title)}</a>
      ${visible ? `<a href="${"/user/" + escape(author.toLowerCase(), true)}" class="text-xs md:text-sm text-white text-opacity-40 hover:underline">By ${escape(author)}</a>` : ``}
      <p class="mt-2 text-sm md:text-base font-medium two-lines text-opacity-70 text-white">${escape(project.description)}</p></div></div>`;
});
export {
  ProjectComponent as P
};
