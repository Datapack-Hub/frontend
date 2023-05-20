import { apiURL } from "./consts";
import { isDark } from "./stores";

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
export async function getAuthorFromID(
  authorID: number | undefined
): Promise<User> {
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
  const resp = await fetch(url, {
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

export async function sendBlobAuthed(url: string, data: Blob) {
  const res = await fetch(url, {
    method: "post",
    body: data,
    headers: { Authorization: `Basic ${await getCookie("dph_token")}` }
  });

  if (res.status == 498) removeCookie("dph_token");

  return res;
}

export async function sendFormAuthed(url: string, data: FormData) {
  const res = await fetch(url, {
    method: "post",
    body: data,
    headers: { Authorization: `Basic ${await getCookie("dph_token")}` }
  });

  if (res.status == 498) removeCookie("dph_token");

  return res;
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
