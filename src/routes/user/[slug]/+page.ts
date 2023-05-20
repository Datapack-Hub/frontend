import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { apiURL } from "$lib/globals/consts";
import { fetchAuthed } from "$lib/globals/functions";
import { browser } from "$app/environment";

export const load = (async ({ params, fetch }) => {
  if(browser){
    const [user, projects, role] = await Promise.all([
      fetch(`${apiURL}/user/${params.slug}`),
      fetchAuthed("get",`${apiURL}/user/${params.slug}/projects`),
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
  
    throw error(user.status, {
      message: user.statusText,
      description: "Something went wrong",
    });
  }
}) satisfies PageLoad;
