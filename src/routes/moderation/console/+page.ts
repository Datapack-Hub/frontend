import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { roleInfo } from "$lib/globals/stores";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async () => {
  if (browser && !get(roleInfo).permissions.includes("USE_CONSOLE")) {
    goto("/");
  }
}) satisfies PageLoad;
