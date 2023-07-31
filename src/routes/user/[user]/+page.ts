import { browser } from "$app/environment";
import { API } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
import { projectSchema, roleSchema, userSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import { sum } from "radash";
import type { PageLoad } from "./$types";

export const load = (async ({ params, fetch }) => {
  if (browser) {
    const [user, projects, role] = await Promise.all([
      fetch(`${API}/user/${params.user}`),
      fetchAuthed("get", `/user/${params.user}/projects`),
      fetch(`${API}/user/staff/roles`),
    ]);

    if (user.status == 404) {
      throw error(404, {
        message: "User not found",
        description: "You may have hallucinated their existence",
      });
    }

    if ([user, projects, role].some((r) => !r.ok)) {
      throw error(user.status, {
        message: "Unexpected error",
        description: "Something unexpected happen, try again later",
      });
    }

    const [profileJson, projectJson, rolesJson] = await Promise.all([
      userSchema.parseAsync(await user.json()),
      projectSchema.array().parseAsync((await projects.json()).result),
      roleSchema.array().parseAsync((await role.json()).roles)
    ]);

    const profileRole = rolesJson.find(
      v => v.name == profileJson.role,
    );

    const downloads: number = sum(projectJson, (p) => p.downloads ?? 0);

    return {
      profile: profileJson,
      projects: projectJson,
      role: profileRole,
      downloads: downloads,
    };
  }

  return {
    downloads: 0,
  };
}) satisfies PageLoad;
