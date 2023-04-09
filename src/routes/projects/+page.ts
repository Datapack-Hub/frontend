import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
  const proj = await fetch(`https://api.datapackhub.net/projects/`);
  
  if (proj.ok) {
    const data = (await proj.json()).result as Project[]
    return {
      projects: data,
      sortMode: url.searchParams.has("sort") ? url.searchParams.get("sort") : "trending"
    };
  }

  return {};
}) satisfies PageLoad;