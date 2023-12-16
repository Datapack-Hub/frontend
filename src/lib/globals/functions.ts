import { browser } from "$app/environment";
import { userSchema, type Role } from "$lib/globals/schema";
import type { Cookies } from "@sveltejs/kit";
import { memo, range } from "radash";
import { API } from "./consts";
import { isDark } from "./stores";

/**
 * Loads the user's preferred color scheme from LocalStorage
 */
export function loadColorPref() {
  const color = localStorage.getItem("dp_colorPref") || "true";
  if (color === undefined) return;
  isDark.set(color === "true");
}

type FetchFunction = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>;

/**
 * Fetches data using the user's token
 *
 * SERVER USE ONLY!
 *
 * If you want to use this on the client, use fetchAuthed
 *
 * @param method HTTP method to use
 * @param url
 * @param cookies Cookies object from `LayoutServerLoad`
 * @param data JSON data in body
 * @returns an HTTP response
 */
export async function serverGetAuthed(
  url: string,
  cookies: Cookies,
  fetchFunction: FetchFunction = fetch
): Promise<Response> {
  const cookie = cookies.get("dph_token"); // Cookies object from `LayoutServerLoad`, so our data loads early

  const response = await fetchFunction(`${API}${url}`, {
    // Start fetching
    headers: {
      // Headers
      ...(cookie === undefined
        ? undefined
        : { Authorization: `Basic ${cookie}` }) // Cookie exists, so add it as the auth header
    }
  });

  if (response.status === 401) cookies.delete("dph_token", { path: "/" }); // Remove token if invalid

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
  options:
    | {
        data?: object | FormData;
        fetchFunction?: FetchFunction;
        useSuppliedURL?: boolean;
      }
    | undefined = undefined
): Promise<Response> {
  const cookie = browser ? getCookie("dph_token") : undefined; // cookie only exists on browser
  const fetchFunction = options?.fetchFunction || fetch;

  let parsedData;
  if (options?.data instanceof FormData) {
    parsedData = options.data;
  } else if (typeof options?.data === "object") {
    parsedData = JSON.stringify(options.data);
  } else {
    parsedData = undefined;
  }

  let link = `${API}${url}`;

  if (typeof options?.useSuppliedURL === "boolean" && !options?.useSuppliedURL)
    link = url;

  const response = await fetchFunction(link, {
    // Start fetching
    method, // HTTP verb you want to use
    body: parsedData, // Body of fetch
    headers: {
      // Headers
      ...(cookie === undefined
        ? undefined
        : { Authorization: `Basic ${cookie}` }) // Cookie exists, so add it as the auth header
    }
  });

  if (response.status === 401) removeCookie("dph_token"); // Expired token, so removes it ig
  // if (!response.ok) Promise.reject(response.statusText); // This single line probably added hundreds of unneeded 500 errors, but makes errors actually show up.

  return response;
}

/**
 * Get cookie from browser
 * @param cookieName {string} name of cookie
 */
export const getCookie = memo((cookieName: string): string | undefined => {
  if (!browser) return; // Can't get the cookies if you can't access them

  const cookies = document.cookie.split(";");

  if (cookies.length === 0) return; // You have no cookies :(

  for (const index of range(cookies.length - 1)) {
    const cookie = cookies[index].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
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
export const moderatorOrAbove = memo((role: Role | undefined): boolean => {
  return ["moderator", "developer", "admin"].includes(role?.name ?? "");
});

/**
 * append a size parameter to an image link
 * @param urlString url as a string
 * @param size size of image
 * @returns a url with the parameter appended
 */
export function appendSize(
  urlString: string | undefined,
  size: number
): string | undefined {
  if (!urlString) return urlString;
  const url = new URL(urlString);
  url.searchParams.append("size", size.toString());
  return url.toString();
}

export function getAuthor(authorId: number) {
  return fetch(`${API}/users/${authorId}`)
    .then(result => result.json())
    .then(result => {
      return userSchema.parseAsync(result);
    });
}

/**
 * Formats a string to an "x y ago" string
 *
 * @param timestamp epoch number you want to display
 * @param locale locale
 * @returns a formatted "x y ago" string
 */
export function timeAgo(timestamp: number, locale = "en"): string {
  let value: string;
  const diff = (Date.now() - timestamp) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (years > 0) {
    value = rtf.format(0 - years, "year");
  } else if (months > 0) {
    value = rtf.format(0 - months, "month");
  } else if (days > 0) {
    value = rtf.format(0 - days, "day");
  } else if (hours > 0) {
    value = rtf.format(0 - hours, "hour");
  } else if (minutes > 0) {
    value = rtf.format(0 - minutes, "minute");
  } else {
    value = rtf.format(Math.floor(0 - diff), "second");
  }
  return value;
}

export function getUserLocale() {
  return browser && navigator ? navigator.language || "en" : "en";
}
