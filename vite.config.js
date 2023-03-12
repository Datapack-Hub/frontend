import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  server: {
    host: "vite.test",
    port: 80
  },
	plugins: [sveltekit()],
};

export default config;
