import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { fetchAuthed } from "$lib/globals/functions";
import type { PageLoad } from "../$types";

export const load = (async ({ url, fetch }) => {
  const parameters = url.searchParams;

  if (browser) {
    if (!parameters.has("code")) {
      goto("/");
      return {};
    }

    const response = await fetchAuthed(
      "put",
      `/auth/link/discord?code=${parameters.get("code")}`,
      { fetchFunction: fetch }
    );
    if (response.ok) goto("/settings");
  }
  return {};
}) satisfies PageLoad;
