import { c as create_ssr_component, b as add_attribute, e as escape } from "./index2.js";
const ProjectComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { project } = $$props;
  let author = "";
  (async () => {
    return;
  })();
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  return `<div class="dark:bg-stone-800 bg-white dark:text-white rounded-xl bg-cover flex my-1 items-center mx-2 w-full"><img${add_attribute("src", project.icon, 0)} alt="project icon" class="aspect-square bg-cover h-16 md:h-24 rounded-xl ml-4">
  <div class="p-1 md:p-2"><p class="ml-4 font-brand text-lg md:text-xl lg:text-2xl">${escape(project.title)}</p>
    <p class="ml-4 text-xs md:text-sm text-opacity-20">By ${escape(author)}</p>
    <p class="m-4 text-sm md:text-base font-medium">${escape(project.description)}</p></div></div>`;
});
export {
  ProjectComponent as P
};
