import { apiURL } from '$globals';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const projectReq = await fetch(apiURL + "/projects/get/" + params.slug)
    if (projectReq.ok) {
      return {
        project: (await projectReq.json() as Project)
      };
    }
    return {};
}) satisfies PageLoad;