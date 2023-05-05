import { browser } from "$app/environment";
import { apiURL, fetchAuthed } from "$globals";
import type { PageLoad } from "./$types";

export const load = (async () => {
  if (browser) {
    const unread = await fetchAuthed("get", `${apiURL}/notifs/`);
    if (unread.ok) {
      const notificationsJSON = (await unread.json()).result as Notif[];

      return {
        notifications: notificationsJSON,
      };
    } else {
      alert("hi is error");
    }
  }
}) satisfies PageLoad;
