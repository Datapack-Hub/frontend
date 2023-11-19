import { serverGetAuthed } from "$lib/globals/functions";
import { type User, projectSchema, versionSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies, fetch }) => {
  const projectRequest = await serverGetAuthed(
    `/projects/get/${params.project}`,
    cookies,
    fetch,
  );

  if (projectRequest.status === 404) {
    throw error(404, {
      message: "Silly boy!",
      description: "Doesn't exist, nerd!",
    });
  }

  const projectJson = await projectSchema.parseAsync(await projectRequest.json());
  const meRequest = await serverGetAuthed("/user/me", cookies, fetch);

  if (meRequest.status === 401) {
    throw error(401, {
      message: "Please sign in.",
      description: "If you are signed in, then our server must be down. Sorry!",
    });
  }

  const me = (await meRequest.json()) as User;
  if (me.id === projectJson.author.id || ["admin", "moderator"].includes(me.role)) {
    const project = await serverGetAuthed(
      `/versions/project/${projectJson.ID}`,
      cookies,
      fetch,
    );

    const projectResultJson = await project.json();
    const versionsRequest = await versionSchema
      .array()
      .parseAsync(projectResultJson.result);
    return {
      project: projectJson,
      versions: versionsRequest,
    };
  }

  throw error(403, {
    message: "Not your project.",
    description: "Only the owner can edit this.",
  });
}) satisfies PageServerLoad;
