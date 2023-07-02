import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { fetchAuthed } from "$lib/globals/functions";
import type { PageLoad } from "../$types";

export const load = (async ({ url }) => {
  const params = url.searchParams;

  if (browser) {
    if (!params.has("code")) {
      goto("/");
      return {};
    }

    const res = await fetchAuthed("put", "/auth/link/discord?code=" + params.get("code"))
    if (res.ok) goto("/settings");
  }
  return {};
}) satisfies PageLoad;
