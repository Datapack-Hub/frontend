import { apiURL } from "$lib/globals/consts";
import { roleSchema, userSchema } from "$lib/globals/schema.js";
import { parallel } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [admins, moderators, devs, helpers, prefetchedRoles] =
    await parallel(5, await Promise.all([
      fetch(`${apiURL}/user/staff/admin`),
      fetch(`${apiURL}/user/staff/moderator`),
      fetch(`${apiURL}/user/staff/developer`),
      fetch(`${apiURL}/user/staff/helper`),
      fetch(`${apiURL}/user/staff/roles`)
    ]), async res => await res.json());

  if ([admins, moderators, devs, helpers, prefetchedRoles].every(r => r.ok)) {
    const [adminsJSON, moderatorsJSON, devsJSON, helpersJSON] =
      await parallel(4, [
        admins.values,
        moderators.values,
        devs.values,
        helpers.values
      ], async users => await userSchema.array().parseAsync(users));

    const data = adminsJSON.concat(moderatorsJSON, devsJSON, helpersJSON);
    return {
      staff: data,
      roleData: roleSchema.array().parse(prefetchedRoles.roles)
    };
  }
}) satisfies PageLoad;
