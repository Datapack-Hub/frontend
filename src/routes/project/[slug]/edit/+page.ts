import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";
import {
  projectSchema,
  versionSchema,
  type User
} from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  if (browser) {
    const projectReq = await fetchAuthed("get", "/projects/get/" + params.slug);

    if (projectReq.status == 404) {
      throw error(404, {
        message: "Silly boy!",
        description: "Doesn't exist, nerd!"
      });
    }

    const projectJson = projectSchema.parse(await projectReq.json());
    const meReq = await fetchAuthed("get", "/user/me");

    if (meReq.status == 401) {
      throw error(401, {
        message: "Please sign in.",
        description:
          "If you are signed in, then our server must be down. Sorry!"
      });
    }

    const me = (await meReq.json()) as User;
    if (
      me.id == projectJson.author ||
      ["admin", "moderator"].includes(me.role)
    ) {
      const project = await fetchAuthed(
        "get",
        "/versions/project/" + projectJson.ID
      );

      const versionsReq = versionSchema
        .array()
        .parse((await project.json()).result);
      return {
        project: project,
        versions: versionsReq
      };
    }

    throw error(403, {
      message: "Not your project.",
      description: "Only the owner can edit this."
    });
  }
}) satisfies PageLoad;
