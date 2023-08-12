<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let classes = "";
  export let defaultValue = "";

  let value = defaultValue;
  let dispatch = createEventDispatcher();

  function deployChange(result: string) {
    dispatch("change", result);
  }
</script>

<input
  type="text"
  class="{classes}"
  bind:value
  style="max-width: {value.length < 5 ? 5 : value.length}ch;"
  autocorrect="false"
  on:change="{event => deployChange(event.currentTarget.value)}" />
