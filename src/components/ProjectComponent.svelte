<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorNameFromID } from "$globals";
  import { fade } from "svelte/transition";

  export let project: Project;

  let author = "Loading...";
  let visible = false;

  (async () => {
    if (browser) author = await getAuthorNameFromID(project.author);
    visible = true
  })();
</script>

<div
  class="dark:bg-stone-800 bg-dark-white dark:text-white rounded-xl bg-cover flex my-1 items-center mx-2 w-full"
>
  <a href="/project/{project.url}">
    <img
      src={project.icon}
      alt="project icon"
      class="aspect-square bg-cover h-16 md:h-24 rounded-xl ml-4 mr-8"
    />
  </a>
  <div class="p-1 md:p-2">
    <a
      href="/project/{project.url}"
      class="ml-4 font-brand text-lg md:text-xl lg:text-2xl"
    >
      {project.title}
    </a>
    {#if visible}
    <a
      href="/user/{author.toLowerCase()}"
      class="ml-4 text-xs md:text-sm text-opacity-20"
      in:fade={{duration: 250}}
    >
      By {author}
    </a>
    {/if}
    <p class="m-4 text-sm md:text-base font-medium two-lines">{project.description}</p>
  </div>
</div>
