<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let classes = "";

  let value = "";
  let dispatch = createEventDispatcher();

  function deploy(e: string) {
    dispatch("change", e);
  }
</script>

<input
  type="text"
  class="{classes}"
  bind:value
  style="max-width: {value.length + 1 ?? 10}ch;"
  autocorrect="false"
  on:change="{e => deploy(e.currentTarget.value)}" />
