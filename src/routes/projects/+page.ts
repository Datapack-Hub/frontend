import { API } from "$lib/globals/consts";
import { projectSchema } from "$lib/globals/schema";
import { parallel, shuffle } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, url }) => {
  const parameters = url.searchParams;
  const page = Number.parseInt(parameters.get("page") || "1");
  const sort = parameters.get("sort") || "Downloads";
  const category = parameters.get("category") || "All";
  const query = parameters.get("query") || "";

  const [projects, featured] = await parallel(
    2,
    await Promise.all([
      fetch(
        `${API}/projects/search?page=${page}&query=${query}&sort=${sort.toLowerCase()}${
          category === "All" ? "" : `&category=${encodeURIComponent(category)}`
        }`
      ),
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

  const pages = projects.pages;
  const count = projects.count;

  return {
    projects: parsedData,
    featured: shuffle(parsedFeatured),
    pages,
    page: Math.max(Math.min(page, pages), 1),
    category,
    count,
    query,
    sort
  };
}) satisfies PageLoad;
