import { browser, dev } from "$app/environment";
import { goto } from "$app/navigation";
import { API } from "$lib/globals/consts";
import { loadColorPref } from "$lib/globals/functions";
import { roleSchema } from "$lib/globals/schema";
import {
  authed,
  consoleWarned,
  roleInfo,
  roles,
  user
} from "$lib/globals/stores";
import { get } from "svelte/store";
import type { LayoutLoad } from "./$types";

export const load = (async ({ url, data }) => {
  const parameters = url.searchParams;

  if (browser) {
    if (parameters.has("token")) {
      const newToken = parameters.get("token");
      const expires = new Date();

      expires.setTime(Date.now() + 30 * 24 * 60 * 60 * 1000);
      document.cookie = `dph_token=${newToken}; expires=${expires.toUTCString()}`;

      goto("/");
    }

    if (!dev && !get(consoleWarned)) {
      console.log(
        "%cSTOP!",
        "color: #ff631a; font-size: 72pt; font-weight: 800;"
      );
      console.log(
        "%cPasting anything into the console could get your account stolen. Only use this if you know what you're doing!",
        "font-size: 18pt;"
      );
      console.log(
        "%c(Unless you do know what you're doing, then maybe you should join us 😁).",
        "font-size: 6pt;"
      );
      consoleWarned.set(true);
    }

    const rolesResponse = await fetch(`${API}/user/staff/roles`);
    const rolesJson = await rolesResponse.json();
    const rolesObject = await roleSchema.array().parseAsync(rolesJson.roles);

    roles.set(rolesObject);
    
    if (data && data.role && data.user) {
      user.set(data.user);
      roleInfo.set(data.role);
      authed.set(true);
    }
    loadColorPref();
  }
}) satisfies LayoutLoad;
