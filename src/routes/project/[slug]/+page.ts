import { browser } from "$app/environment";
import { API } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import {
  commentSchema,
  projectSchema,
  roleSchema,
  versionSchema
} from "$lib/globals/schema";

export const load = (async ({ params, fetch }) => {
  if (browser) {
    const [projectReq, versionsReq, rolesReq] = await Promise.all([
      fetchAuthed("get", `/projects/get/${params.slug}`),
      fetchAuthed("get", `/versions/project/url/${params.slug}`),
      fetch(`${API}/user/staff/roles`)
    ]);

    if ([projectReq, versionsReq, rolesReq].every(r => r.ok)) {
      const [project, versions, roles] = await Promise.all([
        projectSchema.parseAsync(await projectReq.json()),
        versionSchema.array().parseAsync((await versionsReq.json()).result),
        roleSchema.array().parseAsync((await rolesReq.json()).roles)
      ]);

      const commentsReq = await fetch(`${API}/comments/thread/${project.ID}`);
      const comments = commentSchema
        .array()
        .parse((await commentsReq.json()).result);

      return {
        project: project,
        versions: versions,
        roles: roles,
        comments: comments
      };
    } else if (projectReq.status == 404) {
      throw error(404, {
        message: "Project not found",
        description: "Why not go ahead and turn the idea into a reality?"
      });
    } else {
      throw error(projectReq.status, {
        message: "Unexpected error"
        // description: "Something unexpected happen, try again later"
      });
    }
  }
}) satisfies PageLoad;
