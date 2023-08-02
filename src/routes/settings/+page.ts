import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";
import { userSchema } from "$lib/globals/schema";
import { roles } from "$lib/globals/stores";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async () => {
  if (browser) {
    const meRes = await fetchAuthed("GET", "/user/me");
    const profile = await userSchema.parseAsync(await meRes.json())

    return {
      profile: profile,
      role: get(roles).find(v => {
        profile.role == v.name;
      })
    };
  }
  return {};
}) satisfies PageLoad;
