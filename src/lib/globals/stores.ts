import { writable } from "svelte/store";

export const isDark = writable(true);
export const authed = writable(false);

/**
 * Store for User Data, this contains all the user's data
 */

export const user = writable({
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

export const role = writable({
  name: "default",
  color: null as string | null,
  verified: false,
  permissions: [] as string[]
});
