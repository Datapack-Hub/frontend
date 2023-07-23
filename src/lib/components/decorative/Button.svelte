<script lang="ts">
  export let style: "primary" | "secondary" | "boring" | "alt" | "sm" | "base" =
    "primary";
  export let click: string | (() => void) | (() => Promise<void>) | undefined =
    undefined;
  export let classes = "";
  export let wait = false;
  export let formCompat = false;
  export let formText = "";
  export let label = "";

  let disabled = false;

  async function buttonClick() {
    if (wait) {
      disabled = true;
      if (typeof click != "undefined" && typeof click != "string") {
        Promise.resolve(click()).then(() => (disabled = false));
      }
    } else {
      if (typeof click != "undefined" && typeof click != "string")
        await click();
    }
  }
</script>

{#if typeof click == "string"}
  <a href="{click}" aria-label="{label}" class="button-{style} {classes}">
    <slot />
  </a>
{:else if formCompat}
  <input
    type="submit"
    aria-label="{label}"
    {disabled}
    class="button-{style} {classes} disabled:bg-opacity-40"
    value="{formText}"
    on:click="{buttonClick}" />
{:else}
  <button
    on:click="{buttonClick}"
    aria-label="{label}"
    class="button-{style} {classes} disabled:bg-opacity-40">
    <slot />
  </button>
{/if}
