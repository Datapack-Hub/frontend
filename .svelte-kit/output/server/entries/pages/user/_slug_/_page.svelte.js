import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component, d as each } from "../../../../chunks/index3.js";
import { a as isAuthenticated, u as userData } from "../../../../chunks/globals.js";
import { P as ProjectComponent } from "../../../../chunks/ProjectComponent.js";
const ProfileCard_svelte_svelte_type_style_lang = "";
const css = {
  code: ".admin-outline.svelte-1yjb8pi{outline-color:#ef4444\n}.admin-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.moderator-outline.svelte-1yjb8pi{outline-color:#f97316\n}.moderator-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}.developer-outline.svelte-1yjb8pi{outline-color:#84cc16\n}.developer-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(132 204 22 / var(--tw-text-opacity))\n}.helper-outline.svelte-1yjb8pi{outline-color:#3b82f6\n}.helper-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.nerd-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}.nerd-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-outline.svelte-1yjb8pi{outline-color:#eab308\n}.default-text.svelte-1yjb8pi{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}",
  map: null
};
function titleCase(str) {
  if (str == void 0)
    return "null";
  return str.toLowerCase().split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}
const ProfileCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  let { profileData } = $$props;
  if ($$props.profileData === void 0 && $$bindings.profileData && profileData !== void 0)
    $$bindings.profileData(profileData);
  $$result.css.add(css);
  $$unsubscribe_isAuthenticated();
  $$unsubscribe_userData();
  return `<div class="flex flex-col items-center md:items-start"><div class="self-center"><img${add_attribute("src", profileData?.profile_icon, 0)} alt="${escape(profileData?.username, true) + "'s profile picture"}" height="128" width="128" class="${"md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full outline outline-2 " + escape(profileData?.role, true) + "-outline outline-offset-4 svelte-1yjb8pi"}"></div>

  <p class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-4">${escape(profileData?.username)}</p>

  <p class="dark:text-white sm:text-base md:text-lg font-brand font-semibold mt-4">${profileData?.role != "default" ? `<span class="${escape(profileData?.role, true) + "-text svelte-1yjb8pi"}">${profileData?.role != "nerd" ? `⬤` : `🤓`}
        ${escape(titleCase(profileData?.role))}</span>` : ``}</p>
  <p class="whitespace-pre-line dark:bg-stone-700 dark:bg-opacity-40 bg-opacity-40 bg-white mb-2 rounded-xl p-2 dark:text-white text-lg mt-4 font-brand font-light">${escape(profileData?.bio.replaceAll("\\n", "\n"))}</p>
  ${$isAuthenticated && $userData.id === profileData?.id ? `<a href="edit" class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2"><img src="/icons/settings.svg" alt="settings" width="24" height="24" class="float-left invert mr-2 max-w-sm stroke-red-400">
      Profile Settings
    </a>` : ``}
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1u8gvp1_START -->${$$result.title = `<title>${escape(data.profile?.username)} | Datapack Hub</title>`, ""}<!-- HEAD_svelte-1u8gvp1_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-8 md:px-16 lg:px-24"><div class="flex flex-col items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-32">${validate_component(ProfileCard, "ProfileCard").$$render($$result, { profileData: data.profile }, {}, {})}
    <div class="w-full mx-24 h-full overflow-y-auto mt-16 md:mt-0 styled-scrollbar">${data.projects?.length == 0 ? `<p class="dark:text-white text-opacity-40 text-3xl text-center mt-48">No projects!
        </p>` : `${each(data.projects ?? [], (project) => {
    return `${validate_component(ProjectComponent, "ProjectComponent").$$render($$result, { project }, {}, {})}`;
  })}`}</div></div></main>`;
});
export {
  Page as default
};
