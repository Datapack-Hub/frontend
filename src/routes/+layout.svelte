<script>
  import Navbar from "$components/Navbar.svelte";
  import { isAuthenticated, isDark, loadColorPref } from "$globals";
  import { onMount } from "svelte";
  import "../app.postcss";
  import BannedModal from "$components/modals/BannedModal.svelte";

  onMount(async () => ($isDark = loadColorPref()));
</script>

<div class='{$isDark ? " dark" : ""}'>
  <BannedModal />
    <Navbar />
    <slot />
</div>
