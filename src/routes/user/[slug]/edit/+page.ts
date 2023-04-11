import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { apiURL, fetchAuthed } from '$globals';
import { browser } from '$app/environment';

export const load = (async ({ params, fetch }) => {
    if(browser){
        const user = await fetchAuthed("get", apiURL +"/user/" + params.slug)
        if(user.ok){
            return {
                profile: await user.json() as User
            }
        }
    }
}) satisfies PageLoad;