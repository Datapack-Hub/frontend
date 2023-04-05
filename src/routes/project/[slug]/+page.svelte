<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { fetchAuthed, apiURL } from "$globals";
    let url = $page.params.slug

    let project: Project;

    async function load() {
        if (browser) {
            let proj = await fetchAuthed("get",apiURL + "/projects/get/" + url)
            if(proj.ok){
                const projectJson = (await proj.json()) as Project;
                project = projectJson
            }
        }
    }
</script>

<main class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64">
    {#if project != undefined}
    <p>yes!</p>
    {:else}
    <p>no!</p>
    {/if}
</main>