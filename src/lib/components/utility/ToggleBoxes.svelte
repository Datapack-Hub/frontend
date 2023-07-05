<script lang="ts">
  import { toggle } from "radash";
  import { createEventDispatcher } from "svelte";
  import type { Writable } from "svelte/store";

  export let value: string;
  export let selected: Writable<string[]>;
  export let limit = 3;

  let clicked = false;

  let dispatch = createEventDispatcher()

  // way more complex than needed
  function toggleClicked() {
    if ($selected.length < limit) {
      clicked = !clicked;
      selected.update(arr => toggle(arr, value));
      return
    }

    clicked = false;
    selected.update(arr => arr.filter(v => v != value));
    dispatch("fail")
  }

</script>

<div
  role="checkbox"
  aria-checked="{clicked}"
  tabindex="0"
  class="{clicked
    ? 'border-dph-orange hover:brightness-75 bg-dph-orange/20'
    : 'hover:border-dph-orange border-stone-700 bg-stone-800'} border-2 p-2 rounded-lg text-pearl-lusta-100 select-none cursor-pointer transition-all"
  on:click="{toggleClicked}"
  on:keypress="{e => (e.key == 'ENTER' ? toggleClicked : null)}">
  <p>
    {value}
  </p>
</div>
