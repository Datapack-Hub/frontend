import { serverFetchAuthed } from "$lib/globals/functions";
import { projectSchema, versionSchema, type User } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
  const projectReq = await serverFetchAuthed(
    "get",
    "/projects/get/" + params.project
  );

  if (projectReq.status == 404) {
    throw error(404, {
      message: "Silly boy!",
      description: "Doesn't exist, nerd!"
    });
  }

  const projectJson = projectSchema.parse(await projectReq.json());
  const meReq = await serverFetchAuthed("get", "/user/me", cookies);

  if (meReq.status == 401) {
    throw error(401, {
      message: "Please sign in.",
      description: "If you are signed in, then our server must be down. Sorry!"
    });
  }

  const me = (await meReq.json()) as User;
  if (
    me.id == projectJson.author.id ||
    ["admin", "moderator"].includes(me.role)
  ) {
    const project = await serverFetchAuthed(
      "get",
      "/versions/project/" + projectJson.ID,
      cookies
    );

    const versionsReq = versionSchema
      .array()
      .parse((await project.json()).result);
    return {
      project: projectJson,
      versions: versionsReq
    };
  }

  throw error(403, {
    message: "Not your project.",
    description: "Only the owner can edit this."
  });
}) satisfies PageServerLoad;
