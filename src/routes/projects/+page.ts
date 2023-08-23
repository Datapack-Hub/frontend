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
      fetch(`${API}/projects/featured`)
    ]),
    async response => await response.json()
  );

  const [parsedData, parsedFeatured] = await parallel(
    2,
    [projects.result, featured.result],
    async json => {
      return await projectSchema.array().parseAsync(json);
    }
  );

  const pages = Number.parseInt(projects.pages);

  return {
    projects: parsedData,
    featured: shuffle(parsedFeatured),
    pages,
    page
  };
}) satisfies PageLoad;
