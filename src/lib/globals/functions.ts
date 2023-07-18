import { userSchema, type User, type Role } from "$lib/globals/schema";
import { get } from "svelte/store";
import { apiURL } from "./consts";
import { authed, isDark } from "./stores";

/**
 * Loads the user's preferred color scheme from LocalStorage
 */
export function loadColorPref() {
  const color = localStorage.getItem("dp_colorPref");
  isDark.set(color != null && color === "true");
}

/**
 * Gets a username from ID
 *
 * @param authorID ID of the author
 * @returns username of the author
 */
export async function getAuthorFromID(authorID: number): Promise<User> {
  const data = await fetch(apiURL + `/user/id/${authorID}`);
  return userSchema.parse(await data.json());
}

/**
 * Fetches data using the user's token
 *
 * @param method HTTP method to use
 * @param url
 * @param data JSON data in body
 * @returns an HTTP response
 */
export async function fetchAuthed(
  method: string,
  url: string,
  data: object | undefined = undefined,
  headers: HeadersInit | undefined = undefined
): Promise<Response> {
  const cookie = getCookie("dph_token");

  // what is going on here
  const res = await fetch(`${apiURL}${url}`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(cookie != null ? { Authorization: `Basic ${cookie}` } : undefined),
      ...headers
    }
  });

  if (res.status == 401) removeCookie("dph_token");
  if (!res.ok) Promise.reject(res.statusText);

  return res;
}

export function getCookie(cookieName: string): string | null {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  return null;
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function isModOrAbove(role: Role | undefined) {
  return (
    get(authed) &&
    ["moderator", "developer", "admin"].includes(role?.name ?? "")
  );
}
