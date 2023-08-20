import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
  const parameters = url.searchParams;

  if (browser) {
    if (!parameters.has("url")) {
      goto("/");
      return {};
    }

    return {
      url: parameters.get("url")
    };
  }
  return {};
}) satisfies PageLoad;
