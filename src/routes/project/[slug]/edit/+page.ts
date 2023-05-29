import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { fetchAuthed } from "$lib/globals/functions";
import { apiURL } from "$lib/globals/consts";
import { browser } from "$app/environment";

export const load = (async ({ params }) => {
  if (browser) {
    const projectReq = await fetchAuthed(
      "get",
      apiURL + "/projects/get/" + params.slug
    );

    if (projectReq.ok) {
      const projectJson = (await projectReq.json()) as Project;
      const meReq = await fetchAuthed("get", "/user/me");

      if (meReq.ok) {
        const meJson = (await meReq.json()) as User;
        if (
          meJson.id == projectJson.author ||
          ["admin", "moderator"].includes(meJson.role)
        ) {
          const versionsReq = (
            await (
              await fetchAuthed(
                "get",
                apiURL + "/versions/project/" + projectJson.ID
              )
            ).json()
          ).result as Version[];
          return {
            project: projectJson,
            versions: versionsReq
          };
        }

        throw error(403, {
          message: "Not your project.",
          description: "Only the owner can edit this."
        });
      }

      throw error(401, {
        message: "Please sign in.",
        description:
          "If you are signed in, then our server must be down. Sorry!"
      });
    }

    throw error(404, {
      message: "Silly boy!",
      description: "Doesn't exist, nerd!"
    });
  }
}) satisfies PageLoad;
