import { browser } from "$app/environment";
import { apiURL } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
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
      (await user.json()) as User,
      (await projects.json()).result as Project[]
    ]);

    const profileRole: Role = (await role.json()).roles.find(
      (v: Role) => v.name == profileJson?.role
    );

    return {
      profile: profileJson,
      projects: projectJson,
      role: profileRole
    };
  }
}) satisfies PageLoad;
