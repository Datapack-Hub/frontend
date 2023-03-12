import { writable, type Writable } from "svelte/store"
import { get } from 'idb-keyval';

export const isDark = writable(true)
export const isAuthenticated = writable(false)
export const userData: Writable<User> = writable({id: -1, username: "", bio: "", profile_icon: "", role: "default"})

export async function loadColorPref(): Promise<boolean> {
  return await get("dp_colorPref") ?? true
}