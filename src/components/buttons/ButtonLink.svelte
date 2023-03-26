<script lang="ts">
  export let clickEvent: any = undefined;
</script>

<button
  on:click|preventDefault={clickEvent}
  on:submit|preventDefault={null}
  class="text-new-white p-2 bg-dph-orange rounded-md font-bold text-md md:text-lg lg:text-xl font-brand hover:scale-110 transition-all active:brightness-75"
>
  <slot />
</button>
