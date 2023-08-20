import { serverFetch } from "$lib/globals/functions";
import { projectSchema, reportSchema, roleSchema } from "$lib/globals/schema";
import { error } from "@sveltejs/kit";
import { parallel } from "radash";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  try {
    const [pq, rq, rp, r] = await parallel(
      4,
      await Promise.all([
        serverFetch("get", "/moderation/queue/publish", cookies),
        serverFetch("get", "/moderation/queue/review", cookies),
        serverFetch("get", "/moderation/queue/report", cookies),
        serverFetch("get", "/user/staff/roles", cookies)
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
