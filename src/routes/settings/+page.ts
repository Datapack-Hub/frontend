import { browser } from "$app/environment";
import { userSchema } from "$lib/globals/consts/schema";
import { fetchAuthed } from "$lib/globals/functions";
import { roles } from "$lib/globals/stores";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  if (browser) {
    const meResponse = await fetchAuthed("GET", "/user/me", {
      fetchFunction: fetch
    });
    const profile = await userSchema.parseAsync(await meResponse.json());

    return {
      profile,
      role: get(roles).find(v => {
        profile.role === v.name;
      })
    };
  }
  return {};
}) satisfies PageLoad;
