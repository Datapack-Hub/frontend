import { API } from "$lib/globals/consts";
import { serverFetchAuthed } from "$lib/globals/functions";
import {
  commentSchema,
  projectSchema,
  versionSchema
} from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, cookies }) => {
  const [projectReq, versionsReq] = await Promise.all([
    serverFetchAuthed("get", `/projects/get/${params.project}`, cookies),
    serverFetchAuthed("get", `/versions/project/url/${params.project}`, cookies)
  ]);

  if ([projectReq, versionsReq].every(r => r.ok)) {
    const [project, versions] = await Promise.all([
      projectSchema.parseAsync(await projectReq.json()),
      versionSchema.array().parseAsync((await versionsReq.json()).result)
    ]);

    const commentsReq = await fetch(`${API}/comments/thread/${project.ID}`);
    const comments = await commentSchema
      .array()
      .parseAsync((await commentsReq.json()).result);

    return {
      project: project,
      versions: versions,
      comments: comments
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
}) satisfies PageServerLoad;
