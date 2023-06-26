import { browser } from "$app/environment";
import { apiURL } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { projectSchema, roleSchema, versionSchema } from "$lib/globals/schema";

export const load = (async ({ params, fetch }) => {
  if (browser) {
    const [projectReq, versionsReq, rolesReq] = await Promise.all([
      fetchAuthed("get", `/projects/get/${params.slug}`),
      fetchAuthed("get", `/versions/project/url/${params.slug}`),
      fetch(`${apiURL}/user/staff/roles`)
    ]);

    if ([projectReq, versionsReq, rolesReq].every(r => r.ok)) {
      const project = projectSchema.parse(await projectReq.json());
      const versions = versionSchema
        .array()
        .parse((await versionsReq.json()).result);
      const roles = roleSchema.array().parse((await rolesReq.json()).roles);

      return {
        project: project,
        versions: versions,
        roles: roles
      };
    } else if (projectReq.status == 404) {
      throw error(404, {
        message: "Project not found",
        description: "Why not go ahead and turn the idea into a reality?"
      });
    } else {
      throw error(projectReq.status, {
        message: "Unexpected error",
        description: "Something unexpected happen, try again later"
      });
    }
  }
}) satisfies PageLoad;
