<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorFromID } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import TrendUpIcon from "~icons/tabler/TrendingUp.svelte";
  import TrophyIcon from "~icons/tabler/Trophy.svelte";
  import DiceIcon from "~icons/tabler/Dice.svelte";
  import tippy from "sveltejs-tippy";

  export let project: Project;
  
  let author: User;
  let visible = false;

  (async () => {
    if (browser) author = await getAuthorFromID(project.author);
    visible = true;
  })();
</script>

<div
  class="w-full items-center rounded-xl relative bg-pearl-lusta-200 p-3 text-pearl-lusta-950 dark:bg-stone-800 dark:text-white">
  <div class="flex items-center">
    <a
      href="/project/{project.url}"
      class="rounded-lg {project.icon
        ? ''
        : 'bg-pearl-lusta-300 p-4 dark:bg-stone-700 dark:text-pearl-lusta-100'}">
      {#if project.icon}
        <img
          loading="lazy"
          src="{project.icon}"
          alt="{project.title} icon"
          width="96"
          height="96"
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
        <div
          class="flex space-x-2 text-md text-pearl-lusta-950/40 dark:text-white font-brand">
          <a
            href="/user/{author.username.toLowerCase()}"
            class="block dark:hover:text-pearl-lusta-100"
            in:fade="{{ duration: 250 }}">
            {author.username}
          </a>
          <span>•</span>
          <span>1.19</span>
          <span>•</span>
          <span>Beta 1.1</span>
        </div>
      {/if}
      <p
        class="line-clamp-2 text-sm font-medium text-pearl-lusta-950/40 dark:text-pearl-lusta-100/40 md:text-sm">
        {project.description}
      </p>
    </div>
  </div>
</div>
