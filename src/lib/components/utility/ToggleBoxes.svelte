<script lang="ts">
  import { toggle } from "radash";
  import { createEventDispatcher } from "svelte";
  import type { Writable } from "svelte/store";

  export let value: string;
  export let selected: Writable<string[]>;
  export let limit = 3;

  let clicked = false;

  let dispatch = createEventDispatcher();

  // way more complex than needed
  function toggleClicked() {
    clicked = !clicked;
    if (!clicked || $selected.length < limit) {
      selected.update(array => toggle(array, value));
      return;
    }

    if(clicked) {
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
    ? 'border-dph-orange hover:brightness-75 bg-dph-orange/40 dark:bg-dph-orange/20'
    : 'hover:border-dph-orange dark:hover:border-dph-orange border-slate-400 bg-slate-300 dark:border-stone-700 dark:bg-stone-800'}
    border-2 p-2 rounded-lg text-slate-950 dark:text-slate-100 select-none cursor-pointer transition-all"
  on:click="{toggleClicked}"
  on:keypress="{event => (event.key == 'ENTER' ? toggleClicked : undefined)}">
  <p>
    {value}
  </p>
</div>
