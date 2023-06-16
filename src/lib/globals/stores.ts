import { writable, type Writable } from "svelte/store";
import type { Role, User } from "$lib/globals/schema";

export const isDark = writable(true);
export const authed = writable(false);

/**
 * Store for User Data, this contains all the user's data
 */

export const user: Writable<User> = writable({
  id: -1,
  username: "",
  bio: "",
  profile_icon: "logos/dph.svg",
  role: "default" /** For role info, use the `role` store */,
  banned: false
});
/**
 * Contains all information about a role
 */

export const role: Writable<Role> = writable({
  name: "default",
  verified: false,
  permissions: [] as string[]
});
