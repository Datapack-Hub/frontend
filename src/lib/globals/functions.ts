import type { Role } from "$lib/globals/schema";
import { memo, range } from "radash";
import { get } from "svelte/store";
import { API } from "./consts";
import { authed, isDark } from "./stores";

/**
 * Loads the user's preferred color scheme from LocalStorage
 */
export function loadColorPref() {
  const color = localStorage.getItem("dp_colorPref");
  isDark.set(color != null && color === "true");
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
  const cookies = document.cookie.split(";");
  if(cookies.length == 0) return null
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

export function isModOrAbove(role: Role | undefined) {
  return (
    get(authed) &&
    ["moderator", "developer", "admin"].includes(role?.name ?? "")
  );
}
