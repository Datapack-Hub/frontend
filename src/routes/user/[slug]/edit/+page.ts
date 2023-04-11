import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { apiURL, fetchAuthed, userData } from '$globals';
import { browser } from '$app/environment';

export const load = (async ({ params, fetch }) => {
    if(browser){
        const user = await fetchAuthed("get", apiURL +"/user/" + params.slug)
        const me = await fetchAuthed("get", apiURL + "/user/me")

        const userJSON = await user.json() as User
        const meJSON = await me.json() as User
        if(user.ok && me.ok){
            if (userJSON.username != meJSON.username && !["admin","moderator"].includes(meJSON.role)) {
                throw error(403, {message: 'Not allowed!',description: "This is not you, you can't edit their profile."}) 
            }

            return {
                profile: userJSON as User
            }
        }
    }
}) satisfies PageLoad;