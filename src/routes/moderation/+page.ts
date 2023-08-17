import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { moderatorOrAbove } from "$lib/globals/functions";
import { roleInfo } from "$lib/globals/stores";
import type { PageLoad } from "./$types";
import { get } from "svelte/store";

export const load = (async () => {
  if (browser && !moderatorOrAbove(get(roleInfo))) {
    goto("/");
  }
}) satisfies PageLoad;
