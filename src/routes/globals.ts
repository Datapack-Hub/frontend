import { writable, type Writable } from "svelte/store";

export const isDark = writable(true);
export const isAuthenticated = writable(false);

/**
 * Store for User Data, this contains all the user's data
 */
export const userData: Writable<User> = writable({
  id: -1,
  username: "",
  bio: "",
  profile_icon: "",
  role: "admin" /** For role info, use the `roleInfo` store */,
  banned: false,
});

/**
 * Contains all information about a role
 */
export const roleInfo = writable({
  name: "default",
  color: null,
  verified: false,
  permissions: [] as string[],
});

export const apiURL = "https://api.datapackhub.net";

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
  // what is going on here
  const resp = await fetch(url, {
    method: method,
    ...(data ? { body: JSON.stringify(data) } : {}), // ah yes ternary grossness
    headers: { Authorization: `Basic ${await getCookie("dph_token")}` },
  });

  if (resp.status == 498) removeCookie("dph_token");

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
