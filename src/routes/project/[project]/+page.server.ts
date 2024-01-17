import { serverGetAuthed } from "$lib/globals/functions";
import { processMarkdown } from "$lib/globals/markdown";
import { projectSchema, versionSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, cookies, url }) => {
  const parameters = url.searchParams;

  const [projectRequest, versionsRequest] = await Promise.all([
    serverGetAuthed(`/projects/get/${params.project}`, cookies, fetch),
    serverGetAuthed(`/versions/project/url/${params.project}`, cookies, fetch)
  ]);

  if ([projectRequest.status, versionsRequest.status].includes(404)) {
    error(404, {
      message: projectRequest.statusText,
      description:
        "We've searched thoroughly, but found nothing except a few cobwebs. No project around here. Why don't you go ahead and turn the idea into a reality yourself?"
    });
  }

  if ([projectRequest, versionsRequest].some(request => !request.ok)) {
    error(projectRequest.status, {
      message: projectRequest.statusText,
      description: undefined
    });
  }

  const versionsJson = await versionsRequest.json();

  const [project, versions] = await Promise.all([
    projectSchema.parseAsync(await projectRequest.json()),
    versionSchema.array().parseAsync(versionsJson.result)
  ]);

  project.body = await processMarkdown(project.body ?? "No Body Specified!");

  return {
    project,
    versions,
    new: parameters.get("is_new")
  };
}) satisfies PageServerLoad;
