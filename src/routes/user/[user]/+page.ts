import { browser } from "$app/environment";
import { API } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
import { projectSchema, userSchema } from "$lib/globals/schema";
import { roles } from "$lib/globals/stores";
import { error } from "@sveltejs/kit";
import { sum } from "radash";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async ({ params, fetch }) => {
  if (browser) {
    const [user, projects] = await Promise.all([
      fetch(`${API}/user/${params.user}`),
      fetchAuthed("get", `/user/${params.user}/projects`),
    ]);

    if (user.status == 404) {
      throw error(404, {
        message: "User not found",
        description: "You may have hallucinated their existence"
      });
    }

    if ([user, projects].some(r => !r.ok)) {
      throw error(user.status, {
        message: "Unexpected error",
        description: "Something unexpected happen, try again later"
      });
    }

    const [profileJson, projectJson] = await Promise.all([
      userSchema.parseAsync(await user.json()),
      projectSchema.array().parseAsync((await projects.json()).result),
    ]);

    const profileRole = get(roles).find(v => v.name == profileJson.role);

    const downloads: number = sum(projectJson, p => p.downloads ?? 0);

    return {
      profile: profileJson,
      projects: projectJson,
      role: profileRole,
      downloads: downloads
    };
  }

  return {
    downloads: 0
  };
}) satisfies PageLoad;
