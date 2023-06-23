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

    fetchAuthed("put","/auth/link/discord?code=" + params.get("code")).then(resp => {
      if(resp.ok) goto("/settings")
    })
  }
  return {};
});
