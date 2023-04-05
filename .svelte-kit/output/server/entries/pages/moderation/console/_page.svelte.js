import { c as create_ssr_component, a as subscribe, b as add_attribute } from "../../../../chunks/index2.js";
import { u as userData, a as isAuthenticated } from "../../../../chunks/globals.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userData, $$unsubscribe_userData;
  let $isAuthenticated, $$unsubscribe_isAuthenticated;
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  $$unsubscribe_isAuthenticated = subscribe(isAuthenticated, (value) => $isAuthenticated = value);
  let cmdInput;
  let cmd = "";
  $$unsubscribe_userData();
  $$unsubscribe_isAuthenticated();
  return `${$$result.head += `<!-- HEAD_svelte-a63k1c_START -->${$$result.title = `<title>Datapack Hub Console</title>`, ""}<!-- HEAD_svelte-a63k1c_END -->`, ""}

<main class="dark:bg-stone-900 bg-new-white transition-all px-4">${$userData.role != "default" && $isAuthenticated == true ? `${`<div class="flex-col md:items-start w-full h-screen md:pt-20 pt-10 text-lime-400 font-console"><div id="big" class="overflow-y-scroll" style="height: 92%;"><span class="font-bold text-lg">Datapack Hub Console</span><br>
          <span class="font-normal text-lg">Welcome!</span>
          <ul class="list-none" id="cons"></ul></div>
        <div class="bottom-0 right-0 absolute bg-black p-3 w-full flex justify-around"><p class="float-left">/</p>
          <form action="get" class="w-full outline-none border-0 ml-1 bg-black"><input id="inpt" class="w-full bg-black border-none"${add_attribute("value", cmd, 0)}${add_attribute("this", cmdInput, 0)}></form></div></div>`}` : ``}</main>`;
});
export {
  Page as default
};
