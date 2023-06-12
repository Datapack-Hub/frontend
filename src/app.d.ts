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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      waitUntil(promise: Promise<any>): void;
    };
    caches: CacheStorage & { default: Cache };
  }
}

declare module "sveltejs-tippy";

declare type User = {
  id: number;
  banData?: { message: string; expires: number };
  banned: boolean;
  bio: string;
  profile_icon: string;
  role: string;
  username: string;
};

declare type Project = {
  ID: number;
  author: number;
  body: string;
  category: string;
  description: string?;
  icon: string?;
  mod_message: string?;
  status:
    | "unpublished"
    | "in_queue"
    | "live"
    | "draft"
    | "disabled"
    | "deleted"
    | "ghost";
  title: string;
  type: "datapack" | "url";
  url: string;
  latest_version: {
    name: string;
    description: string;
    minecraft_versions: string;
    version_code: string;
  }?;
};

declare type Notif = {
  id: number;
  description: string?;
  message: string;
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
  name: string;
  description: string;
  file_name: string;
  minecraft_versions: string;
  primary_download: string;
  resource_pack_download: string?;
  version_code: string;
};

/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
