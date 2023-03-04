import type { PageLoad } from './$types';
 
export const load = (async ({ fetch }) => {
    const res = await fetch("https://api.datapackhub.net/user/me", {
        method: 'get',
    })
    let data;


    if(res.ok) {
        data = await res.json()
        console.log(data)
    }
    return {
        profile: data
    };
}) satisfies PageLoad;