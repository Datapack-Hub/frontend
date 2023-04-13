import { browser } from '$app/environment';
import { fetchAuthed, getCookie, apiURL, isAuthenticated, userData } from '$globals';
import { setContext } from 'svelte';
import type { LayoutLoad } from './$types';

export const load = (async () => {
  if (browser) {
    const token = await getCookie("dph_token");

    if (token) {
      const res = await fetchAuthed("get", apiURL + "/user/me");

      if (res.ok) {
        const data = (await res.json()) as User
        userData.set(data);
        isAuthenticated.set(true);
        setContext("user", data);
        return {
          data: data
        }
      }
      return;
    }
  }
}) satisfies LayoutLoad;