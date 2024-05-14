import { API } from "$lib/globals/consts/consts";
import { commentSchema, projectSchema } from "$lib/globals/consts/schema";
import { serverGetAuthed } from "$lib/globals/functions";
import { processMarkdown } from "$lib/globals/markdown";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, cookies, url }) => {
  const parameters = url.searchParams;

  const projectRequest = await serverGetAuthed(
    `/projects/get/${params.project}`,
    cookies,
    fetch
  );

  if (projectRequest.status === 404) {
    error(404, {
      message: projectRequest.status,
      description:
        "Welp, this is kinda awkward. You probably wanted to leave a quality comment, but sadly we couldn't find this project."
    });
  }

  if (!projectRequest.ok) {
    error(projectRequest.status, {
      message: projectRequest.statusText,
      description: undefined
    });
  }

  const project = await projectSchema.parseAsync(await projectRequest.json());

  const commentsRequest = await fetch(`${API}/comments/thread/${project.ID}`);
  const commentsJson = await commentsRequest.json();
  const comments = await commentSchema.array().parseAsync(commentsJson.result);

  for (const comment of comments) {
    comment.message = await processMarkdown(comment.message);
  }

  project.body = await processMarkdown(project.body ?? "No Body Specified!");
  project.author.bio = await processMarkdown(project.author.bio);
  return {
    project: project,
    comments: comments,
    new: parameters.get("is_new")
  };
}) satisfies PageServerLoad;
