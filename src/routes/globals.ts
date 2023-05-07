import { getContext } from "svelte";
import { writable } from "svelte/store";

export const isDark = writable(true);
export const isAuthenticated = writable(false);

export const apiURL = "https://api.datapackhub.net";

export function useUser(): User {
  return getContext('user') as User
}

export function useRole(): Role {
  return getContext('role') as Role
}

/**
 * Loads the user's preferred color scheme
 */
export function loadColorPref() {
  isDark.set(localStorage.getItem("dp_colorPref") == "true");
}

/**
 * Gets a username from ID
 *
 * @param authorID ID of the author
 * @returns username of the author
 */
export async function getAuthorNameFromID(
  authorID: number | undefined
): Promise<string> {
  if (!authorID) return "Unknown";

  const data = await fetch(`${apiURL}/user/id/${authorID}`);
  return ((await data.json()) as User).username;
}

/**
 * Fetches data with the user's token
 *
 * @param method HTTP method to use
 * @param url The URL
 * @param data Data to send
 * @returns an HTTP response
 */
export async function fetchAuthed(
  method: string,
  url: string,
  data: object | undefined = undefined
): Promise<Response> {
  const resp = await fetch(url, {
    method: method,
    ...(data ? { body: JSON.stringify(data) } : {}),
    headers: { Authorization: `Basic ${await getCookie("dph_token")}` },
  });

  if (resp.status == 498) removeCookie("dph_token");

  return resp;
}

export async function getCookie(item: string): Promise<string> {
  const name = item + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArr = decodedCookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export async function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function titleCase(str: string | undefined): string {
  if (!str) return "null";
  
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
