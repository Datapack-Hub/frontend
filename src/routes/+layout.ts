import { browser } from '$app/environment';
import { fetchAuthed, getCookie, apiURL, userData, isAuthenticated } from '$globals';
import type { LayoutLoad } from './$types';

export const load = (async () => {
  if (browser) {
    const token = await getCookie("dph_token");

      if (token != "") {
        const res = await fetchAuthed("get", apiURL + "/user/me");

        if (res.ok) {
          userData.set((await res.json()) as User);
          isAuthenticated.set(true);
        }
        return;
      }
  }
}) satisfies LayoutLoad;