<script lang="ts">
  import { browser } from "$app/environment";
  import { apiURL, fetchAuthed, getAuthorNameFromID } from "$globals";

  export let project: Project;

  let author = "";

  (async () => {
    if (browser) author = await getAuthorNameFromID(project.author);
  })();
</script>

<div
  class="dark:bg-stone-800 bg-white dark:text-white rounded-xl bg-cover flex my-1 items-center mx-2 w-full"
>
  <img
    src={project.icon}
    alt="project icon"
    class="aspect-square bg-cover h-16 md:h-24 rounded-xl ml-4"
  />
  <div class="p-1 md:p-2">
    <a href="/project/{project.url}" class="ml-4 font-brand text-lg md:text-xl lg:text-2xl">
      {project.title}
    </a>
    <a href="/user/{author.toLowerCase()}" class="ml-4 text-xs md:text-sm text-opacity-20">
      By {author}
    </a>
    <p class="m-4 text-sm md:text-base font-medium">{project.description}</p>
  </div>
</div>
