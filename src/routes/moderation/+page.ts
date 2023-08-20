import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { moderatorOrAbove } from "$lib/globals/functions";
import { roleInfo } from "$lib/globals/stores";
import type { PageLoad } from "./$types";
import { get } from "svelte/store";

export const load = (async ({ data }) => {
  if (browser && !moderatorOrAbove(get(roleInfo))) {
    goto("/");
  }
  return {
    publishQueue: data.publishQueue,
    reviewQueue: data.reviewQueue,
    reports: data.reports,
    rolesJson: data.rolesJson,
  };
}) satisfies PageLoad;
