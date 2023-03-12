<script lang="ts">
  import { browser } from "$app/environment";

  export let project: Project;

  let author = "";

  (async () => {
    if (!browser) return;
    let res = await fetch(`https://api.datapackhub.net/user/id/${project.author}`);
    author = ((await res.json()) as User).username;
  })();
</script>

<div
  class="dark:bg-stone-800 bg-white dark:text-white rounded-xl bg-cover flex my-1 items-center mx-2"
>
  <img
    src={project.icon}
    alt="project icon"
    class="aspect-square bg-cover h-16 md:h-24 rounded-xl ml-4"
  />
  <div class="p-1 md:p-2">
    <p class="ml-4 font-brand text-lg md:text-xl lg:text-2xl">
      {project.title}
    </p>
    <p class="ml-4 text-xs md:text-sm text-opacity-20">
      By {author}
    </p>
    <p class="m-4 text-sm md:text-base">{project.description}</p>
  </div>
</div>
