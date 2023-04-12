import { browser } from '$app/environment';
import { apiURL, fetchAuthed } from '$globals';

export const load = (async ({ fetch }) => {
    if(browser){
        const unread = await fetchAuthed("get",`${apiURL}/notifs/`)
        if(unread.ok){
            const notifsJSON = (await unread.json()).result as DPHNotification[]

            return {
                notifications: notifsJSON
            }   
        }else{
            alert("hi is error")
        }
    }
})