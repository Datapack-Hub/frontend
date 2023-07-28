import type { Role } from "$lib/globals/schema";
import { memo, range } from "radash";
import { get } from "svelte/store";
import { API } from "./consts";
import { authed, isDark } from "./stores";
import { browser } from "$app/environment";
import type { Cookies } from "@sveltejs/kit";

/**
 * Loads the user's preferred color scheme from LocalStorage
 */
export function loadColorPref() {
  const color = localStorage.getItem("dp_colorPref");
  isDark.set(color != null && color === "true");
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
export async function serverFetchAuthed(
  method: string,
  url: string,
  cookies: Cookies,
  data: object | undefined = undefined,
  headers: HeadersInit | undefined = undefined
): Promise<Response> {
  const cookie = cookies.get("dph_token");

  // what is going on here
  const res = await fetch(`${API}${url}`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(cookie != null ? { Authorization: `Basic ${cookie}` } : undefined),
      ...headers
    }
  });

  if (res.status == 401) cookies.delete("dph_token");
  if (!res.ok) Promise.reject(res.statusText);

  return res;
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
  const res = await fetch(`${API}${url}`, {
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

export const getCookie = memo((cookieName: string): string | null => {
  if (!browser) return null;
  const cookies = document.cookie.split(";");
  if (cookies.length == 0) return null;
  for (const i of range(cookies.length - 1)) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  return null;
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
export const isModOrAbove = memo((role: Role | undefined) => {
  return get(authed) && ["moderator", "developer", "admin"].includes(role?.name ?? "");
});
