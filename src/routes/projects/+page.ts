import { API } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  const params = url.searchParams;
  const page = params.has("page") ? parseInt(params.get("page") ?? "1") : 1;

  const [projects, featured] = await parallel(
    2,
    await Promise.all([
      fetch(`${API}/projects/?page=${page}`),
      fetch(`${API}/projects/featured`)
    ]),
    async res => (await res.json()).result
  );

  const data = await projectSchema.array().parseAsync(projects);
  const count = parseInt(projects.pages);

  return {
    projects: data,
    pages: count,
    featured: shuffle(await projectSchema.array().parseAsync(featured)),
    page: page
  };
}) satisfies PageLoad;
