import type { LayoutLoad } from "./$types";
import {
  apiURL,
  fetchAuthed,
  getCookie,
  isDark,
  loadColorPref,
  userData,
  isAuthenticated,
} from "$globals";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";

export const load = (async ({url}) => {

  (async () => {
    if (browser) {
      let userDataSubscriber: User = {
        id: -1,
        username: "",
        bio: "",
        profile_icon: "",
        role: "admin",
        banned: false,
      };
      userData.subscribe((v) => userDataSubscriber = v);
      isDark.set(loadColorPref());
      userData.set(JSON.parse(localStorage.getItem("userData") ?? "{}") as User);

      if (url.searchParams.has("token")) {
        const newToken = url.searchParams.get("token");
        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `dph_token=${newToken}; expires=${expires}`;

        goto("/");
      }

      const token = await getCookie("dph_token");
      if (token) {
        const usr = await fetchAuthed("get", `${apiURL}/user/me`);
        const usrJson = (await usr.json()) as User;
        userData.set(usrJson);
        localStorage.setItem("userData", JSON.stringify(userDataSubscriber));
        isAuthenticated.set(true);
      }
    }
  })();
  return {};
}) satisfies LayoutLoad;
