<script lang="ts">
	import { onMount } from 'svelte';
  	import ColorSchemeSelector from './ColorSchemeSelector.svelte';
  import ProfileComponent from './ProfileComponent.svelte';
	let isSmallWidth: boolean;

	onMount(() => {
		isSmallWidth = window.innerWidth < 768;
		addEventListener('resize', () => (isSmallWidth = window.innerWidth < 768));
	});
</script>

<nav class="w-screen fixed {!isSmallWidth ? '' : 'bottom-0'} transition-all">
	<div
		class="w-full bg-gradient-to-br from-pink-600 to-yellow-400 py-4 h-20 {!isSmallWidth
			? '-translate-y-4'
			: 'translate-y-4'} opacity-10 blur-md"
	/>
	<div
		class="h-16 flex absolute top-0 items-center justify-between {!isSmallWidth
			? ''
			: 'translate-y-4'} w-screen px-4"
	>
		<div class="flex items-center">
			<a href="/" target="_self" class="flex items-center">
				<img src="dph.png" alt="logo" class="h-8 rounded-full" />
				{#if !isSmallWidth}
					<p class="dark:text-white text-black ml-2 font-brand text-xl">
						Datapack Hub
					</p>
				{/if}
			</a>
			<a
				href="/" target="_self"
				class="pl-8 dark:text-white text-black text-lg font-brand font-light hover:text-neutral-200 active:text-neutral-400"
			>
				Explore
			</a>
			<a
				href="/" target="_self"
				class="pl-4 dark:text-white text-black text-lg font-brand font-light hover:text-neutral-200 active:text-neutral-400"
			>
				Create
			</a>
		</div>
		<div class="flex items-center">
			<ColorSchemeSelector/>
			<img src="bell.svg" alt="" class="dark:invert ml-6">
			<ProfileComponent/>
		</div>
	</div>
</nav>
