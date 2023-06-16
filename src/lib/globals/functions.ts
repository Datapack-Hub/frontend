import type { User } from "$lib/globals/schema";
import { apiURL } from "./consts";
import { isDark } from "./stores";

/**
 * Loads the user's preferred color scheme from LocalStorage
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
export async function getAuthorFromID(authorID: number): Promise<User> {
  const data = await fetch(apiURL + `/user/id/${authorID}`);
  return (await data.json()) as User;
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
  data: object | undefined = undefined,
  headers: HeadersInit | undefined = undefined
): Promise<Response> {
  // what is going on here
  const resp = await fetch(`${apiURL}${url}`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Basic ${await getCookie("dph_token")}`,
      ...headers
    }
  });

  if (resp.status == 498) removeCookie("dph_token");

  return resp;
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

export async function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function titleCase(str: string | undefined): string {
  if (str == undefined) return "null";
  return str
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
