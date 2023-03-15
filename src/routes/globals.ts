import { writable, type Writable } from "svelte/store"
import { get } from 'idb-keyval';

export const isDark = writable(true)
export const isAuthenticated = writable(false)
export const userData: Writable<User> = writable({id: -1, username: "", bio: "", profile_icon: "", role: "default"})

export async function loadColorPref(): Promise<boolean> {
  return await get("dp_colorPref") ?? true
}

export async function fetchAuthed(method: string, url: string): Promise<Response> {
  console.log(await getCookie("dph_token"))
  let resp = await fetch(url, { method: method, headers: { Authorization: `Basic ${await getCookie("dph_token")}` }});
  if(resp.status == 498){
    removeCookie("dph_token")
  }
  return resp;
}

export async function getCookie(item: string) {
  let name = item + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export async function removeCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Prod
export const apiURL = "https://api.datapackhub.net"

// Dev:
// export const apiURL = "http://localhost:5000"