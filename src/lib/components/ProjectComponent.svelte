<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorNameFromID } from "$lib/globals/functions";
  import { fade } from "svelte/transition";

  export let project: Project;

  let author = "Loading...";
  let visible = false;

  (async () => {
    if (browser) author = await getAuthorNameFromID(project.author);
    visible = true;
  })();
</script>

<div
  class="my-1 flex w-full items-center rounded-xl bg-new-white-300 p-2 dark:bg-stone-800 dark:text-white">
  <a href="/project/{project.url}" class="">
    <img
      src="{project.icon}"
      alt="{project.title} icon"
      class="aspect-square w-24 rounded-lg bg-cover" />
  </a>
  <div class="ml-4 w-2/3">
    <a
      href="/project/{project.url}"
      class="font-brand text-lg hover:underline md:text-xl lg:text-2xl">
      {project.title}
    </a>
    {#if visible}
      <a
        href="/user/{author.toLowerCase()}"
        class="text-xs text-opacity-40 hover:underline dark:text-white md:text-sm"
        in:fade="{{ duration: 250 }}">
        By {author}
      </a>
    {/if}
    <p
      class=" mt-2 line-clamp-2 text-sm font-medium text-opacity-70 dark:text-white md:text-base">
      {project.description}
    </p>
  </div>
</div>
