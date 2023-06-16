import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { apiURL } from "$lib/globals/consts";
import { fetchAuthed, getCookie, loadColorPref } from "$lib/globals/functions";
import { roleSchema, userSchema } from "$lib/globals/schema";
import { authed, role, user } from "$lib/globals/stores";
import type { Role } from "$lib/globals/schema";
import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  if (browser) {
    if (url.searchParams.has("token")) {
      const newToken = url.searchParams.get("token");
      const expires = new Date();

      expires.setTime(Date.now() + 30 * 24 * 60 * 60 * 1000);
      document.cookie = `dph_token=${newToken}; expires=${expires.toUTCString()}`;

      goto("/");
    }

    const token = getCookie("dph_token");

    if (token) {
      const [userRes, roleRes] = await Promise.all([
        fetchAuthed("get", "/user/me"),
        fetch(`${apiURL}/user/staff/roles`)
      ]);

      const userJson = userSchema.parse(await userRes.json());

      user.set(userJson);
      role.set(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        roleSchema
          .array()
          .parse((await roleRes.json()).roles)
          .find((v: Role) => v.name == userJson.role)!
      );
      authed.set(true);
    }

    loadColorPref();
  }
}) satisfies LayoutLoad;
