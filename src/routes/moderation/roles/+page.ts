import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { role } from "$lib/globals/stores";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async () => {
  if (browser && !get(role).permissions.includes("EDIT_USER")) {
    goto("/");
  }
}) satisfies PageLoad;
