import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { apiURL } from "$lib/globals/consts";
import { fetchAuthed, getCookie, loadColorPref } from "$lib/globals/functions";
import { isAuthenticated, role, user } from "$lib/globals/stores";
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

    const token = await getCookie("dph_token");

    if (token) {
      const [userRes, roleRes] = await Promise.all([
        fetchAuthed("get", `${apiURL}/user/me`),
        fetch(`${apiURL}/user/staff/roles`),
      ]);

      const userJson = (await userRes.json()) as User;
      user.set(userJson);
      role.set(
        (await roleRes.json()).roles.find((v: Role) => v.name == userJson.role)
      );

      isAuthenticated.set(true);
    }

    loadColorPref();
  }
  return {};
}) satisfies LayoutLoad;
