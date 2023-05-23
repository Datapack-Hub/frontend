<script lang="ts">
  import { user } from "$lib/globals/stores";
  import { goto } from "$app/navigation";
  import { fetchAuthed } from "$lib/globals/functions";
  import { apiURL } from "$lib/globals/consts";
  import ProjectComponent from "$lib/components/ProjectComponent.svelte";

  let projects: Project[];

  async function loadStuff() {
    if ($user.role == "default") {
      goto("/");
    }

    let q = await fetchAuthed("get", `${apiURL}/moderation/queue/publish`);
    projects = (await q.json())["projects"] as Project[];
  }
</script>

<svelte:head>
  <title>Project Queue | Datapack Hub</title>
</svelte:head>

<main
  class="bg-new-white-200 overflow-y-scroll px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="min-h-screen w-full flex-col md:flex-row md:items-start md:pt-5">
    <h1
      class="mt-16 pb-2 text-center font-brand text-3xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Project publication queue
    </h1>
    {#await loadStuff() then}
      <p class="my-2 font-brand dark:text-white">
        There are {projects.length} items awaiting approval:
      </p>
      {#each projects ?? [] as proj}
        <ProjectComponent project="{proj}" />
      {/each}
    {/await}
  </div>
</main>
