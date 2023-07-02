<script lang="ts">
  export let style: "primary" | "secondary" | "boring" | "alt" | "sm" | "base" =
    "primary";
  export let click: string | (() => void) | (() => Promise<void>);
  export let classes = "";
  export let wait = false;

  let buttonBind: HTMLButtonElement;

  async function buttonClick() {
    if (wait) {
      buttonBind.disabled = true;
      if (typeof click != "string") {
        Promise.resolve(click()).then(() => (buttonBind.disabled = false));
      }
    } else {
      if (typeof click != "string") await click();
    }
  }
</script>

{#if typeof click == "string"}
  <a href="{click}" class="button-{style} {classes}">
    <slot />
  </a>
{:else}
  <button
    bind:this="{buttonBind}"
    on:click="{buttonClick}"
    class="button-{style} {classes} disabled:bg-opacity-40">
    <slot />
  </button>
{/if}
