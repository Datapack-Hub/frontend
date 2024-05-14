import { API } from "$lib/globals/consts/consts";
import { userSchema } from "$lib/globals/consts/schema.js";
import { processMarkdown } from "$lib/globals/markdown";
import { parallel } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [admins, moderators, helpers] = await parallel(
    3,
    await Promise.all([
      fetch(`${API}/user/staff/admin`),
      fetch(`${API}/user/staff/moderator`),
      // fetch(`${API}/user/staff/developer`),
      fetch(`${API}/user/staff/helper`)
    ]),
    async response => {
      const responseJson = await response.json();
      return await userSchema.array().parseAsync(responseJson.values);
    }
  );

  const staff = [...admins, ...moderators, ...helpers];
  for (const member of staff) {
    member.bio = await processMarkdown(member.bio);
  }

  return {
    staff
  };
}) satisfies PageLoad;
