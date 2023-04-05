<script lang="ts">
  import { browser } from "$app/environment";
  import ProjectComponent from "$components/ProjectComponent.svelte";

  let data: Project[] = [];

  async function load() {
    if (browser) {
      const proj = await fetch(`https://api.datapackhub.net/projects/`);
      if (proj.ok) {
        const projectJson = (await proj.json()).result as Project[];
        data = projectJson;
        return;
      }
    }
  }
</script>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64"
>
  <div
    class="items-center md:items-start md:flex-row w-full h-screen pt-16 md:pt-16 overflow-auto"
  >
    {#await load()}
      <p class="dark:text-white font-black">
        hi we r loading plz be patient the cat is being a jerk...
      </p>
    {:then}
      <h1
        class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2"
      >
        Browse Datapacks
      </h1>
      <br />
      <div class="flex items-center md-5">
        <p class="dark:text-white font-bold">Sort:</p>
        <a
          href="?sort=updated"
          class="ml-2 mr-2 bg-orange-600 rounded-lg p-1 font-semibold"
          >Updated</a
        >
        <a
          href="?sort=trending"
          class="mr-2 text-orange-500 rounded-lg p-1 font-semibold bg-opacity-0 bg-orange-500 hover:bg-opacity-20"
          >Trending</a
        >
      </div>
      <div class="flex flex-col items-center w-full pt-5">
        {#each data ?? [] as project}
          <ProjectComponent {project} />
        {/each}
      </div>
    {/await}
  </div>
</main>
