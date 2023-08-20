import { goto } from "$app/navigation";
import { moderatorOrAbove } from "$lib/globals/functions";
import { roleInfo } from "$lib/globals/stores";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { browser } from "$app/environment";

export const load = (async () => {
  if (browser && !moderatorOrAbove(get(roleInfo))) {
    goto("/");
  }
}) satisfies PageLoad;
