import { browser } from "$app/environment";
import { apiURL } from "$lib/globals/consts";
import { roleSchema, userSchema } from "$lib/globals/schema.js";

export const load = async ({ fetch }) => {
  if (browser) {
    const [admins, moderators, devs, helpers, prefetchedRoles] =
      await Promise.all([
        fetch(`${apiURL}/user/staff/admin`),
        fetch(`${apiURL}/user/staff/moderator`),
        fetch(`${apiURL}/user/staff/developer`),
        fetch(`${apiURL}/user/staff/helper`),
        fetch(`${apiURL}/user/staff/roles`)
      ]);

    if ([admins, moderators, devs, helpers, prefetchedRoles].every(r => r.ok)) {
      const [adminsJSON, moderatorsJSON, devsJSON, helpersJSON] =
        await Promise.all([
          userSchema.array().parseAsync((await admins.json()).values),
          userSchema.array().parseAsync((await moderators.json()).values),
          userSchema.array().parseAsync((await devs.json()).values),
          userSchema.array().parseAsync((await helpers.json()).values)
        ]);

      const data = adminsJSON.concat(moderatorsJSON, devsJSON, helpersJSON);
      return {
        staff: data,
        roleData: roleSchema.array().parse((await prefetchedRoles.json()).roles)
      };
    }
  }
};
