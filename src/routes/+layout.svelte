<script>
	import Navbar from '$components/Navbar.svelte';
    import { isDark, loadColorPref } from '$globals';
    import { onMount } from 'svelte';
    import "../app.postcss";

    onMount(async () => loadColorPref().then((v) => isDark.set(v)))
</script>

<div class="{isDark ? " dark" : ""}">
    <Navbar></Navbar>
    <slot></slot>
</div>
