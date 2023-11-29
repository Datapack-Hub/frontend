import { browser, dev } from "$app/environment";
import { fetchAuthed, loadColorPref, removeCookie } from "$lib/globals/functions";
import { authed, consoleWarned, roleInfo, roles, user } from "$lib/globals/stores";
import { toast } from "svelte-sonner";
import { get } from "svelte/store";
import type { LayoutLoad } from "./$types";

export const load = (async ({ url, data }) => {
  if (data?.role && data?.user) {
    user.set(data.user);
    if (data.role) roleInfo.set(data.role);
    authed.set(true);
  }

  roles.set(data.roles);

  if (browser) {
    const parameters = url.searchParams;

    if (parameters.has("log_out")) {
      const signal = await fetchAuthed("get", "/user/me/log_out");
      const toastFunction = signal.ok ? toast.success : toast.error;
      toastFunction(await signal.text());

      if (signal.ok) {
        removeCookie("dph_token");
        location.reload();
      }
    }

    if (!dev && !get(consoleWarned)) {
      console.log("%cSTOP!", "color: #ff631a; font-size: 72pt; font-weight: 800;");
      console.log(
        "%cPasting anything into the console could get your account stolen. Only use this if you know what you're doing!",
        "font-size: 18pt;",
      );
      console.log(
        "%c(Unless you DO know what you're doing, then maybe you could join us 😁).",
        "font-size: 8pt;",
      );
      consoleWarned.set(true);
    }

    loadColorPref();
    return {
      cookieNotice: localStorage.getItem("acceptedCookies") !== undefined
    }
  }
  return {
    cookieNotice: false
  }
}) satisfies LayoutLoad;
