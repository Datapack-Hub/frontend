import { apiURL } from "./consts";
import { isDark } from "./stores";
import { getContext, hasContext, setContext } from "svelte";
import { readable, writable } from "svelte/store";

// context for any type of store
export const useSharedStore = <T, A>(
  name: string,
  fn: (value?: A) => T,
  defaultValue?: A
) => {
  if (hasContext(name)) {
    return getContext<T>(name);
  }
  const _value = fn(defaultValue);
  setContext(name, _value);
  return _value;
};

// writable store context
export const useWritable = <T>(name: string, value: T) =>
  useSharedStore(name, writable, value);

// readable store context
export const useReadable = <T>(name: string, value: T) =>
  useSharedStore(name, readable, value);

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
  const data = await fetch(`${apiURL}/user/id/${authorID}`);
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
    ...(data ? { body: JSON.stringify(data) } : {}), // ah yes ternary grossness
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
