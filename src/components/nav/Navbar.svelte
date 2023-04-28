<script lang="ts">
  import { isDark } from "$globals";
  import ColorSchemeSelector from "../buttons/ColorSchemeSelector.svelte";
  import ProfileNavComponent from "./ProfileNavComponent.svelte";

  let scrollY: number;
  let innerWidth: number;
  let iconColor = $isDark ? "white" : "black";

  $: showNavBG = scrollY > 50 || innerWidth < 768;
</script>

<svelte:window bind:scrollY="{scrollY}" bind:innerWidth="{innerWidth}" />

<nav
  id="nav"
  class="sticky top-[calc(100%-8rem)] z-40 w-full px-8 transition-all md:top-0 md:translate-y-0 md:px-16 lg:px-24 {showNavBG
    ? 'bg-new-white-100 dark:bg-stone-800'
    : ''} bg-opacity-70 dark:bg-opacity-70">
  <div
    class="flex h-32 w-full flex-row items-center justify-between drop-shadow-md md:h-16">
    <div class="flex items-center">
      <a href="/" class="z-20 flex cursor-pointer items-center">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="min-h-8 transition-all hover:brightness-75"
          height="32"
          width="32" />
        <span
          class="hidden font-brand text-2xl font-bold text-black transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:block">
          Datapack Hub
        </span>
      </a>
      {#if innerWidth > 768}
        <a
          href="/projects"
          class="z-20 pl-6 font-brand text-lg font-light text-black transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
          Explore
        </a>
      {:else}
        <a
          href="/projects"
          aria-label="Link to the Datapack Hub projects page"
          class="z-20 pl-6 font-brand text-lg font-light text-black transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="{iconColor}"
            class="icon icon-tabler icon-tabler-compass"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 16l2 -6l6 -2l-2 6l-6 2"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 3l0 2"></path>
            <path d="M12 19l0 2"></path>
            <path d="M3 12l2 0"></path>
            <path d="M19 12l2 0"></path>
          </svg>
        </a>
      {/if}
      {#if innerWidth > 768}
        <a
          href="/"
          target="_self"
          class="z-20 pl-4 font-brand text-lg font-light text-black transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
          Create
        </a>
      {/if}
    </div>
    <div class="mb-0 flex items-center justify-between">
      <ColorSchemeSelector />
      <ProfileNavComponent />
    </div>
  </div>
</nav>
