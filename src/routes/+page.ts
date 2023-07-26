import { API } from "$lib/globals/consts";
import { projectSchema, userSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [
    randomJson,
    featuredJson,
    count,
    adminsRes,
    modRes,
    //devRes,
    helperRes
  ] = await parallel(
    3,
    await Promise.all([
      fetch(`${API}/projects/random?count=3`),
      fetch(`${API}/projects/featured`),
      fetch(`${API}/projects/count`),
      // staff
      fetch(`${API}/user/staff/admin`),
      fetch(`${API}/user/staff/moderator`),
      //fetch(`${API}/user/staff/developer`),
      fetch(`${API}/user/staff/helper`)
    ]),
    async res => await res.json()
  );

  const [admins, mods, helpers] = await parallel(
    4,
    [adminsRes, modRes, helperRes].map(v => v.values),
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
    staff: admins.concat(mods, helpers)
  };
}) satisfies PageLoad;
