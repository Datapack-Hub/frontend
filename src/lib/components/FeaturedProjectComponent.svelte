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
  export let type: "popular" | "featured" | "random" = "popular";

  let hovermsgs = {
    "popular":{
      content: "This datapack is trending on Datapack Hub",
      placement: "bottom"
    },
    "featured":{
      content: "This datapack has been featured by Datapack Hub staff",
      placement: "bottom"
    },
    "random":{
      content: "This datapack is a completely random one for you to try out!",
      placement: "bottom"
    }
  }

  let style: string;
  switch (type) {
    case "popular":
      style = "dph-orange";
      break;
    case "featured":
      style = "rose-600";
      break;
    case "random":
      style = "stone-600";
      break;
  }

  let author: User;
  let visible = false;

  (async () => {
    if (browser) author = await getAuthorFromID(project.author);
    visible = true;
  })();
</script>

<div
  class="mb-3 w-full items-center rounded-xl outline outline-{style} relative bg-pearl-lusta-200 p-3 text-pearl-lusta-950 dark:bg-stone-800 dark:text-white">
  <div class="flex items-center">
    <a
      href="/project/{project.url}"
      class="rounded-lg {project.icon
        ? ''
        : 'bg-pearl-lusta-300 p-4 dark:bg-stone-700 dark:text-pearl-lusta-100'}">
      {#if project.icon}
        <img
          src="{project.icon}"
          alt="{project.title} icon"
          class="aspect-square w-24 rounded-lg bg-cover" />
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
          class="block text-xs text-pearl-lusta-950 opacity-40 hover:underline dark:text-white dark:hover:text-pearl-lusta-100 md:text-sm"
          in:fade="{{ duration: 250 }}">
          By {author.username}
        </a>
      {/if}
      <p
        class="line-clamp-2 text-sm font-medium text-pearl-lusta-950 opacity-70 dark:text-pearl-lusta-100 md:text-sm">
        {project.description}
      </p>
    </div>
  </div>
  <div
    class="absolute right-3 top-0 bg-{style} rounded-b-md px-2 py-0.5 font-brand text-xs flex space-x-1"
    use:tippy={hovermsgs[type]}>
    {#if type == "popular"}
      <TrendUpIcon />
      <p>Popular</p>
    {:else if type == "featured"}
      <TrophyIcon />
      <p>Featured</p>
    {:else if type == "random"}
    <DiceIcon />
    <p>Random</p>
    {/if}
  </div>
</div>
