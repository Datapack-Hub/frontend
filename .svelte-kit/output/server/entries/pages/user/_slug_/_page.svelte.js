import { c as create_ssr_component, a as subscribe, i as is_promise, n as noop, e as escape, b as add_attribute, d as each, v as validate_component } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as ProjectComponent } from "../../../../chunks/ProjectComponent.js";
import { a as isAuthenticated, u as userData } from "../../../../chunks/globals.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".admin-outline.svelte-1ie1bbt{outline-color:#ef4444\n}.admin-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.moderator-outline.svelte-1ie1bbt{outline-color:#f97316\n}.moderator-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}.developer-outline.svelte-1ie1bbt{outline-color:#84cc16\n}.developer-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(132 204 22 / var(--tw-text-opacity))\n}.helper-outline.svelte-1ie1bbt{outline-color:#3b82f6\n}.helper-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.default-outline.svelte-1ie1bbt{outline-color:#eab308\n}.default-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}",
  map: null
};
function titleCase(str) {
  if (str == void 0)
    return "null";
  return str.toLowerCase().split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  let data = { profile: null, projects: null };
  async function load() {
  }
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_userData();
  return `${$$result.head += `<!-- HEAD_svelte-1ovvbrx_START -->${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function() {
      return `
    ${$$result.title = `<title>${escape(data.profile?.username)} | Datapack Hub</title>`, ""}
  `;
    }();
  }(load())}<!-- HEAD_svelte-1ovvbrx_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64"><div class="flex flex-col items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-32"><div class="flex flex-col items-center md:items-start">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
        <p>Loading</p>
      `;
    }
    return function() {
      return `
        <img${add_attribute("src", data.profile?.profile_icon, 0)} alt="${escape(data.profile?.username, true) + "'s profile picture"}" height="128" width="128" class="${"md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full outline outline-2 " + escape(data.profile?.role, true) + "-outline outline-offset-4 mr-6 svelte-1ie1bbt"}">

        <p class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8">${escape(data.profile?.username)}</p>

        <p class="dark:text-white sm:text-base md:text-lg font-brand font-bold">${`<span class="${escape(data.profile?.role, true) + "-text svelte-1ie1bbt"}">⬤ ${escape(titleCase(data.profile?.role))}</span>`}</p>
        <p class="whitespace-pre-line dark:bg-stone-700 dark:bg-opacity-40 bg-opacity-40 bg-white mb-2 rounded-xl p-2 dark:text-white text-lg mt-4 font-brand font-light">${escape(data.profile?.bio.replaceAll("\\n", "\n"))}</p>
        ${$isAuthenticated && $userData.id === data.profile?.id ? `<a href="edit" class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 md:py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2"><img src="../icons/settings.svg" alt="settings" width="24" height="24" class="float-left invert mr-2 max-w-sm stroke-red-400">
            Profile Settings
          </a>` : ``}
      `;
    }();
  }(load())}</div>
    <div class="w-full mx-24 h-full overflow-auto md:overflow-y-auto mt-16 md:mt-0 styled-scrollbar">${`${each([], (project) => {
    return `${validate_component(ProjectComponent, "ProjectComponent").$$render($$result, { project }, {}, {})}`;
  })}`}</div></div>
</main>`;
});
export {
  Page as default
};
