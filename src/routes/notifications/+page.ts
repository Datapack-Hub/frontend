import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";
import { notificationSchema as notifSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async () => {
  if (browser) {
    const unread = await fetchAuthed("get", "/notifs/");

    if (!unread.ok) {
      throw error(unread.status, {
        message: unread.statusText,
        description: "Something went wrong"
      });
    }

    return {
      notifications: notifSchema.array().parse((await unread.json()).result)
    };
  }
}) satisfies PageLoad;
