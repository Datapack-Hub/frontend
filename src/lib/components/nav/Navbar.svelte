<script lang="ts">
  import { isDark, windowWidth } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import tippy from "sveltejs-tippy";
  import IconCompass from "~icons/tabler/Compass.svelte";
  import IconSchool from "~icons/tabler/School.svelte";
  import IconSwords from "~icons/tabler/Swords.svelte";
  import ColorSchemeSelector from "../ColorSchemeSelector.svelte";
  import ProfileNavComponent from "./ProfileNavComponent.svelte";

  let scrollY: number;
  let showNavItems = false;
  let showNavBG: boolean;

  onMount(() => (showNavItems = true));

  $: iconColor = $isDark ? "white" : "black";
  $: isSmall = ($windowWidth ?? 769) < 768;
  $: showNavBG = (scrollY ?? 34) > 35 || isSmall;
  $: iconSize = isSmall ? 24 : 32;
</script>

<svelte:window bind:scrollY="{scrollY}"/>

<header
  id="nav"
  class="{isSmall
    ? 'bottom-0'
    : 'top-0'} z-40 w-full transition-all transform-gpu will-change-transform fixed px-2 sm:px-8 md:px-16 lg:px-24 {showNavBG
    ? 'bg-slate-50/80 dark:bg-zinc-800/80 backdrop-blur shadow-md'
    : 'shadow-none'}">
  <div class="flex h-16 w-full flex-row items-center justify-between md:h-16">
    <a
      href="#main-content"
      class="invert absolute transition-transform select-none cursor-default left-1/2 -translate-x-1/2 translate-y-16 md:-translate-y-16 opacity-0 focus:opacity-100 focus:translate-y-0"
      >Jump to Main Content</a>

    <nav class="flex items-center mr-2">
      <a
        href="/"
        class="z-20 flex cursor-pointer items-center space-x-2 hover:brightness-75 active:brightness-50 mr-3">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="min-h-8 flex-shrink-0"
          height="{iconSize}"
          width="{iconSize}" />
        <span
          class="hidden text-2xl font-bold text-slate-950 dark:text-white lg:block">
          Datapack Hub
        </span>
        <!-- <span
          class="text-xs md:text-base font-bold text-white bg-dph-orange px-2 rounded-full">
          BETA
        </span> -->
      </a>
      {#if showNavItems}
        {#if $windowWidth > 768}
          <a href="/projects" class="nav_item">Explore</a>
          <a href="https://discord.gg/aEXsdjjdu4" class="nav_item">Discord</a>
          <!-- <button inert class="nav_item_disabled">Compete</button> -->
        {:else}
          <a
            href="/projects"
            aria-label="Projects page"
            class="nav_item"
            use:tippy="{{ content: 'Explore', placement: 'bottom' }}">
            <IconCompass
              height="{iconSize}"
              width="{iconSize}"
              style="{{ color: iconColor }}" />
          </a>
          <button inert class="nav_item_disabled" aria-label="Learn page">
            <IconSchool
              height="{iconSize}"
              width="{iconSize}"
              class="text-neutral-500" />
          </button>
          <button inert class="nav_item_disabled" aria-label="Compete page">
            <IconSwords
              height="{iconSize}"
              width="{iconSize}"
              class="text-neutral-500" />
          </button>
        {/if}
      {/if}
    </nav>
    <div class="mb-0 flex items-center justify-between">
      <ColorSchemeSelector small="{isSmall}" />
      <ProfileNavComponent small="{isSmall}" />
    </div>
  </div>
</header>
