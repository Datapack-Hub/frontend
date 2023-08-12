import { API } from "$lib/globals/consts";
import { serverFetch } from "$lib/globals/functions";
import {
  commentSchema,
  projectSchema,
  versionSchema,
} from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, cookies, url }) => {
  const parameters = url.searchParams;

  const [projectRequest, versionsRequest] = await Promise.all([
    serverFetch("get", `/projects/get/${params.project}`, cookies),
    serverFetch("get", `/versions/project/url/${params.project}`, cookies),
  ]);

  if ([projectRequest, versionsRequest].every((r) => r.ok)) {
    const versionsJson = await versionsRequest.json();

    const [project, versions] = await Promise.all([
      projectSchema.parseAsync(await projectRequest.json()),
      versionSchema.array().parseAsync(versionsJson.result),
    ]);

    const commentsRequest = await fetch(`${API}/comments/thread/${project.ID}`);
    const commentsJson = await commentsRequest.json();
    const comments = await commentSchema
      .array()
      .parseAsync(commentsJson.result);

    return {
      project: project,
      versions: versions,
      comments: comments,
      is_new: parameters.get("is_new"),
    };
  } else if (projectRequest.status == 404) {
    throw error(404, {
      message: "Project not found",
      description: "Why not go ahead and turn the idea into a reality?",
    });
  } else {
    throw error(projectRequest.status, {
      message: "Unexpected error",
      description: "Something unexpected happen, try again later",
    });
  }
}) satisfies PageServerLoad;
