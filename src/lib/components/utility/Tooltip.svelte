<script lang="ts">
  import { offset, flip, shift, type Placement } from "svelte-floating-ui/dom";
  import { createFloatingActions, arrow } from "svelte-floating-ui";
  import { writable, type Writable } from "svelte/store";
  import { inline } from "svelte-floating-ui/core";
  import { fade } from "svelte/transition";

  export let tooltipText: string;
  export let placement: Placement = "top";
  export let allowHTML = false;
  export let classes = "";

  // eslint-disable-next-line unicorn/no-null
  const arrowReference: Writable<HTMLElement | null> = writable(null);

  const [floatingReference, floatingContent] = createFloatingActions({
    strategy: "absolute",
    placement,
    middleware: [
      offset(6),
      inline(),
      flip(),
      shift(),
      arrow({ element: arrowReference })
    ],
    onComputed({ placement, middlewareData }) {
      const { x, y } = middlewareData.arrow!;
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[placement.split("-")[0]]!;

      if ($arrowReference) {
        Object.assign($arrowReference.style, {
          // eslint-disable-next-line unicorn/no-null
          left: x == null ? "" : `${x}px`,
          // eslint-disable-next-line unicorn/no-null
          top: y == null ? "" : `${y}px`,
          [staticSide]: "-4px"
        });
      }
    }
  });

  let showTooltip: boolean = false;
</script>

<div
  role="tooltip"
  class="{classes}"
  on:pointerenter="{() => (showTooltip = true)}"
  on:pointerleave="{() => (showTooltip = false)}"
  use:floatingReference>
  <slot />
</div>

{#if showTooltip}
  <!--MUST be absolute!-->
  <div
    transition:fade="{{ duration: 100 }}"
    class="absolute z-50 rounded-md bg-slate-50 px-3 py-2 text-sm dark:bg-zinc-950 dark:text-white"
    use:floatingContent>
    {#if allowHTML}
      <!--eslint-disable-next-line svelte/no-at-html-tags-->
      {@html tooltipText}
    {:else}
      {tooltipText}
    {/if}
    <div
      class="absolute z-50 h-2 w-2 rotate-45 rounded-sm bg-slate-50 dark:bg-zinc-950 dark:text-white"
      bind:this="{$arrowReference}">
    </div>
  </div>
{/if}
