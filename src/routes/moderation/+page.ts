import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { role } from "$lib/globals/stores";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { isModOrAbove } from "$lib/globals/functions";

export const load = (async () => {
  if (browser && !isModOrAbove(get(role))) {
    goto("/");
  }
}) satisfies PageLoad;
