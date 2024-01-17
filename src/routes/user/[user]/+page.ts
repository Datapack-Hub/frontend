import { fetchAuthed } from "$lib/globals/functions";
import { processMarkdown } from "$lib/globals/markdown";
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
    error(404, {
      message: user.statusText,
      description:
        "We couldn't find that entity. You may have hallucinated their existence"
    });
  }

  if ([user, projects].some(r => !r.ok)) {
    error(user.status, {
      message: user.statusText,
      description: undefined
    });
  }

  const projectResponseJson = await projects.json();
  const [profileJson, projectJson] = await Promise.all([
    userSchema.parseAsync(await user.json()),
    projectSchema.array().parseAsync(projectResponseJson.result)
  ]);

  const profileRole = get(roles).find(role => role.name === profileJson.role);
  const downloads = sum(projectJson, p => p.downloads ?? 0);

  profileJson.bio = await processMarkdown(profileJson.bio);

  return {
    profile: profileJson,
    projects: projectJson,
    role: profileRole,
    downloads: downloads
  };
}) satisfies PageLoad;
