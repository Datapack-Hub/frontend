import { API } from "$lib/globals/consts";
import { userSchema } from "$lib/globals/schema.js";
import type { PageLoad } from "./$types";
import { parallel } from "radash";

export const load = (async ({ fetch }) => {
  const [admins, moderators, helpers] = await parallel(
    5,
    await Promise.all([
      fetch(`${API}/user/staff/admin`),
      fetch(`${API}/user/staff/moderator`),
      // fetch(`${API}/user/staff/developer`),
      fetch(`${API}/user/staff/helper`),
    ]),
    async (response) => {
      const responseJson = await response.json();
      return await userSchema.array().parseAsync(responseJson.values);
    },
  );

  return {
    staff: [...admins, ...moderators, ...helpers],
  };
}) satisfies PageLoad;
