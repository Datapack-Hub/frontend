import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { apiURL } from "$lib/globals/functions";

export const load = (async ({ params, fetch }) => {
  const [user, projects, role] = await Promise.all([
    fetch(`${apiURL}/user/${params.slug}`),
    fetch(`${apiURL}/user/${params.slug}/projects`),
    fetch(`${apiURL}/user/staff/roles`),
  ]);

  if (user.status == 404) {
    throw error(404, {
      message: "User not found",
      description: "You may have hallucinated their existence",
    });
  }

  if (user.ok && projects.ok && role.ok) {
    const [profileJson, projectJson] = await Promise.all([
      (await user.json()) as User,
      (await projects.json()).result as Project[],
    ]);
    const profileRole: Role = (await role.json()).roles.find(
      (v: Role) => v.name == profileJson?.role
    );
    return {
      profile: profileJson,
      projects: projectJson,
      role: profileRole,
    };
  }
  return {};
}) satisfies PageLoad;
