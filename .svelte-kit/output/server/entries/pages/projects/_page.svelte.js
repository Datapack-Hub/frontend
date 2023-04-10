import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "../../../chunks/index3.js";
import { P as ProjectComponent } from "../../../chunks/ProjectComponent.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="dark:bg-stone-900 bg-new-white transition-all px-8 md:px-16 lg:px-24"><div class="items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-16 overflow-auto"><h1 class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2">Browse Datapacks
      </h1>
      <br>
      <div class="flex items-center md-5"><p class="dark:text-white font-bold">Sort:</p>
        <a href="?sort=updated" class="${"btn-sm-start " + escape(
    data.sortMode == "updated" ? "bg-orange-500" : "bg-opacity-0 text-orange-500 bg-orange-500 hover:bg-opacity-20 transition-all",
    true
  )}">Updated</a>
        <a href="?sort=trending" class="${"btn-sm-start " + escape(
    data.sortMode == "trending" ? "bg-orange-500" : "bg-opacity-0 text-orange-500 bg-orange-500 hover:bg-opacity-20 transition-all",
    true
  )}">Trending</a></div>
      <div class="border-b-[1px] border-stone-700 mt-4"></div>
      <div class="flex flex-col items-center w-full mt-4">${data.projects ? `${each(data.projects, (project) => {
    return `${validate_component(ProjectComponent, "ProjectComponent").$$render($$result, { project }, {}, {})}`;
  })}` : ``}</div></div></main>`;
});
export {
  Page as default
};
