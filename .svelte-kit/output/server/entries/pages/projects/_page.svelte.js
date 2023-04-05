import { c as create_ssr_component, i as is_promise, n as noop, d as each, v as validate_component } from "../../../chunks/index2.js";
import { P as ProjectComponent } from "../../../chunks/ProjectComponent.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data = [];
  async function load() {
  }
  return `<main class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64"><div class="items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-16 overflow-auto">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
            <p class="dark:text-white font-black">hi we r loading plz be patient the cat is being a jerk...</p>
        `;
    }
    return function() {
      return `
        <h1 class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2">Browse Datapacks</h1><br>
        <div class="flex items-center md-5"><p class="dark:text-white font-bold">Sort:</p>
            <a href="?sort=updated" class="ml-2 mr-2 bg-orange-600 rounded-lg p-1 font-semibold">Updated</a>
            <a href="?sort=trending" class="mr-2 text-orange-500 rounded-lg p-1 font-semibold bg-opacity-0 bg-orange-500 hover:bg-opacity-20">Trending</a></div>
        <div class="flex flex-col items-center w-full pu-5">${each(data ?? [], (project) => {
        return `${validate_component(ProjectComponent, "ProjectComponent").$$render($$result, { project }, {}, {})}`;
      })}</div>
        `;
    }();
  }(load())}</div></main>`;
});
export {
  Page as default
};
