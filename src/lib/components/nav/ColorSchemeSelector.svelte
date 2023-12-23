<script lang="ts">
  import { isDark } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";
  import { draw } from "svelte/transition";
  import { createToggle, melt } from "@melt-ui/svelte";

  let superDarkMode = false;
  let superDarkX = 0;
  let superDarkY = 0;
  let innerWidth = 0;
  let innerHeight = 0;

  function superDarkHandler(event?: PointerEvent) {
    requestAnimationFrame(() => {
      superDarkX = (event?.clientX ?? 0) - innerWidth;
      superDarkY = (event?.clientY ?? 0) - innerHeight;
    });
  }

  const {
    elements: { root }
  } = createToggle({
    onPressedChange: value => {
      return value.next;
    },
    defaultPressed: false
  });

  let toggle = (event?: MouseEvent) => {
    if (event?.shiftKey) {
      superDarkMode = !superDarkMode;
      if (superDarkMode) {
        toast.info("Super Dark Enabled!");
        return;
      }
      toast.info("Super Dark Disabled!");
      return;
    }
    $isDark = !$isDark;
    localStorage.setItem("dp_colorPref", $isDark.toString());
  };
</script>

<svelte:window
  bind:innerWidth
  bind:innerHeight
  on:pointermove="{event => superDarkHandler(event)}" />

<button
  use:melt="{$root}"
  on:click="{event => toggle(event)}"
  class="select-none rounded-lg p-1 transition-all hover:text-dph-orange md:hover:bg-transparent dark:text-zinc-100"
  aria-label="dark mode toggle">
  {#if $isDark}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        in:draw="{{ duration: 500, speed: 5 }}"></path>
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
      ></path>
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"
      ></path>
      <path d="M19 11h2m-1 -1v2"></path>
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"></path>
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"
      ></path>
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        d="M6.343 17.657l-1.414 1.414"></path>
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        d="M6.343 6.343l-1.414 -1.414"></path>
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        d="M17.657 6.343l1.414 -1.414"></path>
      <path
        in:draw="{{ duration: 500, speed: 5 }}"
        d="M17.657 17.657l1.414 1.414"></path>
      <path in:draw="{{ duration: 500, speed: 5 }}" d="M4 12h-2"></path>
      <path in:draw="{{ duration: 500, speed: 5 }}" d="M12 4v-2"></path>
      <path in:draw="{{ duration: 500, speed: 5 }}" d="M20 12h2"></path>
      <path in:draw="{{ duration: 500, speed: 5 }}" d="M12 20v2"></path>
    </svg>
  {/if}
</button>

{#if superDarkMode}
  <section
    role="banner"
    class="super-dark-container"
    style="--x: {superDarkX}px; --y: {superDarkY}px;">
    <div class="super-dark-light"></div>
  </section>
{/if}

<style>
  .super-dark-container {
    position: absolute;
    width: 200%;
    height: 200vh;
    top: 0vh;
    left: -1rem;
    pointer-events: none;
  }

  .super-dark-light {
    width: 100%;
    height: 100%;
    transform: translate(var(--x), var(--y));
    background-image: radial-gradient(circle at center, transparent, #000 15%);
  }
</style>
