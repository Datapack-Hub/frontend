<script lang="ts">
  import IconRandom from "~icons/tabler/Dice.svelte";
  import IconTrending from "~icons/tabler/TrendingUp.svelte";
  import IconFeatured from "~icons/tabler/Trophy.svelte";

  import type { Project } from "$lib/globals/schema";
  import tippy from "sveltejs-tippy";
  import ProjectComponent from "./ProjectComponent.svelte";

  export let project: Project;
  export let type: "popular" | "featured" | "random" | "new" = "popular";

  let hoverMsgs = {
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
    },
    new: {
      content: "This datapack is new to Datapack Hub!",
      placement: "bottom"
    }
  };

  let style: string;
  switch (type) {
    case "popular": {
      style = "blue-600";
      break;
    }
    case "featured": {
      style = "dph-orange";
      break;
    }
    case "random": {
      style = "zinc-600";
      break;
    }
    case "new": {
      style = "lime-400";
      break;
    }
  }
</script>

<div
  class="w-full items-center rounded-xl outline outline-{style} relative bg-slate-200 dark:bg-zinc-800 text-white">
  <ProjectComponent {project} />
  <div
    class="absolute right-3 top-0 bg-{style} flex space-x-1 rounded-b-md px-2 py-0.5 text-xs"
    use:tippy="{hoverMsgs[type]}">
    {#if type == "popular"}
      <IconTrending /><span>Trending</span>
    {:else if type == "featured"}
      <IconFeatured /><span>Featured</span>
    {:else if type == "random"}
      <IconRandom /><span>Random</span>
    {/if}
  </div>
</div>
