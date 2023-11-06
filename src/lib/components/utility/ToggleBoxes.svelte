<script lang="ts">
  import { throttle, toggle } from "radash";
  import { createEventDispatcher } from "svelte";
  import type { Writable } from "svelte/store";

  export let value: string;
  export let selected: Writable<string[]>;
  export let limit = 3;

  let clicked = $selected.includes(value);

  let dispatch = createEventDispatcher();

  // way more complex than needed
  function toggleClicked() {
    clicked = !clicked;
    if (!clicked || $selected.length < limit) {
      selected.update(array => toggle(array, value));
      return;
    }

    if (clicked) {
      clicked = false;
      selected.update(array => array.filter(v => v != value));
      dispatch("fail");
    }
  }
</script>

<div
  role="checkbox"
  aria-checked="{clicked}"
  tabindex="0"
  class="{clicked
    ? 'border-dph-orange bg-dph-orange/40 hover:brightness-75 dark:bg-dph-orange/20'
    : 'border-slate-400 bg-slate-300 hover:border-dph-orange dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-dph-orange'}
    cursor-pointer select-none rounded-lg border-2 p-3 text-zinc-950 transition-all dark:text-zinc-100"
  on:click="{throttle({ interval: 300 }, toggleClicked)}"
  on:keypress="{event => (event.key == 'ENTER' ? toggleClicked : undefined)}">
  <p>
    {value}
  </p>
</div>
