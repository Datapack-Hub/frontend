import { c as create_ssr_component, d as add_attribute, e as escape } from "../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rand = Math.floor(Math.random() * 1e9);
  let formattedRand = Intl.NumberFormat("en", { notation: "compact" }).format(rand);
  return `<body class="${"bg-black h-screen"}"><nav class="${"w-screen fixed"}"><div class="${"w-full bg-gradient-to-br from-pink-600 to-yellow-400 py-4 h-20 -translate-y-2 opacity-10 blur-md"}"></div>
		<div class="${"h-16 flex absolute top-0 justify-center items-center px-4"}"><img src="${"dph.png"}" alt="${"logo"}" class="${"h-8 rounded-full"}">
			<p class="${"text-white ml-2 font-brand text-xl"}">Datapack Hub</p></div></nav>
	<div class="${"flex flex-col items-center justify-center h-screen w-screen"}"><h1 class="${"text-white text-[12rem] font-brand font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br"}">Explore</h1>
		<p class="${"text-white w-1/3 mt-8 text-center text-4xl"}">Over <span${add_attribute("title", rand.toString(), 0)} class="${"font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br"}">${escape(formattedRand)}</span> of the latest and best datapacks from creators across the globe</p>
		<div class="${"flex w-1/2 items-center justify-evenly mt-16"}"><button class="${"text-pink-400 bg-pink-400 bg-opacity-20 font-brand rounded-md px-3 py-2 text-2xl"}">Lorem</button>
			<button class="${"px-3 py-2 bg-orange-400 rounded-md font-bold font-brand text-2xl"}">Discover</button></div></div></body>`;
});
export {
  Page as default
};
