import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  const [user, projects] = await Promise.all([
    fetch(`https://api.datapackhub.net/user/${params.slug}`),
    fetch(`https://api.datapackhub.net/user/${params.slug}/projects`),
  ]);

    
  if (user.status == 404) {
    throw error(404, {
      message: 'User not found',
      description: "You may have hallucinated their existence"
    })
  }

  if (user.ok && projects.ok) {
    const profileJson = (await user.json()) as User;
    const projectJson = (await projects.json()).result as Project[];
    return {
      profile: profileJson,
      projects: projectJson,
    }
  }
  return {};
}) satisfies PageLoad;