import { serverFetchAuthed } from "$lib/globals/functions";
import { notificationSchema as notifSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
    const unread = await serverFetchAuthed("get", "/notifs/", cookies);

    if (!unread.ok) {
      throw error(unread.status, {
        message: unread.statusText,
        description: "Something went wrong"
      });
    }

    return {
      notifications: notifSchema.array().parse((await unread.json()).result)
    };
}) satisfies PageServerLoad;
