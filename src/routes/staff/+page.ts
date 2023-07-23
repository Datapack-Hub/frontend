import { API } from "$lib/globals/consts";
import { roleSchema, userSchema } from "$lib/globals/schema.js";
import { parallel } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [admins, moderators, devs, helpers, prefetchedRoles] = await parallel(
    5,
    await Promise.all([
      fetch(`${API}/user/staff/admin`),
      fetch(`${API}/user/staff/moderator`),
      fetch(`${API}/user/staff/developer`),
      fetch(`${API}/user/staff/helper`),
      fetch(`${API}/user/staff/roles`)
    ]),
    async res => await res.json()
  );

  const [adminsJSON, moderatorsJSON, devsJSON, helpersJSON] = await parallel(
    4,
    [admins.values, moderators.values, devs.values, helpers.values],
    async users => await userSchema.array().parseAsync(users)
  );

  return {
    staff: adminsJSON.concat(moderatorsJSON, devsJSON, helpersJSON),
    roleData: roleSchema.array().parse(prefetchedRoles.roles)
  };
}) satisfies PageLoad;
