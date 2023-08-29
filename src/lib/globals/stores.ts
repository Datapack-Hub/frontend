import { browser } from "$app/environment";
import type { Role, User } from "$lib/globals/schema";
import { debounce } from "radash";
import { readable, writable } from "svelte/store";

export const isDark = writable(true);
export const authed = writable(false);
export const consoleWarned = writable(false);

/**
 * Contains basic information about the logged in user
 */
export const user = writable<User>({
  id: -1,
  username: "",
  bio: "",
  profile_icon: "/logos/dph.svg",
  /** For role info, use the `$role` store */
  role: "default",
  banned: false
});

/**
 * Contains all information about the user's role
 */
export const roleInfo = writable<Role>({
  name: "default",
  verified: false,
  permissions: []
});

/**
 * Contains all information about all roles
 *
 * This is initialized in +layout.ts
 */
export const roles = writable<Role[]>([]);

/**
 * Convenience store for the window's width
 */
export const windowWidth = readable(1920, set => {
  if (browser) {
    set(window.innerWidth);
    addEventListener(
      "resize",
      debounce({ delay: 20 }, () => {
        set(window.innerWidth);
      })
    );
  }
});
