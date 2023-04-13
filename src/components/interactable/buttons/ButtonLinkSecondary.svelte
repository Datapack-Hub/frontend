<script lang="ts">
  export let clickEvent: any = undefined;
</script>

<button
  on:click|preventDefault="{clickEvent}"
  on:submit|preventDefault="{null}"
  class="text-md rounded-md border-2 border-pink-400 bg-pink-400 bg-opacity-20 px-2 py-1 font-brand text-pink-400 transition-all hover:scale-110 active:brightness-75 md:px-3 md:py-2 md:text-lg lg:text-xl">
  <slot />
</button>
