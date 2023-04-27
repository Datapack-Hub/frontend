import { apiURL } from "$globals";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const projectReq = await fetch(apiURL + "/projects/get/" + params.slug);
  if (projectReq.ok) {
    return {
      project: (await projectReq.json()) as Project,
    };
  }else if(projectReq.status == 404) {
    throw error(404, {
        message: "Project not found",
        description: "Why not go ahead and turn the idea into a reality?",
      });
  }
  return {};
}) satisfies PageLoad;
