import { API } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  const parameters = url.searchParams;
  const page = parameters.has("page")
    ? Number.parseInt(parameters.get("page") ?? "1")
    : 1;

  const [projects, featured] = await parallel(
    2,
    await Promise.all([
      fetch(`${API}/projects/?page=${page}`),
      fetch(`${API}/projects/featured`),
    ]),
    async (response) => await response.json(),
  );

  const data = await projectSchema.array().parseAsync(projects.result);
  const pages = Number.parseInt(projects.pages);

  return {
    projects: data,
    featured: shuffle(await projectSchema.array().parseAsync(featured.result)),
    pages,
    page,
  };
}) satisfies PageLoad;
