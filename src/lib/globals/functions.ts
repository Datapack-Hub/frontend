import { browser } from "$app/environment";
import type { Role } from "$lib/globals/schema";
import type { Cookies } from "@sveltejs/kit";
import { memo, range } from "radash";
import { get } from "svelte/store";
import { API } from "./consts";
import { authed, isDark } from "./stores";

/**
 * Loads the user's preferred color scheme from LocalStorage
 */
export function loadColorPref() {
  const color = localStorage.getItem("dp_colorPref");
  isDark.set(color != undefined && color === "true");
}

/**
 * Fetches data using the user's token
 * SERVER USE ONLY!
 *
 * @param method HTTP method to use
 * @param url
 * @param data JSON data in body
 * @returns an HTTP response
 */
export async function serverFetch(
  method: string,
  url: string,
  cookies: Cookies,
  data: object | undefined = undefined,
  headers: HeadersInit | undefined = undefined
): Promise<Response> {
  const cookie = cookies.get("dph_token");

  // what is going on here
  const response = await fetch(`${API}${url}`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(cookie == undefined
        ? undefined
        : { Authorization: `Basic ${cookie}` }),
      ...headers
    }
  });

  if (response.status == 401) cookies.delete("dph_token");
  if (!response.ok) Promise.reject(response.statusText);

  return response;
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
  let cookie;
  if (browser) {
    cookie = getCookie("dph_token");
  }

  // what is going on here
  const response = await fetch(`${API}${url}`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(cookie == undefined
        ? undefined
        : { Authorization: `Basic ${cookie}` }),
      ...headers
    }
  });

  if (response.status == 401) removeCookie("dph_token");
  if (!response.ok) Promise.reject(response.statusText);

  return response;
}

const getCookie = memo((cookieName: string): string | undefined => {
  if (!browser) return;

  const cookies = document.cookie.split(";");

  if (cookies.length === 0) return;

  for (const index of range(cookies.length - 1)) {
    // eslint-disable-next-line security/detect-object-injection
    const cookie = cookies[index].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.slice(Math.max(0, cookieName.length + 1));
    }
  }

  return;
});

export function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Check if the role is a moderator or above
 *
 * @param role the role to check
 * @returns true or false
 */
export const moderatorOrAbove = memo((role: Role | undefined) => {
  return (
    get(authed) &&
    ["moderator", "developer", "admin"].includes(role?.name ?? "")
  );
});
