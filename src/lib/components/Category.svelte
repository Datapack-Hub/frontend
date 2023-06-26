<script lang="ts">
  import type { Writable } from "svelte/store";

  export let category = "";
  export let counter: Writable<number>;

  let clicked = false;

  // way more complex than needed
  function toggle() {
    clicked = !clicked;
    if (clicked) $counter++;
    else $counter--;
    if ($counter > 3) {
      clicked = false;
      $counter--;
    }
  }
</script>

<div
  class="{clicked
    ? 'bg-dph-orange hover:brightness-75'
    : 'hover:bg-dph-orange bg-stone-700'} m-1.5 p-2 rounded-lg text-pearl-lusta-100 transition-all"
  on:click="{toggle}"
  on:keypress="{e => (e.key == 'ENTER' ? toggle : () => {})}">
  <p>{category}</p>
</div>
