import type { PageLoad } from './$types';

export const load = (async ({}) => {
    {
    let rawRandProj = await fetch(`${apiURL}/projects/random`)

    let randProjJSON = await rawRandProj.json()

    return {
    project: randProjJSON
    };
}

    return {};
}) satisfies PageLoad;

