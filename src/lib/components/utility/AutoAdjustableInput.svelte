<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let classes = "";

  let value = "";
  let dispatch = createEventDispatcher();

  function deploy(result: string) {
    dispatch("change", result);
  }
</script>

<input
  type="text"
  class="{classes}"
  bind:value
  style="max-width: {value.length < 5 ? 5 : value.length}ch;"
  autocorrect="false"
  on:change="{event => deploy(event.currentTarget.value)}" />
