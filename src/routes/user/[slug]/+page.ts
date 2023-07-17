import { browser } from "$app/environment";
import { apiURL } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
import type { Role } from "$lib/globals/schema";
import { projectSchema, userSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params, fetch }) => {
  if (browser) {
    const [user, projects, role] = await Promise.all([
      fetch(`${apiURL}/user/${params.slug}`),
      fetchAuthed("get", `/user/${params.slug}/projects`),
      fetch(`${apiURL}/user/staff/roles`)
    ]);

    if (user.status == 404) {
      throw error(404, {
        message: "User not found",
        description: "You may have hallucinated their existence"
      });
    }

    if ([user, projects, role].every(r => !r.ok)) {
      throw error(user.status, {
        message: "Unexpected error",
        description: "Something unexpected happen, try again later"
      });
    }

    const [profileJson, projectJson] = await Promise.all([
      userSchema.parseAsync(await user.json()),
      projectSchema.array().parseAsync((await projects.json()).result)
    ]);

    const profileRole: Role = (await role.json()).roles.find(
      (v: Role) => v.name == profileJson?.role
    );

    let downloads: number = 0;

    projectJson.forEach(i => {
      if (i.downloads) {
        downloads = downloads + i.downloads;
      }
    });

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
