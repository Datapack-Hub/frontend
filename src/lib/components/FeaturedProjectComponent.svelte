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

  let views = Math.round(Math.random() * 1000).toString();

  let hovermsgs = {
    popular: {
      content: "This datapack is trending on Datapack Hub",
      placement: "bottom"
    },
    featured: {
      content: "This datapack has been featured by Datapack Hub staff",
      placement: "bottom"
    },
    random: {
      content: "This datapack is a completely random one for you to try out!",
      placement: "bottom"
    }
  };

  let style: string;
  switch (type) {
    case "popular":
      style = "dph-orange";
      break;
    case "featured":
      style = "blue-600";
      break;
    case "random":
      style = "stone-600";
      break;
    case "new":
      style = "lime-400";
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
          loading="lazy"
          src="{project.icon}"
          alt="{project.title} icon"
          width="128"
          height="128"
          class="aspect-square w-24 rounded-lg bg-cover" />
      {:else}
        <IconNoPhoto width="64" height="64" />
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
  <div
    class="absolute right-3 top-0 bg-{style} flex space-x-1 rounded-b-md px-2 py-0.5 font-brand text-xs"
    use:tippy="{hovermsgs[type]}">
    <Eyecon />
    <p>{views}</p>
  </div>
</div>
