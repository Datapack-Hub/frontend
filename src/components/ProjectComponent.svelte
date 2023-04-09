<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorNameFromID } from "$globals";
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
  class="dark:bg-stone-800 bg-dark-white dark:text-white flex items-center rounded-xl my-1 w-full p-2"
>
    <a href="/project/{project.url}" class="">
      <img
        src={project.icon}
        alt="{project.title} icon"
        class="aspect-square bg-cover rounded-lg w-24"
      />
    </a>
    <div class="w-2/3 ml-4">
      <a
        href="/project/{project.url}"
        class="font-brand text-lg md:text-xl lg:text-2xl hover:underline"
      >
        {project.title}
      </a>
      {#if visible}
        <a
          href="/user/{author.toLowerCase()}"
          class="text-xs md:text-sm text-white text-opacity-40 hover:underline"
          in:fade={{ duration: 250 }}
        >
          By {author}
        </a>
      {/if}
      <p class="mt-2 text-sm md:text-base font-medium two-lines text-opacity-70 text-white">
        {project.description}
      </p>
    </div>
</div>
