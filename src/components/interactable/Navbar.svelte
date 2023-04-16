<script lang="ts">
  import ColorSchemeSelector from "./buttons/ColorSchemeSelector.svelte";
  import ProfileNavComponent from "./ProfileNavComponent.svelte";

  let scrollY: number;
  let innerWidth: number;

  $: showNavBG = scrollY > 50 || innerWidth < 768;
</script>

<svelte:window bind:scrollY="{scrollY}" bind:innerWidth="{innerWidth}" />

<nav
  id="nav"
  class="sticky top-[calc(100%-128px)] z-40 w-full px-8 transition-all md:top-0 md:translate-y-0 md:px-16 lg:px-24 {showNavBG
    ? 'bg-stone-800'
    : ''} bg-opacity-70">
  <div class="flex h-32 items-center justify-between drop-shadow-md md:h-16 flex-row w-full">
    <div class="flex items-center">
      <a href="/" class="z-20 flex cursor-pointer items-center">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="h-8 rounded-full transition-all hover:brightness-75"
          height="32"
          width="32" />
        <span
          class="hidden font-brand text-2xl font-bold text-black transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:block">
          Datapack Hub
        </span>
      </a>
      <a
        href="/projects"
        class="z-20 pl-8 font-brand text-lg font-light text-black transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
        Explore
      </a>
      <a
        href="/"
        target="_self"
        class="z-20 pl-4 font-brand text-lg font-light text-black transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
        Create
      </a>
      <a
        href="https://discord.gg/aEXsdjjdu4"
        target="_self"
        class="z-20 pl-4 font-brand text-lg font-light text-indigo-500 transition-colors hover:text-indigo-400 active:text-neutral-400">
        Discord
      </a>
    </div>
    <div
      class="flex items-center justify-between mb-0">
      <ColorSchemeSelector />
      <ProfileNavComponent />
    </div>
  </div>
</nav>
