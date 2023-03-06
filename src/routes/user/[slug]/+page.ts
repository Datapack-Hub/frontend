import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const res = await fetch(`https://api.datapackhub.net/user/${params.slug}`)
    if (res.ok) {
        const data = await res.json()
        return {
            data
        };
    }
 
  throw error(404, 'Not found');
}) satisfies PageLoad;