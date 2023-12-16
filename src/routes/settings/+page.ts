import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";
import { userSchema } from "$lib/globals/schema";
import { roles } from "$lib/globals/stores";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  if (browser) {
    const meResponse = await fetchAuthed("GET", "/users/me", {
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
