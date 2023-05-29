import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async () => {
  if (browser) {
    const unread = await fetchAuthed("get", "/notifs/");
    if (unread.ok) {
      const notificationsJSON = (await unread.json()).result as Notif[];

      return {
        notifications: notificationsJSON
      };
    }
    throw error(unread.status, {
      message: unread.statusText,
      description: "Something went wrong"
    });
  }
}) satisfies PageLoad;
