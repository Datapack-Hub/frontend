import { writable } from "svelte/store"
import { get } from 'idb-keyval';

export const isDark = writable(true)

export async function loadColorPref(): Promise<boolean> {
    return await get("dp_colorPref") ?? true
}

export const exampleProjects: Project[] = [
    {
        id: 1,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 2,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 3,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 4,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 5,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 1,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 2,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 3,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 4,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    },
    {
        id: 5,
        image: "https://picsum.photos/1920/1080",
        author: "Coolguy69420",
        name: "Funny Pack",
        description: "Haha funny exceedingly long and annoying description i might remove later from this page",
        slug: "funnypack",
        tags: ["funny"]
    }
]