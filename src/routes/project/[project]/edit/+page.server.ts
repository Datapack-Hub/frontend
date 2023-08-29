import { serverFetchAuthed } from "$lib/globals/functions";
import { projectSchema, versionSchema, type User } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
  const projectRequest = await serverFetchAuthed(
    "get",
    `/projects/get/${params.project}`,
    cookies
  );

  if (projectRequest.status === 404) {
    throw error(404, {
      message: "Silly boy!",
      description: "Doesn't exist, nerd!"
    });
  }

  const projectJson = await projectSchema.parseAsync(
    await projectRequest.json()
  );
  const meRequest = await serverFetchAuthed("get", "/user/me", cookies);

  if (meRequest.status === 401) {
    throw error(401, {
      message: "Please sign in.",
      description: "If you are signed in, then our server must be down. Sorry!"
    });
  }

  const me = (await meRequest.json()) as User;
  if (
    me.id === projectJson.author.id ||
    ["admin", "moderator"].includes(me.role)
  ) {
    const project = await serverFetchAuthed(
      "get",
      `/versions/project/${projectJson.ID}`,
      cookies
    );

    const projectResultJson = await project.json();
    const versionsRequest = await versionSchema
      .array()
      .parseAsync(projectResultJson.result);
    return {
      project: projectJson,
      versions: versionsRequest
    };
  }

  throw error(403, {
    message: "Not your project.",
    description: "Only the owner can edit this."
  });
}) satisfies PageServerLoad;
