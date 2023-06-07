<script lang="ts">
  export let style: "primary" | "secondary" | "boring" | "alt" | "sm" | "base" =
    "primary";
  export let click: string | (() => void);
  export let classes = "";
</script>

{#if typeof click == "string"}
  <a href="{click}" class="button-{style} {classes}">
    <slot />
  </a>
{:else}
  <button on:click="{click}" class="button-{style} {classes}">
    <slot />
  </button>
{/if}
