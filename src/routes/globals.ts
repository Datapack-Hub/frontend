import { writable } from "svelte/store"
import { get } from 'idb-keyval';

export const isDark = writable(true)

export async function loadColorPref(): Promise<boolean> {
    return await get("dp_colorPref") ?? true
}

export function loadRoleColour(role: string): string {
    switch(role){
        case "admin": {
           return "red-500"
        }
        case "moderator":{
           return "orange-500"
        }
        case "developer": {
           return "lime-500";
        }
        case "helper": {
           return "blue-500"
        }
        default: {
           return "dark:text-white"
        }
     }
}