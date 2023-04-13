<script lang="ts">
  import ColorSchemeSelector from "./buttons/ColorSchemeSelector.svelte";
  import ProfileNavComponent from "../ProfileNavComponent.svelte";
</script>

<nav
  class="fixed top-full z-40 w-full -translate-y-full px-8 transition-all md:top-0 md:translate-y-0 md:px-16 lg:px-24">
  <div class="funky-gradient w-full">
    <div class="mt-4 flex items-center md:mt-0">
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
      class="mb-4 flex w-full items-center justify-between md:mb-0 md:w-auto">
      <ColorSchemeSelector />
      <ProfileNavComponent />
    </div>
  </div>
</nav>

<style lang="postcss">
  /* before:bg-gradient-to-br before:from-orange-500 before:to-red-800 */
  .funky-gradient::before {
    content: "";
    /* @apply bg-gradient-to-br from-orange-500 to-red-800; */
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.1;
  }

  .funky-gradient {
    @apply flex h-32 flex-col items-center justify-between drop-shadow-md md:h-16 md:flex-row;
    opacity: 1;
  }
</style>
