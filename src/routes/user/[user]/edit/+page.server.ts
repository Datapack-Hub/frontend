import { browser } from "$app/environment";
import { serverFetchAuthed } from "$lib/globals/functions";
import { userSchema } from "$lib/globals/schema";
import { roleInfo, roles } from "$lib/globals/stores";
import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
  if (browser) {
    const defaultRole = get(roleInfo);

    const [user, me] = await Promise.all([
      serverFetchAuthed("get", "/user/" + params.user, cookies),
      serverFetchAuthed("get", "/user/me", cookies),
    ]);

    const [userJson, meJson] = await Promise.all([
      userSchema.parseAsync(await user.json()),
      userSchema.parseAsync(await me.json())
    ]);

    if ([user, me].every(r => r.ok)) {
      const profileRole = get(roles).find(
        v => v.name == userJson?.role
      );

      if (
        userJson.username != meJson.username &&
        !defaultRole.permissions.includes("EDIT_USER")
      ) {
        throw error(403, {
          message: "Not allowed!",
          description: "This is not you, you can't edit their profile."
        });
      }

      return {
        profile: await userSchema.parseAsync(userJson),
        role: profileRole
      };
    }
  }
}) satisfies PageServerLoad;
