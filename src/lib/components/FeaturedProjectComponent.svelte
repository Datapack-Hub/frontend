<script lang="ts">
    import { browser } from "$app/environment";
    import { getAuthorFromID } from "$lib/globals/functions";
    import { fade } from "svelte/transition";
    import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  
    export let project: Project;
    export let manual: Boolean = false;
  
    let author: User;
    let visible = false;
  
    (async () => {
      if (browser) author = await getAuthorFromID(project.author);
      visible = true;
    })();
  </script>
  
  <div
    class="my-3 w-full items-center rounded-xl outline {manual ? 'outline-rose-600': 'outline-dph-orange'} bg-pearl-lusta-200 p-2 text-pearl-lusta-950 dark:bg-stone-800 dark:text-white relative">
    <div class="flex">
        <a
        href="/project/{project.url}"
        class="rounded-lg bg-pearl-lusta-300 dark:bg-stone-700 dark:text-pearl-lusta-100 {project.icon
            ? ''
            : 'p-4'}">
        {#if project.icon}
            <img
            src="{project.icon}"
            alt="{project.title} icon"
            class="aspect-square w-20 rounded-lg bg-cover max-h-fit" />
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
            class="text-xs text-pearl-lusta-950 text-opacity-40 hover:underline dark:text-white dark:hover:text-pearl-lusta-100 md:text-sm"
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
    <h2 class="bottom-0 right-3 absolute {manual ? 'bg-rose-600': 'bg-dph-orange'} px-2 font-brand rounded-t-md">{#if manual}Featured by staff{:else}Popular{/if}</h2>
  </div>
  