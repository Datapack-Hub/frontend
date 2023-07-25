import { API } from "$lib/globals/consts";
import { projectSchema, userSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [
    randomJson,
    featuredJson,
    countJson,
    admins,
    moderators,
    devs,
    helpers
  ] = await parallel(
    7,
    await Promise.all([
      fetch(`${API}/projects/random?count=3`),
      fetch(`${API}/projects/featured`),
      fetch(`${API}/projects/count`),
      fetch(`${API}/user/staff/admin`),
      fetch(`${API}/user/staff/moderator`),
      fetch(`${API}/user/staff/developer`),
      fetch(`${API}/user/staff/helper`)
    ]),
    async res => await res.json()
  );

  const [adminsJSON, moderatorsJSON, devsJSON, helpersJSON] = await parallel(
    4,
    [admins.values, moderators.values, devs.values, helpers.values],
    async users => await userSchema.array().parseAsync(users)
  );

  const random = await projectSchema.array().parseAsync(randomJson.result);
  let featured = await projectSchema.array().parseAsync(featuredJson.result);

  featured = shuffle(featured);
  featured = featured.slice(0, 3);

  return {
    random: random,
    featured: featured,
    count: countJson.count,
    staff: adminsJSON.concat(moderatorsJSON, devsJSON, helpersJSON)
  };
}) satisfies PageLoad;
