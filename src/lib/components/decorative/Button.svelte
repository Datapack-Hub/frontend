<script lang="ts">
  export let style: "primary" | "secondary" | "boring" | "alt" | "sm" | "base" =
    "primary";
  export let click: string | (() => void) | (() => Promise<void>) | undefined =
    undefined;
  export let classes = "";
  export let wait = false;
  export let formCompat = false;
  export let formText = "";

  let buttonBind: HTMLButtonElement;

  async function buttonClick() {
    if (wait) {
      buttonBind.disabled = true;
      if (typeof click != "undefined" && typeof click != "string") {
        Promise.resolve(click()).then(() => (buttonBind.disabled = false));
      }
    } else {
      if (typeof click != "undefined" && typeof click != "string")
        await click();
    }
  }
</script>

{#if typeof click == "string"}
  <a href="{click}" class="button-{style} {classes}">
    <slot />
  </a>
{:else if formCompat}
  <input
    type="submit"
    class="button-{style} {classes} disabled:bg-opacity-40"
    value="{formText}"
    on:click="{buttonClick}" />
{:else}
  <button
    bind:this="{buttonBind}"
    on:click="{buttonClick}"
    class="button-{style} {classes} disabled:bg-opacity-40">
    <slot />
  </button>
{/if}
