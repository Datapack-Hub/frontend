<script lang="ts">
  export let wrapCondition = false;
  export let classes = "";
</script>

{#if wrapCondition}
  <div class="{classes}"><slot /></div>
{:else}
  <slot />
{/if}
