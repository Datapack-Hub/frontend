<script lang="ts">
  import IconRandom from "~icons/tabler/Dice.svelte";
  import IconTrending from "~icons/tabler/TrendingUp.svelte";
  import IconFeatured from "~icons/tabler/Trophy.svelte";

  import type { Project } from "$lib/globals/schema";
  import ProjectComponent from "./ProjectComponent.svelte";
  import Tooltip from "../utility/Tooltip.svelte";

  export let project: Project;
  export let type: "popular" | "featured" | "random" | "new" = "popular";

  let hoverMsgs = {
    popular: "This datapack is trending on Datapack Hub",
    featured: "This datapack has been featured by Datapack Hub staff",
    random: "This datapack is a completely random one for you to try out!",
    new: "This datapack is new to Datapack Hub!"
  };

  let styles = new Map([
    ["popular", "blue-600"],
    ["featured", "dph-orange"],
    ["random", "zinc-600"],
    ["new", "lime-400"]
  ]);

  let style = styles.get(type);
</script>

<div
  class="w-full items-center rounded-xl outline outline-{style} relative bg-slate-200 text-white dark:bg-zinc-800">
  <ProjectComponent {project} />
  <Tooltip tooltipText="{hoverMsgs[type]}" placement="{'bottom'}">
    <div
      class="absolute right-3 top-0 bg-{style} flex space-x-1 rounded-b-md px-2 py-0.5 text-xs">
      {#if type == "popular"}
        <IconTrending /><span>Trending</span>
      {:else if type == "featured"}
        <IconFeatured /><span>Featured</span>
      {:else if type == "random"}
        <IconRandom /><span>Random</span>
      {/if}
    </div>
  </Tooltip>
</div>
