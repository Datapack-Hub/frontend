import { serverFetch } from "$lib/globals/functions";
import { notificationSchema as notifSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const unread = await serverFetch("get", "/notifs/", cookies);

  if (!unread.ok) {
    throw error(unread.status, {
      message: unread.statusText,
      description: "Something went wrong"
    });
  }

  const unreadJson = await unread.json();

  return {
    notifications: await notifSchema.array().parseAsync(unreadJson.result)
  };
}) satisfies PageServerLoad;
