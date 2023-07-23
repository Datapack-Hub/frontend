import { API } from "$lib/globals/consts";
import { serverFetchAuthed } from "$lib/globals/functions";
import {
  commentSchema,
  projectSchema,
  roleSchema,
  versionSchema
} from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, cookies }) => {
  const [projectReq, versionsReq, rolesReq] = await Promise.all([
    serverFetchAuthed("get", `/projects/get/${params.project}`, cookies),
    serverFetchAuthed(
      "get",
      `/versions/project/url/${params.project}`,
      cookies
    ),
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
}) satisfies PageServerLoad;
