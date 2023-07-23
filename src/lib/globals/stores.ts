import { readable, writable, type Writable } from "svelte/store";
import { roleSchema, type Role, type User } from "$lib/globals/schema";
import { API } from "./consts";

export const isDark = writable(true);
export const authed = writable(false);
export const consoleWarned = writable(false);

/**
 * Store for User Data
 */
export const user: Writable<User> = writable({
  id: -1,
  username: "",
  bio: "",
  profile_icon: "logos/dph.svg",
  role: "default" /** For role info, use the `$role` store */,
  banned: false
});

/**
 * Contains all information about a role
 */
export const role: Writable<Role> = writable({
  name: "default",
  verified: false,
  permissions: []
});

/**
 * Contains all information about all roles
 */
export const siteRoles = readable<Role[]>([], function start(set) {
	fetch(`${API}/user/staff/roles`).then(resp => resp.json().then(parsed => {
    set(roleSchema.array().parse(parsed.roles))
  }))
});
