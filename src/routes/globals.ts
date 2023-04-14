import { writable, type Writable } from "svelte/store";

export const isDark = writable(true);
export const isAuthenticated = writable(false);
export const userData: Writable<User> = writable({
  id: -1,
  username: "",
  bio: "",
  profile_icon: "",
  role: "admin",
  banned: false
});
export const apiURL = "https://api.datapackhub.net";

export function loadColorPref() {
  return localStorage.getItem("dp_colorPref") == "true";
}

export async function getAuthorNameFromID(authorID: number): Promise<string> {
  const data = await fetch(`${apiURL}/user/id/${authorID}`);
  return ((await data.json()) as User).username;
}

export async function fetchAuthed(
  method: string,
  url: string
): Promise<Response> {
  const resp = await fetch(url, {
    method: method,
    headers: { Authorization: `Basic ${await getCookie("dph_token")}` },
  });
  if (resp.status == 498) {
    removeCookie("dph_token");
  }
  return resp;
}

export async function postAuthed(url: string, data: object): Promise<Response> {
  const resp = await fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: { Authorization: `Basic ${await getCookie("dph_token")}` },
  });
  if (resp.status == 498) {
    removeCookie("dph_token");
  }
  return resp;
}

export async function patchAuthed(
  url: string,
  data: object
): Promise<Response> {
  const resp = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { Authorization: `Basic ${await getCookie("dph_token")}` },
  });
  if (resp.status == 498) {
    removeCookie("dph_token");
  }
  return resp;
}

export async function getCookie(item: string) {
  const name = item + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
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
