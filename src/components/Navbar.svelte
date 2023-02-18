<script lang="ts">
	import { onMount } from 'svelte';

	let isSmallWidth: boolean;
	let openSidebar: Function;
	let sidebarActive = false;

	onMount(() => {
		isSmallWidth = window.innerWidth < 768;
		addEventListener('resize', () => (isSmallWidth = window.innerWidth < 768));
		openSidebar = () => {
			sidebarActive = !sidebarActive;
			if (sidebarActive) {
			}
		};
	});
</script>

<nav class="w-screen fixed {!isSmallWidth ? '' : 'bottom-0'}">
	<div
		class="w-full bg-gradient-to-br from-pink-600 to-yellow-400 py-4 h-20 {!isSmallWidth
			? '-translate-y-4'
			: 'translate-y-4'} opacity-10 blur-md"
	/>
	<div
		class="h-16 flex absolute top-0 items-center {!isSmallWidth
			? ''
			: 'justify-center translate-y-4'} w-screen px-4"
	>
		<a href="/" class="flex items-center">
			<img src="dph.png" alt="logo" class="h-8 rounded-full" />
			{#if !isSmallWidth}
				<p class="dark:text-white text-black ml-2 font-brand text-xl">
					Datapack Hub
				</p>
			{/if}
		</a>
		<div>
			<a
				href="/"
				class="pl-8 dark:text-white text-black text-lg font-brand font-light"
			>
				Create
			</a>
			<a
				href="/"
				class="pl-2 dark:text-white text-black text-lg font-brand font-light"
			>
				Explore
			</a>
		</div>
	</div>
</nav>
