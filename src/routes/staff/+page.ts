import { browser } from '$app/environment';
import { apiURL } from '$globals';

export const load = (async ({ fetch }) => {
    if(browser){
        const admins = await fetch(`${apiURL}/user/staff/admin`)
        const moderators = await fetch(`${apiURL}/user/staff/moderator`)
        const devs = await fetch(`${apiURL}/user/staff/developer`)
        const helpers = await fetch(`${apiURL}/user/staff/helper`)
        
        if(admins.ok){
            const adminsJSON = (await admins.json()).values as User[]
            const moderatorsJSON = (await moderators.json()).values as User[]
            const devsJSON = (await devs.json()).values as User[]
            const helpersJSON = (await helpers.json()).values as User[]

            const data = adminsJSON.concat(moderatorsJSON,devsJSON, helpersJSON)
            return {
                staff: data
            }
        }
    }
})