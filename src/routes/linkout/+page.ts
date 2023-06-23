import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
  const params = url.searchParams;

  if (browser) {
    if (!params.has("url")) {
      goto("/");
      return {};
    }

    return {
      url: params.get("url")
    };
  }
  return {};
}) satisfies PageLoad;
