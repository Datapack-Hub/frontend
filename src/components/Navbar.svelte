<script lang="ts">
  import ColorSchemeSelector from "./buttons/ColorSchemeSelector.svelte";
  import ProfileNavComponent from "./ProfileNavComponent.svelte";
</script>

<nav
  class="w-full fixed bottom-0 md:top-0 transition-all px-8 md:px-16 lg:px-24 z-50"
>
  <div class="funky-gradient w-full">
    <div class="flex items-center mt-4 md:mt-0">
      <a href="/" class="flex items-center z-20 cursor-pointer">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="h-8 rounded-full hover:brightness-75 transition-all"
          height="32"
          width="32"
        />
        <span
          class="dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 text-black font-brand font-bold text-2xl transition-colors hidden md:block"
        >
          Datapack Hub
        </span>
      </a>
      <a
        href="/projects"
        target="_self"
        class="pl-8 dark:text-white text-black text-lg font-brand font-light dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 z-20 transition-colors"
      >
        Explore
      </a>
      <a
        href="/"
        target="_self"
        class="pl-4 dark:text-white text-black text-lg font-brand font-light dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 z-20 transition-colors"
      >
        Create
      </a>
      <a
        href="https://discord.gg/aEXsdjjdu4"
        target="_self"
        class="pl-4 text-indigo-500 text-lg font-brand font-light hover:text-indigo-400 active:text-neutral-400 z-20 transition-colors"
      >
        Discord
      </a>
    </div>
    <div
      class="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0"
    >
      <ColorSchemeSelector />
      <ProfileNavComponent />
    </div>
  </div>
</nav>
