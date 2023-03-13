import { writable, type Writable } from "svelte/store"
import { get } from 'idb-keyval';

export const isDark = writable(true)
export const isAuthenticated = writable(false)
export const userData: Writable<User> = writable({id: -1, username: "", bio: "", profile_icon: "", role: "default"})

export async function loadColorPref(): Promise<boolean> {
  return await get("dp_colorPref") ?? true
}

export async function fetchAuthed(method: string, url: URL, token: string): Promise<Response> {
  return await fetch(url, { method: method, headers: { authentication: `Basic ${token}` }});
}