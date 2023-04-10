import { c as create_ssr_component, o as onDestroy, a as subscribe, e as escape, b as add_attribute, v as validate_component } from "../../chunks/index3.js";
import { i as isDark, a as isAuthenticated, u as userData, b as apiURL } from "../../chunks/globals.js";
import { p as page } from "../../chunks/stores.js";
const ColorSchemeSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dark;
  let unsubscribeDark = isDark.subscribe((v) => {
    dark = v;
  });
  onDestroy(unsubscribeDark);
  return `<div class="z-20">${dark ? `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-0 md:ml-6 w-12 md:w-12 cursor-pointer hover:brightness-75"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-0 md:ml-6 cursor-pointer hover: brightness-200"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`}</div>`;
});
const tippy = "";
const ProfileNavComponent_svelte_svelte_type_style_lang = "";
const css = {
  code: ".admin-outline.svelte-1yjb8pi{outline-color:#ef4444\n}.admin-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.moderator-outline.svelte-1yjb8pi{outline-color:#f97316\n}.moderator-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}.developer-outline.svelte-1yjb8pi{outline-color:#84cc16\n}.developer-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(132 204 22 / var(--tw-text-opacity))\n}.helper-outline.svelte-1yjb8pi{outline-color:#3b82f6\n}.helper-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.nerd-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}.nerd-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}",
  map: null
};
const ProfileNavComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let $userData, $$unsubscribe_userData;
  let $$unsubscribe_page;
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  (async () => {
  })();
  $$result.css.add(css);
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_userData();
  $$unsubscribe_page();
  return `<a href="/" target="_self" class="flex items-center justify-center ml-6 z-50">${$isAuthenticated ? `${$userData.role != "default" ? `<a href="/moderation/console"><img src="/icons/moderation.svg" width="32" height="32" alt="wip" class="dark:invert z-20 mr-7"></a>` : ``}
    <img src="/icons/bell.svg" width="32" height="32" alt="wip" class="dark:invert z-20">
    <a href="${"/user/" + escape($userData.username, true)}"><img${add_attribute("src", $userData.profile_icon, 0)} alt="${escape($userData.username, true) + "'s profile picture"}" height="32" width="32" class="${"rounded-full outline outline-2 " + escape($userData.role, true) + "-outline outline-offset-2 ml-6 svelte-1yjb8pi"}"></a>` : `<a id="sign_in" href="${escape(apiURL, true) + "/auth/login"}" class="dark:text-red-400 text-red-500 dark:bg-red-400 bg-red-500 bg-opacity-30 dark:bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-1 md:py-2 text-md md:text-lg lg:text-xl hover:scale-110 transition-all border-2 dark:border-red-400 border-red-500 active:brightness-75">Sign in
    </a>`}
</a>`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="w-full fixed top-full -translate-y-full md:top-0 md:translate-y-0 transition-all px-8 md:px-16 lg:px-24 z-50"><div class="funky-gradient w-full"><div class="flex items-center mt-4 md:mt-0"><a href="/" class="flex items-center z-20 cursor-pointer"><img src="/logos/dph.svg" alt="logo" class="h-8 rounded-full hover:brightness-75 transition-all" height="32" width="32">
        <span class="dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 text-black font-brand font-bold text-2xl transition-colors hidden md:block">Datapack Hub
        </span></a>
      <a href="/projects" target="_self" class="pl-8 dark:text-white text-black text-lg font-brand font-light dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 z-20 transition-colors">Explore
      </a>
      <a href="/" target="_self" class="pl-4 dark:text-white text-black text-lg font-brand font-light dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 z-20 transition-colors">Create
      </a>
      <a href="https://discord.gg/aEXsdjjdu4" target="_self" class="pl-4 text-indigo-500 text-lg font-brand font-light hover:text-indigo-400 active:text-neutral-400 z-20 transition-colors">Discord
      </a></div>
    <div class="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">${validate_component(ColorSchemeSelector, "ColorSchemeSelector").$$render($$result, {}, {}, {})}
      ${validate_component(ProfileNavComponent, "ProfileNavComponent").$$render($$result, {}, {}, {})}</div></div></nav>`;
});
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isDark, $$unsubscribe_isDark;
  $$unsubscribe_isDark = subscribe(isDark, (value) => $isDark = value);
  $$unsubscribe_isDark();
  return `<div${add_attribute("class", $isDark ? " dark" : "", 0)}>${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
