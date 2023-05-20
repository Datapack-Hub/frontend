<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthorFromID } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import tippy from "sveltejs-tippy";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import TrendUpIcon from "~icons/tabler/TrendingUp.svelte";
  import TrophyIcon from "~icons/tabler/Trophy.svelte";

  export let project: Project;
  export let manual = false;

  let author: User;
  let visible = false;

  let hoverManual = {
    content: "Featured By Staff",
    placement: "bottom"
  };

  let hoverNotManual = {
    content: "Popular",
    placement: "bottom"
  };

  (async () => {
    if (browser) author = await getAuthorFromID(project.author);
    visible = true;
  })();
</script>

<div
  class="mb-3 w-full items-center rounded-xl outline {manual
    ? 'outline-rose-600'
    : 'outline-dph-orange'} relative bg-pearl-lusta-200 p-3 text-pearl-lusta-950 dark:bg-stone-800 dark:text-white">
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
    use:tippy="{manual ? hoverNotManual : hoverManual}"
    class="absolute right-3 top-0 {manual
      ? 'bg-rose-600'
      : 'bg-dph-orange'} rounded-b-md px-2 py-0.5 font-brand text-xs">
    {#if manual}
      <TrendUpIcon />
    {:else}
      <TrophyIcon />
    {/if}
  </div>
</div>
