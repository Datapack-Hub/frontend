import { preprocessMeltUI } from "@melt-ui/pp";
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import sequence from "svelte-sequential-preprocessor";
/** @type {import('@sveltejs/kit').Config}*/
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sequence([
    vitePreprocess(),
    preprocess({
      postcss: true
    }),
    preprocessMeltUI()
  ]),
  kit: {
    adapter: adapter()
  }
};
export default config;
