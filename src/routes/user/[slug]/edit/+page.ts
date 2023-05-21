import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { fetchAuthed } from "$lib/globals/functions";
import { apiURL } from "$lib/globals/consts";
import { browser } from "$app/environment";
import { role } from "$lib/globals/stores";

export const load = (async ({ params }) => {
  if (browser) {
    let defaultRole: Role = {
      name: "default",
      color: null,
      verified: false,
      permissions: [] as string[]
    };

    const unsubscribeFromRole = role.subscribe(r => (defaultRole = r));

    const [user, me, roles] = await Promise.all([
      fetchAuthed("get", apiURL + "/user/" + params.slug),
      fetchAuthed("get", apiURL + "/user/me"),
      fetch(`${apiURL}/user/staff/roles`)
    ]);

    const [userJSON, meJSON] = await Promise.all([
      (await user.json()) as User,
      (await me.json()) as User
    ]);

    if (user.ok && me.ok && roles.ok) {
      const profileRole: Role = (await roles.json()).roles.find(
        (v: Role) => v.name == userJSON?.role
      );

      if (
        userJSON.username != meJSON.username &&
        !defaultRole.permissions.includes("EDIT_USER")
      ) {
        unsubscribeFromRole();
        throw error(403, {
          message: "Not allowed!",
          description: "This is not you, you can't edit their profile."
        });
      }

      unsubscribeFromRole();
      return {
        profile: userJSON as User,
        role: profileRole
      };
    }
  }
}) satisfies PageLoad;
