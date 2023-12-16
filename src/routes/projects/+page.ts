import { API } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  const parameters = url.searchParams;
  const page = Number.parseInt(parameters.get("page") || "1");
  const sort = parameters.get("sort") || "downloads";
  const category = parameters.get("category");

  const [projects, featured] = await parallel(
    2,
    await Promise.all([
      fetch(
        `${API}/projects?page=${page}&sort=${sort}${
          category ? `&category=${category}` : ""
        }`
      ),
      fetch(`${API}/projects/featured`)
    ]),
    async response => await response.json()
  );

  const [parsedData, parsedFeatured] = await parallel(
    2,
    [projects.projects, featured],
    async json => {
      return await projectSchema.array().parseAsync(json);
    }
  );

  const pages = Number.parseInt(projects.pages);

  return {
    projects: parsedData,
    featured: shuffle(parsedFeatured),
    pages,
    page,
    category
  };
}) satisfies PageLoad;
