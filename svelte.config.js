import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $components: "./src/components/",
      $globals: "./src/routes/globals.ts",
    },
    csp: {
      mode: "hash",
      directives: {
        'base-uri': ["'self'"],
        'child-src': ["'self'"],
        'connect-src': ["'self'", 'ws://localhost:*'],
        'img-src': ["'self'", '*'],
        'font-src': [
          "'self'",
          'https://*.google.com',
          'https://*.googleapis.com',
          'https://*.gstatic.com'
        ],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'manifest-src': ["'self'"],
        'media-src': ["'self'", 'datapackhub.net', '*.datapackhub.net', 'youtube.com', 'youtu.be'],
        'object-src': ["'none'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'default-src': [
          'self',
          '*.datapackhub.net',
          'static.cloudflareinsights.com',
          'https://*.google.com',
          'https://*.googleapis.com',
          'https://*.gstatic.com',
        ],
        'script-src': [
          'self',
        ],
        'worker-src': ["'self'"],
      },
    }
  },
};

export default config;
