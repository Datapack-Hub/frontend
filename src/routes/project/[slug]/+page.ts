import { apiURL } from "$globals";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const projectReq = await fetch(apiURL + "/projects/get/" + params.slug);
  if (projectReq.ok) {
    const project = (await projectReq.json()) as Project;
    console.log(JSON.stringify(project));
    console.log(apiURL + "/versions/project/" + project.id);
    const versionsReq = await fetch(apiURL + "/versions/project/" + project.id);
    
    if (versionsReq.ok) {
      return {
        project: project,
        versions: (await versionsReq.json()).result as Version[],
      };
    } else if (!versionsReq.ok) {
      throw error(500, {
        message: "Idfk what went wrong",
        description: await versionsReq.text(),
      });
    }
  } else if (projectReq.status == 404) {
    throw error(404, {
      message: "Project not found",
      description: "Why not go ahead and turn the idea into a reality?",
    });
  }
  return {};
}) satisfies PageLoad;
