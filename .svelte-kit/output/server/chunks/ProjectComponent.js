import { c as create_ssr_component, e as escape, b as add_attribute } from "./index2.js";
const ProjectComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { project } = $$props;
  let author = "Loading...";
  let visible = false;
  (async () => {
    visible = true;
  })();
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  return `<div class="dark:bg-stone-800 bg-dark-white dark:text-white rounded-xl bg-cover flex my-1 items-center mx-2 w-full"><a href="${"/project/" + escape(project.url, true)}"><img${add_attribute("src", project.icon, 0)} alt="project icon" class="aspect-square bg-cover h-16 md:h-24 rounded-xl ml-4 mr-8"></a>
  <div class="p-1 md:p-2"><a href="${"/project/" + escape(project.url, true)}" class="ml-4 font-brand text-lg md:text-xl lg:text-2xl">${escape(project.title)}</a>
    ${visible ? `<a href="${"/user/" + escape(author.toLowerCase(), true)}" class="ml-4 text-xs md:text-sm text-opacity-20">By ${escape(author)}</a>` : ``}
    <p class="m-4 text-sm md:text-base font-medium">${escape(project.description)}</p></div></div>`;
});
export {
  ProjectComponent as P
};
