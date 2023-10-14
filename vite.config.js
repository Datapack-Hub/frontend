import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte"
    }),
    ViteImageOptimizer()
  ],
  server: {
    host: "0.0.0.0"
  },
  build: {
    cssMinify: "lightningcss"
  }
};

export default config;
