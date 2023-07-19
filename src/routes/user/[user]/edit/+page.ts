import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { fetchAuthed } from "$lib/globals/functions";
import { API } from "$lib/globals/consts";
import { browser } from "$app/environment";
import { role } from "$lib/globals/stores";
import { get } from "svelte/store";
import { userSchema } from "$lib/globals/schema";
import type { Role } from "$lib/globals/schema";

export const load = (async ({ params }) => {
  if (browser) {
    const defaultRole = get(role);

    const [user, me, roles] = await Promise.all([
      fetchAuthed("get", "/user/" + params.user),
      fetchAuthed("get", "/user/me"),
      fetch(`${API}/user/staff/roles`)
    ]);

    const [userJSON, meJSON] = await Promise.all([
      userSchema.parseAsync(await user.json()),
      userSchema.parseAsync(await me.json())
    ]);

    if ([user, me, roles].every(r => r.ok)) {
      const profileRole: Role = (await roles.json()).roles.find(
        (v: Role) => v.name == userJSON?.role
      );

      if (
        userJSON.username != meJSON.username &&
        !defaultRole.permissions.includes("EDIT_USER")
      ) {
        throw error(403, {
          message: "Not allowed!",
          description: "This is not you, you can't edit their profile."
        });
      }

      return {
        profile: userSchema.parse(userJSON),
        role: profileRole
      };
    }
  }
}) satisfies PageLoad;
