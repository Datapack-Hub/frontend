import { serverGetAuthed } from "$lib/globals/functions";
import { projectSchema, reportSchema, roleSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import { parallel } from "radash";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies, fetch }) => {
  try {
    const [pq, rq, rp, r] = await parallel(
      4,
      await Promise.all([
        serverGetAuthed("/moderation/queue/publish", cookies, fetch),
        serverGetAuthed("/moderation/queue/review", cookies, fetch),
        serverGetAuthed("/moderation/queue/report", cookies, fetch),
        serverGetAuthed("/user/staff/roles", cookies, fetch)
      ]),
      async (response: Response) => {
        if (response.ok) return await response.json();
        else {
          throw error(response.status, {
            message: response.statusText
          });
        }
      }
    );

    return {
      publishQueue: await projectSchema.array().parseAsync(pq.projects),
      reviewQueue: await projectSchema.array().parseAsync(rq.projects),
      reports: await reportSchema.array().parseAsync(rp.reports),
      rolesJson: await roleSchema.array().parseAsync(r.roles)
    };
  } catch (error_) {
    for (const error2 of (error_ as AggregateError).errors) {
      throw error(error2.status, error2.body);
    }
  }
}) satisfies PageServerLoad;
