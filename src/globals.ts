import { writable } from "svelte/store"

export const isDark = writable(true)

export function loadColorPref(): boolean {
    return localStorage.getItem("dp_colorPref") === 'true'
}