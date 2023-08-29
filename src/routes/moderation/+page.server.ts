import { serverFetchAuthed } from "$lib/globals/functions";
import { projectSchema, reportSchema, roleSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import { parallel } from "radash";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  try {
    const [pq, rq, rp, r] = await parallel(
      4,
      await Promise.all([
        serverFetchAuthed("get", "/moderation/queue/publish", cookies),
        serverFetchAuthed("get", "/moderation/queue/review", cookies),
        serverFetchAuthed("get", "/moderation/queue/report", cookies),
        serverFetchAuthed("get", "/user/staff/roles", cookies)
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
