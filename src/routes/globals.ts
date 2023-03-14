import { writable, type Writable } from "svelte/store"
import { get } from 'idb-keyval';

export const isDark = writable(true)
export const isAuthenticated = writable(false)
export const userData: Writable<User> = writable({id: -1, username: "", bio: "", profile_icon: "", role: "default"})

export async function loadColorPref(): Promise<boolean> {
  return await get("dp_colorPref") ?? true
}

export async function fetchAuthed(method: string, url: string): Promise<Response> {
  const token = localStorage.getItem("dph_token")
  return await fetch(url, { method: method, headers: { Authorization: `Basic ${token}` }});
}
// Prod
// export const apiURL = "https://api.datapackhub.net"

// Dev:
export const apiURL = "http://localhost:5000"