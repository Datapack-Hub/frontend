// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Error {
    message: string;
    description: string;
  }
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
  interface Platform {
    env: {
      COUNTER: DurableObjectNamespace;
    };
    context: {
      waitUntil(promise: Promise<any>): void;
    };
    caches: CacheStorage & { default: Cache };
  }
}

declare module "sveltejs-tippy";

declare type User = {
  id: number;
  username: string;
  bio: string;
  role: string;
  profile_icon: string;
  banned: boolean;
};

declare type Project = {
  id: number;
  author: number;
  icon: string?;
  tags: string[];
  title: string;
  url: string;
  type: "datapack" | "url";
  description: string?;
  body: string;
};

declare type Notif = {
  id: number;
  message: string;
  description: string?;
  read: boolean;
  type: "announcement" | "ban" | "warn" | "default" | "rainbow";
};

declare type Role = {
  name: string;
  color: string?;
  verified: boolean;
  permissions: string[];
};

declare type Version = {
  name: string
  description: string
  version_code: string
  minecraft_versions: Array<string>
  primary_download: string
  rp_download: string?
}

/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
