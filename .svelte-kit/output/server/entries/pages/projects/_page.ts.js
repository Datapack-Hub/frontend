const load = async ({ fetch, url }) => {
  const proj = await fetch(`https://api.datapackhub.net/projects/`);
  if (proj.ok) {
    const data = (await proj.json()).result;
    return {
      projects: data,
      sortMode: url.searchParams.has("sort") ? url.searchParams.get("sort") : "trending"
    };
  }
  return {};
};
export {
  load
};
