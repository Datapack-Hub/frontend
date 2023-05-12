import { apiURL } from "$lib/globals/consts";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const projectReq = await fetch(apiURL + "/projects/get/" + params.slug);
  if (projectReq.ok) {
    const project = (await projectReq.json()) as Project;
    const versionsReq = await fetch(apiURL + "/versions/project/" + project.ID);

    if (versionsReq.ok) {
      return {
        project: project,
        versions: (await versionsReq.json()).result as Version[],
      };
    }

    throw error(500, {
      message: "Something went wrong?",
      description: await versionsReq.text(),
    });
  } else if (projectReq.status == 404) {
    throw error(404, {
      message: "Project not found",
      description: "Why not go ahead and turn the idea into a reality?",
    });
  }
  return {};
}) satisfies PageLoad;
