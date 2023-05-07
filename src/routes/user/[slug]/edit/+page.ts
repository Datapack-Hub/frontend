import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { apiURL, fetchAuthed, role } from "$globals";
import { browser } from "$app/environment";

export const load = (async ({ params }) => {
  if (browser) {
    let role: Role = {
      name: "default",
      color: null,
      verified: false,
      permissions: [] as string[],
    };

    const unsubscribeFromRole = role.subscribe((r) => (role = r));

    const [user, me] = await Promise.all([
      fetchAuthed("get", apiURL + "/user/" + params.slug),
      fetchAuthed("get", apiURL + "/user/me"),
    ]);

    const [userJSON, meJSON] = await Promise.all([
      (await user.json()) as User,
      (await me.json()) as User,
    ]);

    if (user.ok && me.ok) {
      if (
        userJSON.username != meJSON.username &&
        !role.permissions.includes("EDIT_USER")
      ) {
        unsubscribeFromRole();
        throw error(403, {
          message: "Not allowed!",
          description: "This is not you, you can't edit their profile.",
        });
      }

      unsubscribeFromRole();
      return {
        profile: userJSON as User,
      };
    }
  }
}) satisfies PageLoad;
