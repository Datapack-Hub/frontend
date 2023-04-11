<script>
  import Navbar from "$components/Navbar.svelte";
  import { isAuthenticated, isDark, loadColorPref } from "$globals";
  import { onMount } from "svelte";
  import "../app.postcss";

  onMount(async () => ($isDark = loadColorPref()));
</script>

<div class='{$isDark ? " dark" : ""}'>
    <Navbar />
    <slot />
</div>
