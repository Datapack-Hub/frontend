<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorFromID } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";

  export let project: Project;

  let author: User;
  let visible = false;

  (async () => {
    if (browser) author = await getAuthorFromID(project.author);
    visible = true;
  })();
</script>

<div
  class="flex w-full items-center rounded-xl bg-pearl-lusta-200 p-2 text-pearl-lusta-950 dark:bg-stone-800 dark:text-white">
  <a
    href="/project/{project.url}"
    class="rounded-lg bg-pearl-lusta-300 dark:bg-stone-700 dark:text-pearl-lusta-100 {project.icon
      ? ''
      : 'p-4'}">
    {#if project.icon}
      <img
        src="{project.icon}"
        alt="{project.title} icon"
        class="aspect-square w-20 rounded-lg bg-cover" />
    {:else}
      <IconNoPhoto width="48" height="48" />
    {/if}
  </a>
  <div class="ml-4 w-2/3">
    <a
      href="/project/{project.url}"
      class="font-brand text-lg hover:underline md:text-xl lg:text-2xl">
      {project.title}
    </a>
    {#if visible}
      <a
        href="/user/{author.username.toLowerCase()}"
        class="text-xs text-pearl-lusta-950 text-opacity-40 hover:underline dark:text-white dark:hover:text-blue-300 md:text-sm"
        in:fade="{{ duration: 250 }}">
        By {author.username}
      </a>
    {/if}
    <p
      class=" mt-2 line-clamp-2 text-sm font-medium text-pearl-lusta-950 text-opacity-70 dark:text-pearl-lusta-100 md:text-base">
      {project.description}
    </p>
  </div>
</div>
