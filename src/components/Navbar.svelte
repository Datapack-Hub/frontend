<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import ColorSchemeSelector from "./buttons/ColorSchemeSelector.svelte";
  import ProfileComponent from "./ProfileComponent.svelte";
  let isSmallWidth: boolean;

  onMount(() => {
    isSmallWidth = window.innerWidth < 768;
    addEventListener("resize", () => (isSmallWidth = window.innerWidth < 768));
  });
</script>

<nav class="w-screen fixed {!isSmallWidth ? '' : 'bottom-0'} transition-all">
  <div class="funky-gradient w-screen px-4">
    <div class="flex items-center mt-4 md:mt-0">
      <p
        on:click={() => goto("/")}
        on:keypress={(k) => goto("/")}
        class="flex items-center z-20"
      >
        <img src="/dph.svg" alt="logo" class="h-8 rounded-full" />
        {#if !isSmallWidth}
          <span
            class="dark:text-white text-black ml-2 font-brand font-bold text-2xl"
          >
            Datapack Hub
          </span>
        {/if}
      </p>
      <a
        href="/"
        target="_self"
        class="pl-8 dark:text-white text-black text-lg font-brand font-light hover:text-neutral-200 active:text-neutral-400 z-20"
      >
        Explore
      </a>
      <a
        href="/"
        target="_self"
        class="pl-4 dark:text-white text-black text-lg font-brand font-light hover:text-neutral-200 active:text-neutral-400 z-20"
      >
        Create
      </a>
      <a
        href="https://discord.gg/aEXsdjjdu4"
        target="_self"
        class="pl-4 text-indigo-500 text-black text-lg font-brand font-light hover:text-indigo-400 active:text-neutral-400 z-20"
      >
        Discord
      </a>
    </div>
    <div
      class="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0"
    >
      <ColorSchemeSelector />
      <ProfileComponent />
    </div>
  </div>
</nav>
