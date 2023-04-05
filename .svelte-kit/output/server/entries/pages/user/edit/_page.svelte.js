import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute } from "../../../../chunks/index2.js";
import { u as userData } from "../../../../chunks/globals.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".admin-outline.svelte-1ie1bbt{outline-color:#ef4444\n}.admin-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.moderator-outline.svelte-1ie1bbt{outline-color:#f97316\n}.moderator-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}.developer-outline.svelte-1ie1bbt{outline-color:#84cc16\n}.developer-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(132 204 22 / var(--tw-text-opacity))\n}.helper-outline.svelte-1ie1bbt{outline-color:#3b82f6\n}.helper-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.default-outline.svelte-1ie1bbt{outline-color:#eab308\n}.default-text.svelte-1ie1bbt{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  $$result.css.add(css);
  $$unsubscribe_userData();
  return `${$$result.head += `<!-- HEAD_svelte-10ozo3h_START -->${$$result.title = `<title>Profile Settings | Datapack Hub</title>`, ""}<!-- HEAD_svelte-10ozo3h_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64"><div class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"><h1 class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-10">Profile Settings for <span class="${escape($userData.role, true) + "-text svelte-1ie1bbt"}">${escape($userData.username)}</span></h1>
    <div class="align-middle text-center md:text-start"><p class="align-middle dark:text-new-white font-brand">Username</p>
      <input class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-10 text-lg p-2 font-brand"${add_attribute("value", $userData.username, 0)}>
      <br><br>
      <p class="align-middle dark:text-new-white font-brand">Bio</p>
      <textarea class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-40 w-80 text-lg p-2 font-brand resize-none">${escape($userData.bio.replaceAll("\\n", "\n"), false)}</textarea>
      <br><br>
      <a href="${escape($userData.username, true) + "/edit/"}" class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 md:py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2">Save Changes
      </a></div></div>
</main>`;
});
export {
  Page as default
};
