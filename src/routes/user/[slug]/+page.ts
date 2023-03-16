import { fetchAuthed } from '$globals';
import { error } from '@sveltejs/kit';
import type { LayoutServerData } from './$types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const [user, projects] = await Promise.all(
    [
      fetchAuthed("get", `https://api.datapackhub.net/user/${params.slug}`),
      fetchAuthed("get", `https://api.datapackhub.net/user/${params.slug}/projects`)
    ]
  )
  if (user.ok && projects.ok) {
    const profileJson = await user.json() as User
    const projectJson = (await projects.json()).result as Project[]
    return {
      profile: profileJson,
      projects: projectJson
    };
  }
  const projectText = await projects.text() as string;
  console.log(projects.status + ` | https://api.datapackhub.net/user/${params.slug}/projects` + ` | ${projectText}`)
  throw error(user.status, user.statusText);
}) satisfies LayoutServerData;