// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types

declare namespace App {
  interface Error {
    message: string;
    description?: string;
  }

  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
  interface Platform {
    env: {
      COUNTER: DurableObjectNamespace;
    };
    context: {
      waitUntil(promise: Promise<unknown>): void;
    };
    caches: CacheStorage & { default: Cache };
  }
}

declare module "sveltejs-tippy";
declare module "marked-smartypants";

/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
