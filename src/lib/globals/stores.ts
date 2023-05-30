import { writable } from "svelte/store";
import { useWritable } from "./functions";

export const isDark = writable(true);

/**
 * Store for User Data, this contains all the user's data
 */

export const useUser = () =>
  useWritable("user", {
    id: -1,
    username: "",
    bio: "",
    profile_icon: "",
    role: "default" /** For role info, use the `role` store */,
    banned: false
  });
/**
 * Contains all information about a role
 */

export const useRole = () =>
  useWritable("role", {
    name: "default",
    color: null,
    verified: false,
    permissions: [] as string[]
  });
