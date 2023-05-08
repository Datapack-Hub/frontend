import { writable, type Writable } from "svelte/store";

export const isDark = writable(true);
export const isAuthenticated = writable(false);
/**
 * Store for User Data, this contains all the user's data
 */

export const user: Writable<User> = writable({
  id: -1,
  username: "",
  bio: "",
  profile_icon: "",
  role: "admin" /** For role info, use the `role` store */,
  banned: false,
});
/**
 * Contains all information about a role
 */

export const role = writable({
  name: "default",
  color: null,
  verified: false,
  permissions: [] as string[],
});
