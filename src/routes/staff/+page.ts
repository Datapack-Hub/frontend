import { browser } from "$app/environment";
import { apiURL } from "$globals";

export const load = async ({ fetch }) => {
  if (browser) {
    const [admins, moderators, devs, helpers, prefetchedRoles] =
      await Promise.all([
        fetch(`${apiURL}/user/staff/admin`),
        fetch(`${apiURL}/user/staff/moderator`),
        fetch(`${apiURL}/user/staff/developer`),
        fetch(`${apiURL}/user/staff/helper`),
        fetch(`${apiURL}/user/staff/roles`),
      ]);

    if (admins.ok) {
      const [adminsJSON, moderatorsJSON, devsJSON, helpersJSON] =
        await Promise.all([
          (await admins.json()).values as User[],
          (await moderators.json()).values as User[],
          (await devs.json()).values as User[],
          (await helpers.json()).values as User[],
        ]);

      const data = adminsJSON.concat(moderatorsJSON, devsJSON, helpersJSON);
      return {
        staff: data,
        roleData: (await prefetchedRoles.json()).roles as Role[],
      };
    }
  }
};
