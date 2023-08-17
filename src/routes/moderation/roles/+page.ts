import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { roleInfo } from "$lib/globals/stores";
import type { PageLoad } from "./$types";
import { get } from "svelte/store";

export const load = (async () => {
  if (browser && !get(roleInfo).permissions.includes("EDIT_USER")) {
    goto("/");
  }
}) satisfies PageLoad;
