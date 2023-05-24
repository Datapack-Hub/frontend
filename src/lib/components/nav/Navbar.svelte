<script lang="ts">
  import { isDark } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import ColorSchemeSelector from "../ColorSchemeSelector.svelte";
  import ProfileNavComponent from "./ProfileNavComponent.svelte";
  import IconCompass from "~icons/tabler/Compass.svelte";
  import IconSchool from "~icons/tabler/School.svelte";
  import IconSwords from "~icons/tabler/Swords.svelte";

  let scrollY: number;
  let innerWidth: number;
  let showNavItems = false;
  let showNavBG: boolean;

  onMount(() => (showNavItems = true));

  $: iconColor = $isDark ? "white" : "black";
  $: showNavBG = scrollY > 50 || innerWidth < 768;
  $: isSmall = innerWidth < 768;
</script>

<svelte:window bind:scrollY="{scrollY}" bind:innerWidth="{innerWidth}" />

<nav
  id="nav"
  class="sticky top-[calc(100%-8rem)] z-40 w-full px-8 transition-all md:fixed md:top-0 md:translate-y-0 md:px-16 lg:px-24 {showNavBG
    ? 'bg-pearl-lusta-50/70 dark:bg-stone-800/70'
    : ''}">
  <div
    class="flex h-32 w-full flex-row items-center justify-between drop-shadow-md md:h-16">
    <div class="flex items-center">
      <a href="/" class="z-20 flex cursor-pointer items-center space-x-2">
        <img
          loading="lazy"
          src="/logos/dph.svg"
          alt="logo"
          class="min-h-8 flex-shrink-0 transition-all hover:brightness-75"
          height="32"
          width="32" />
        <span
          class="hidden font-brand text-2xl font-bold text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:block">
          Datapack Hub
        </span>
      </a>
      {#if showNavItems}
        {#if innerWidth > 768}
          <a
            href="/projects"
            class="z-20 pl-6 font-brand text-lg font-light text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
            Explore
          </a>
          <a
            href="https://learn.datapackhub.net/"
            class="z-20 pl-4 font-brand text-lg font-light text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
            Learn
          </a>
          <a
            href="/"
            class="z-20 pl-4 font-brand text-lg font-light text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
            Compete
          </a>
        {:else}
          <a
            href="/projects"
            aria-label="Link to the Datapack Hub projects page"
            class="z-20 pl-3 font-brand text-lg font-light text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:pl-6">
            <IconCompass
              height="24"
              width="24"
              style="{{ color: iconColor }}" />
          </a>
          <a
            href="/"
            aria-label="Link to the Datapack Hub developer wiki"
            class="z-20 pl-3 font-brand text-lg font-light text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:pl-6">
            <IconSchool height="24" width="24" style="{{ color: iconColor }}" />
          </a>
          {#if !isSmall}
            <a
              href="/"
              aria-label="Link to the Datapack Hub competitions page"
              class="z-20 pl-3 font-brand text-lg font-light text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:pl-6">
              <IconSwords
                height="24"
                width="24"
                style="{{ color: iconColor }}" />
            </a>
          {/if}
        {/if}
      {/if}
    </div>
    <div class="mb-0 flex items-center justify-between">
      <ColorSchemeSelector />
      <ProfileNavComponent small="{isSmall}" />
    </div>
  </div>
</nav>
