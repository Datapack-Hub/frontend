import { API } from "$lib/globals/consts";
import { userSchema } from "$lib/globals/schema.js";
import { parallel } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [admins, moderators, helpers] = await parallel(
    5,
    await Promise.all([
      fetch(`${API}/user/staff/admin`),
      fetch(`${API}/user/staff/moderator`),
      // fetch(`${API}/user/staff/developer`),
      fetch(`${API}/user/staff/helper`)
    ]),
    async response => {
      const responseJson = await response.json()
      return await userSchema.array().parseAsync(responseJson.values)
    }
  );

  return {
    staff: [...admins, ...moderators, ...helpers]
  };
}) satisfies PageLoad;
