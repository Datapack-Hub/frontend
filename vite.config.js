import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    Icons({
     compiler: 'svelte'
    })
  ],
	server:{
		host:"0.0.0.0"
  }
};

export default config;
