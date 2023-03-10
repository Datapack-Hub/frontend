<script>
	import Navbar from '$components/Navbar.svelte';
    import { isDark, loadColorPref } from '$globals';
    import { onMount } from 'svelte';
    import '../app.css';

    onMount(async () => loadColorPref().then((v) => isDark.set(v)))
</script>

<div class="{$isDark ? "dark" : ""}">
    <Navbar/>
    <slot />
</div>
