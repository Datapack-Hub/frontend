import { roleSchema, type Role, type User } from "$lib/globals/schema";
import { readable, writable } from "svelte/store";
import { API } from "./consts";

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
export const roles = readable<Role[]>([], function start(set) {
  fetch(`${API}/user/staff/roles`).then(resp =>
    resp.json().then(parsed => {
      set(roleSchema.array().parse(parsed.roles));
    })
  );
});
