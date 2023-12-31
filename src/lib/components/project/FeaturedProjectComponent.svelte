<script lang="ts">
  import IconRandom from "~icons/tabler/Dice.svelte";
  import IconTrending from "~icons/tabler/TrendingUp.svelte";
  import IconFeatured from "~icons/tabler/Trophy.svelte";

  import type { Project } from "$lib/globals/schema";
  import ProjectComponent from "./ProjectCard.svelte";

  export let project: Project;
  export let type: "popular" | "featured" | "random" | "new" = "popular";

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
</div>
