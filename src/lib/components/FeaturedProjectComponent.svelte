<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorFromID } from "$lib/globals/functions";
  import { fade } from "svelte/transition";

  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  // import TrendUpIcon from "~icons/tabler/TrendingUp.svelte";
  // import TrophyIcon from "~icons/tabler/Trophy.svelte";
  // import DiceIcon from "~icons/tabler/Dice.svelte";
  // import BoxIcon from "~icons/tabler/Package.svelte";
  import Eyecon from "~icons/tabler/EyeFilled.svelte";

  import tippy from "sveltejs-tippy";

  export let project: Project;
  export let type: "trending" | "featured" | "random" | "new" = "trending";

  let views = Math.round(Math.random() * 1000).toString()

  let hovermsgs = {
    trending: {
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
    },
    new: {
      content: "This datapack was published recently!",
      placement: "bottom"
    }
  };

  let style: string;
  switch (type) {
    case "trending":
      style = "blue-400";
      break;
    case "featured":
      style = "dph-orange";
      break;
    case "random":
      style = "stone-600";
      break;
    case "new":
      style = "lime-400"
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
  class="mb-3 w-full items-center rounded-xl outline outline-stone-700 relative bg-pearl-lusta-200 p-3 text-pearl-lusta-950 dark:bg-stone-800 dark:text-white">
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
          width="110"
          height="110"
          class="aspect-square w-20 rounded-lg bg-cover" />
      {:else}
        <IconNoPhoto width="48" height="" />
      {/if}
    </a>
    <div class="ml-4 w-2/3">
      <a
        href="/project/{project.url}"
        class="font-brand text-2xl hover:underline md:text-xl lg:text-4xl">
        {project.title}
      </a>
      {#if visible}
      <div class="flex space-x-2 text-md text-pearl-lusta-950/40 dark:text-white font-brand">
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
    </div>
  </div>
  <div
    class="absolute right-0 top-0 m-2 text-{style} font-bold flex space-x-1 rounded-md px-2 py-0.5 font-brand text-md items-center"
    use:tippy="{hovermsgs[type]}">
      <Eyecon />
      <p>{views}</p>
  </div>
</div>
