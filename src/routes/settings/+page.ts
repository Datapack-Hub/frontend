import { browser } from "$app/environment";
import { API } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
import { roleSchema, userSchema } from "$lib/globals/schema";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  if (browser) {
    const [meRes, roleRes] = await Promise.all([
      fetchAuthed("GET", "/user/me"),
      fetch(`${API}/user/staff/roles`)
    ]);

    const [profile, role] = await Promise.all([
      userSchema.parseAsync(await meRes.json()),
      roleSchema.array().parseAsync((await roleRes.json()).roles)
    ]);

    return {
      profile: profile,
      role: role.find(v => {
        profile.role == v.name;
      })
    };
  }
  return {};
}) satisfies PageLoad;
