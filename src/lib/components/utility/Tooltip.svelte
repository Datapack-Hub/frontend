<script lang="ts">
  import { offset, flip, shift, type Placement } from "svelte-floating-ui/dom";
  import { createFloatingActions, arrow } from "svelte-floating-ui";
  import { writable, type Writable } from "svelte/store";
  import { inline } from "svelte-floating-ui/core";

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
  on:mouseenter="{() => (showTooltip = true)}"
  on:mouseleave="{() => (showTooltip = false)}"
  use:floatingReference>
  <slot />
</div>

{#if showTooltip}
  <!--MUST be absolute!-->
  <div
    class="absolute z-50 w-max rounded-md bg-white px-2 py-1 text-base dark:bg-black dark:text-white"
    use:floatingContent>
    {#if allowHTML}
      <!--eslint-disable-next-line svelte/no-at-html-tags-->
      {@html tooltipText}
    {:else}
      {tooltipText}
    {/if}
    <div
      class="absolute z-50 h-2 w-2 rotate-45 rounded-sm bg-white dark:bg-black dark:text-white"
      bind:this="{$arrowReference}">
    </div>
  </div>
{/if}
