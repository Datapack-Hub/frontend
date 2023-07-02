<script lang="ts">
  import { isDark } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import ColorSchemeSelector from "./ColorSchemeSelector.svelte";
  import ProfileNavComponent from "./ProfileNavComponent.svelte";
  import IconCompass from "~icons/tabler/Compass.svelte";
  import IconSchool from "~icons/tabler/School.svelte";
  import IconSwords from "~icons/tabler/Swords.svelte";
  import tippy from "sveltejs-tippy";

  let scrollY: number;
  let innerWidth: number;
  let showNavItems = false;
  let showNavBG: boolean;

  onMount(() => (showNavItems = true));

  $: iconColor = $isDark ? "white" : "black";
  $: isSmall = (innerWidth ?? 769) < 768;
  $: showNavBG = (scrollY ?? 34) > 35 || isSmall;
  $: iconSize = isSmall ? 24 : 32;
</script>

<svelte:window bind:scrollY="{scrollY}" bind:innerWidth="{innerWidth}" />

<nav
  id="nav"
  class="{isSmall
    ? 'bottom-0'
    : 'top-0'} z-40 w-full transition-all transform-gpu fixed px-2 sm:px-8 md:px-16 lg:px-24 {showNavBG
    ? 'bg-pearl-lusta-100/90 dark:bg-stone-800/90 backdrop-blur shadow-md'
    : 'shadow-none'}">
  <div class="flex h-16 w-full flex-row items-center justify-between md:h-16">
    <div class="flex items-center mr-2">
      <a href="/" class="z-20 flex cursor-pointer items-center space-x-2">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="min-h-8 flex-shrink-0 transition-all hover:brightness-75"
          height="{iconSize}"
          width="{iconSize}" />
        <span
          class="hidden text-2xl font-bold text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 lg:block">
          Datapack Hub
        </span>
        <span
          class="text-xs md:text-base font-bold text-white bg-dph-orange px-2 rounded-full">
          BETA
        </span>
      </a>
      {#if showNavItems}
        {#if innerWidth > 768}
          <a href="/projects" class="nav_item">Explore</a>
          <button inert class="nav_item_disabled">Learn</button>
          <button inert class="nav_item_disabled">Compete</button>
        {:else}
          <a
            href="/projects"
            aria-label="Link to the Datapack Hub projects page"
            class="nav_item"
            use:tippy="{{ content: 'Explore', placement: 'bottom' }}">
            <IconCompass
              height="{iconSize}"
              width="{iconSize}"
              style="{{ color: iconColor }}" />
          </a>
          <button inert class="nav_item_disabled">
            <IconSchool
              height="{iconSize}"
              width="{iconSize}"
              class="text-neutral-500" />
          </button>
          <button inert class="nav_item_disabled">
            <IconSwords
              height="{iconSize}"
              width="{iconSize}"
              class="text-neutral-500" />
          </button>
        {/if}
      {/if}
    </div>
    <div class="mb-0 flex items-center justify-between">
      <ColorSchemeSelector small="{isSmall}" />
      <ProfileNavComponent small="{isSmall}" />
    </div>
  </div>
</nav>
