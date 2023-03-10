import { writable } from "svelte/store"
import { get } from 'idb-keyval';

export const isDark = writable(true)

export async function loadColorPref(): Promise<boolean> {
    return await get("dp_colorPref") ?? true
}