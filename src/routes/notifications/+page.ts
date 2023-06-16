import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Notif } from "$lib/globals/schema";

export const load = (async () => {
  if (browser) {
    const unread = await fetchAuthed("get", "/notifs/");
    if (!unread.ok) {
      throw error(unread.status, {
        message: unread.statusText,
        description: "Something went wrong"
      });
    }

    const notificationsJSON = (await unread.json()).result as Notif[];
    return {
      notifications: notificationsJSON
    };
  }
}) satisfies PageLoad;
