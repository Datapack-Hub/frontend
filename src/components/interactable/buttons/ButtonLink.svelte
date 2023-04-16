<script lang="ts">
  export let clickEvent: any = undefined;
</script>

<button
  on:click|preventDefault="{clickEvent}"
  on:submit|preventDefault="{null}"
  class="text-md rounded-md bg-dph-orange p-2 font-brand font-bold text-new-white-200 transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl">
  <slot />
</button>
