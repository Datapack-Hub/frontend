import { API } from "$lib/globals/consts";
import { projectSchema, userSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [
    randomJson,
    featuredJson,
    count,
    adminsJson,
    moderatorsJson,
    helpersJson
  ] = await parallel(
    3,
    await Promise.all([
      fetch(`${API}/projects/random?count=6`),
      fetch(`${API}/projects/featured`),
      fetch(`${API}/projects/count`),
      // staff
      fetch(`${API}/user/staff/admin`),
      fetch(`${API}/user/staff/moderator`),
      fetch(`${API}/user/staff/helper`)
    ]),
    async response => await response.json()
  );

  const [admins, mods, helpers] = await parallel(
    3,
    [adminsJson, moderatorsJson, helpersJson].map(v => v.values),
    async users => await userSchema.array().parseAsync(users)
  );

  const random = await projectSchema.array().parseAsync(randomJson.result);
  let featured = await projectSchema.array().parseAsync(featuredJson.result);

  featured = shuffle(featured);
  featured = featured.slice(0, 3);

  return {
    random,
    featured,
    count: count.count,
    staff: [...admins, ...mods, ...helpers]
  };
}) satisfies PageLoad;
