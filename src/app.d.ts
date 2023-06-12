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
  banData?: { message: string; expires: number };
};

declare type Project = {
  ID: number;
  author: number;
  icon: string?;
  category: string;
  title: string;
  url: string;
  type: "datapack" | "url";
  description: string?;
  body: string;
  status: string?;
  mod_message: string?;
  latest_version: {
    name: string;
    description: string;
    minecraft_versions: string;
    version_code: string;
  };
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
  name: string;
  description: string;
  version_code: string;
  minecraft_versions: string;
  primary_download: string;
  resource_pack_download: string?;
  file_name: string;
};

declare type Report = {
  message: string;
  reporter: User;
  project: Project;
}

/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
