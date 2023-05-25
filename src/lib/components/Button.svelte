<script lang="ts">
  export let style: "style" | "accent" | "boring" | "alt" | "sm" | "base" =
    "style";
  export let click: string | (() => void);
  export let classes = "";
  export let download = false;
</script>

{#if typeof click == "string"}
  <a href="{click}" download="{download}" class="button-{style} {classes}">
    <slot />
  </a>
{:else}
  <button on:click="{() => click}" class="button-{style} {classes}">
    <slot />
  </button>
{/if}
