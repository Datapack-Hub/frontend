import { c as create_ssr_component, e as escape, b as add_attribute, v as validate_component } from "../../chunks/index3.js";
import "animejs";
import "marked";
import "isomorphic-dompurify";
const ButtonLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { clickEvent = void 0 } = $$props;
  if ($$props.clickEvent === void 0 && $$bindings.clickEvent && clickEvent !== void 0)
    $$bindings.clickEvent(clickEvent);
  return `<button class="text-new-white p-2 bg-dph-orange rounded-md font-bold text-md md:text-lg lg:text-xl font-brand hover:scale-110 transition-all active:brightness-75">${slots.default ? slots.default({}) : ``}</button>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rand = Math.floor(Math.random() * 1e7);
  let formattedRand = Intl.NumberFormat("en", { notation: "compact" }).format(rand);
  return `${$$result.head += `<!-- HEAD_svelte-1o42pse_START -->${$$result.title = `<title>Datapack Hub</title>`, ""}<meta name="description" content="DatapackHub is a website designed for publishing datapacks"><!-- HEAD_svelte-1o42pse_END -->`, ""}



<main class="dark:bg-stone-900 bg-new-white transition-all"><div class="flex md:flex-row flex-col justify-start items-center w-screen overflow-visible px-0 sm:px-8 md:px-16 lg:px-24 h-[66.666vh]"><div class="md:w-3/5 lg:w-2/5 w-2/3 mt-16 md:mt-0"><div class="${"relative w-full h-[4.5rem] mb-4 md:mb-0 lg:h-28 xl:h-36 " + escape("invisible", true)}"><h1 id="indexText1" class="split-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"><span class="letters text-dph-orange inline-block">Explore</span></h1>
        <h1 id="indexText2" class="split-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"><span class="letters text-dph-orange inline-block">Create</span></h1>
        <h1 id="indexText3" class="split-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"><span class="letters text-dph-orange inline-block">Play</span></h1></div>
      <h2 class="dark:text-new-white text-black text-xl sm:text-xl md:text-2xl xl:text-3xl md:text-left text-center w-full md:w-auto">Over <span${add_attribute("title", rand.toString(), 0)} class="font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br">${escape(formattedRand)}</span>
        of the latest and best datapacks from creators across the globe
      </h2>
      <div class="flex justify-evenly md:justify-start w-full items-center mt-8 md:mt-16">${validate_component(ButtonLink, "ButtonPrimary").$$render($$result, {}, {}, {
    default: () => {
      return `Play Now`;
    }
  })}
        ${``}
        ${validate_component(ButtonLink, "ButtonPrimary").$$render($$result, {}, {}, {
    default: () => {
      return `Discover`;
    }
  })}</div></div>
    ${``}
    <div class="w-4/5 my-8 sm:my-16 md:mt-0 md:w-2/5 dark:bg-stone-800 bg-dark-white h-full md:h-2/3 rounded-xl"><h2>Content here</h2></div></div>
  <div class="dark:bg-stone-800 bg-dark-white h-[33.333vh] w-screen"><h2>Content here</h2></div></main>`;
});
export {
  Page as default
};
