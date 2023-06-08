import { apiURL } from "$lib/globals/consts";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { role } from "$lib/globals/stores";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

export const load = (async ({ fetch }) => {
  if (browser) {
    await fetch(`${apiURL}/user/staff/roles`);

    if (!get(role).permissions.includes("USE_CONSOLE")) {
      goto("/");
    }
  }
}) satisfies PageLoad;
