<script lang="ts">
  export let click: string | (() => void) | (() => Promise<void>) | undefined;
</script>

{#if typeof click == "string"}
  <a
    href="{click}"
    class="group relative overflow-clip rounded-lg bg-dph-orange px-3 py-2 text-white transition-all active:brightness-75">
    <div
      class="pointer-events-none absolute -left-2 -top-4 z-0 h-24 w-1/3 -translate-x-24 rotate-12 bg-[#ffa64b] transition-transform group-hover:-translate-x-0">
    </div>
    <div
      class="pointer-events-none absolute -right-2 -top-4 z-0 h-24 w-1/3 translate-x-24 rotate-12 bg-[#de1615] transition-transform group-hover:-translate-x-0">
    </div>
    <span class="relative z-10">
      <slot />
    </span>
  </a>
{:else}
  <button
    class="group relative overflow-clip rounded-lg bg-dph-orange px-3 py-2 text-white transition-all active:brightness-75"
    on:click="{click}">
    <div
      class="pointer-events-none absolute -left-2 -top-4 z-0 h-24 w-1/3 -translate-x-24 rotate-12 bg-[#ffa64b] transition-transform group-hover:-translate-x-0 group-focus:-translate-x-0">
    </div>
    <div
      class="pointer-events-none absolute -right-2 -top-4 z-0 h-24 w-1/3 translate-x-24 rotate-12 bg-[#de1615] transition-transform group-hover:-translate-x-0 group-focus:-translate-x-0">
    </div>
    <span class="relative z-10">
      <slot />
    </span>
  </button>
{/if}
