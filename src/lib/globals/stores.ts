import type { Role, User } from "$lib/globals/schema";
import { writable } from "svelte/store";

export const isDark = writable(true);
export const authed = writable(false);
export const consoleWarned = writable(false);

/**
 * Contains all basic information about you (other than sensitive data)
 */
export const user = writable<User>({
  id: -1,
  username: "",
  bio: "",
  profile_icon: "/logos/dph.svg",
  role: "default" /** For role info, use the `$role` store */,
  banned: false
});

/**
 * Contains all information about your role
 */
export const roleInfo = writable<Role>({
  name: "default",
  verified: false,
  permissions: []
});

/**
 * Contains all information about all roles
 */
export const roles = writable<Role[]>([]);
