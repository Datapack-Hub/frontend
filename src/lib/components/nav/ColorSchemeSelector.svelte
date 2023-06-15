<script lang="ts">
  import { draw } from "svelte/transition";
  import { isDark } from "$lib/globals/stores";

  let toggle = () => {
    $isDark = !$isDark;
    localStorage.setItem("dp_colorPref", $isDark.toString());
  };
</script>

<div class="z-20">
  {#if $isDark}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      on:click="{toggle}"
      on:keydown|preventDefault="{k => (k.key == 'T' ? toggle : null)}"
      class="icon icon-tabler icon-tabler-moon-stars ml-0 cursor-pointer hover:brightness-75 md:ml-6"
      width="24"
      height="24"
      color="white"
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
      on:click="{toggle}"
      on:keydown|preventDefault="{k => (k.key == 'T' ? toggle : null)}"
      class="icon icon-tabler icon-tabler-sun-high ml-0 cursor-pointer hover:brightness-200 md:ml-6"
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
</div>