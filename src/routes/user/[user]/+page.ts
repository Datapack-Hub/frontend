import { fetchAuthed } from "$lib/globals/functions";
import { projectSchema, userSchema } from "$lib/globals/schema";
import { roles } from "$lib/globals/stores";
import { error } from "@sveltejs/kit";
import { sum } from "radash";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async ({ params, fetch }) => {
  const [user, projects] = await Promise.all([
    fetchAuthed("get", `/user/${params.user}`, { fetchFunction: fetch }),
    fetchAuthed("get", `/user/${params.user}/projects`, {
      fetchFunction: fetch
    })
  ]);

  if (user.status === 404) {
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

  const projectResponseJson = await projects.json();
  const [profileJson, projectJson] = await Promise.all([
    userSchema.parseAsync(await user.json()),
    projectSchema.array().parseAsync(projectResponseJson.result)
  ]);

  const profileRole = get(roles).find(role => role.name === profileJson.role);
  const downloads = sum(projectJson, p => p.downloads ?? 0);

  return {
    profile: profileJson,
    projects: projectJson,
    role: profileRole,
    downloads: downloads
  };
}) satisfies PageLoad;
