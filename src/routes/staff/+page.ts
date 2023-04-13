import { browser } from "$app/environment";
import { apiURL } from "$globals";

export const load = async ({ fetch }) => {
  if (browser) {
    const [admins, moderators, devs, helpers] = await Promise.all([
      await fetch(`${apiURL}/user/staff/admin`),
      await fetch(`${apiURL}/user/staff/moderator`),
      await fetch(`${apiURL}/user/staff/developer`),
      await fetch(`${apiURL}/user/staff/helper`),
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
      };
    }
  }
};
