<script lang="ts">
  import { onDestroy } from "svelte";
  import { draw } from "svelte/transition";
  import { isDark } from "../../../routes/globals";

  let dark: boolean;
  let unsubscribeDark = isDark.subscribe((v) => {
    dark = v;
  });

  let thing = () => {
    isDark.set(!dark);
    localStorage.setItem("dp_colorPref", dark.toString());
  };

  onDestroy(unsubscribeDark);
</script>

<div class="z-20">
  {#key dark}
    {#if dark}
      <svg
        on:click={thing}
        on:keydown={(k) => (k.key == "T" ? thing : null)}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ml-0 md:ml-6 w-12 md:w-12 cursor-pointer hover:brightness-75"
      >
        <path
          in:draw={{ duration: 500, speed: 5 }}
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        />
      </svg>
    {:else}
      <svg
        on:click={thing}
        on:keydown={(k) => (k.key == "T" ? thing : null)}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ml-0 md:ml-6 cursor-pointer hover: brightness-200"
      >
        <circle in:draw={{ duration: 500, speed: 5 }} cx="12" cy="12" r="5" />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="12"
          y1="1"
          x2="12"
          y2="3"
        />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="12"
          y1="21"
          x2="12"
          y2="23"
        />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
        />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
        />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="1"
          y1="12"
          x2="3"
          y2="12"
        />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="21"
          y1="12"
          x2="23"
          y2="12"
        />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
        />
        <line
          in:draw={{ duration: 500, speed: 5 }}
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
        />
      </svg>
    {/if}
  {/key}
</div>
