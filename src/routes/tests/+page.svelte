<script lang="ts">
  import Dropdown from "$lib/components/utility/Dropdown.svelte";
  let hello = "Downloads";
</script>

<main class="flex h-screen w-full items-center justify-center">
  <Dropdown
    bind:selected="{hello}"
    options="{['Hello', 'World', 'UwU', 'Downloads', 'Updated']}" />
</main>
