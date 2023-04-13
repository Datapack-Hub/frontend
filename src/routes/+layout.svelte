<script>
  import Navbar from "$components/Navbar.svelte";
  import { isDark, loadColorPref } from "$globals";
  import "../app.postcss";
  import BannedModal from "$components/modals/BannedModal.svelte";
  import { browser } from "$app/environment";

  if(browser) $isDark = loadColorPref();
</script>

<div class={$isDark ? " dark" : ""}>
  <BannedModal />
  <Navbar />
  <slot />
</div>
