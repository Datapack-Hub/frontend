import { API } from "$lib/globals/consts";
import { serverGetAuthed } from "$lib/globals/functions";
import { processMarkdown } from "$lib/globals/markdown";
import { commentSchema, projectSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, cookies, url }) => {
  const parameters = url.searchParams;

  const projectRequest = await serverGetAuthed(
    `/projects/get/${params.project}`,
    cookies,
    fetch
  );

  if (projectRequest.status == 404) {
    throw error(404, {
      message: "Project not found",
      description: "Why not go ahead and turn the idea into a reality?"
    });
  }

  if (!projectRequest.ok) {
    throw error(projectRequest.status, {
      message: "Unexpected error",
      description: "Something unexpected happen, try again later"
    });
  }

  const project = await projectSchema.parseAsync(await projectRequest.json());

  const commentsRequest = await fetch(`${API}/comments/thread/${project.ID}`);
  const commentsJson = await commentsRequest.json();
  const comments = await commentSchema.array().parseAsync(commentsJson.result);

  for (const comment of comments) {
    comment.message = await processMarkdown(comment.message);
    for (const reply of comment.replies) {
      reply.message = await processMarkdown(reply.message);
    }
  }

  project.body = await processMarkdown(project.body ?? "No Body Specified!");
  project.author.bio = await processMarkdown(project.author.bio);
  return {
    project: project,
    comments: comments,
    new: parameters.get("is_new")
  };
}) satisfies PageServerLoad;
