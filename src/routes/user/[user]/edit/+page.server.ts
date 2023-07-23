import { browser } from "$app/environment";
import { API } from "$lib/globals/consts";
import type { Role } from "$lib/globals/schema";
import { userSchema } from "$lib/globals/schema";
import { roleInfo } from "$lib/globals/stores";
import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import type { PageServerLoad } from "./$types";
import { serverFetchAuthed } from "$lib/globals/functions";

export const load = (async ({ params, cookies }) => {
  if (browser) {
    const defaultRole = get(roleInfo);

    const [user, me, roles] = await Promise.all([
      serverFetchAuthed("get", "/user/" + params.user, cookies),
      serverFetchAuthed("get", "/user/me", cookies),
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
}) satisfies PageServerLoad;
