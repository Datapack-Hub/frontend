<script lang="ts">
	import { onMount } from 'svelte';
	import { draw } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { isDark } from '../globals';
	let isSmallWidth: boolean;
	let dark: boolean;
	let unsubscribeDark = isDark.subscribe((v) => {
		dark = v;
	});

	onMount(() => {
		isSmallWidth = window.innerWidth < 768;
		addEventListener('resize', () => (isSmallWidth = window.innerWidth < 768));
	});

	let thing = () => {
		isDark.set(!dark);
		localStorage.setItem("dp_colorPref", $isDark.toString())
		console.log($isDark)
	};

	onDestroy(unsubscribeDark);
</script>

<nav
	class="w-screen fixed {!isSmallWidth
		? ''
		: 'bottom-0'} transition-all"
>
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
		<div>
			{#key dark}
				{#if dark}
					<svg
						on:click={thing}
						on:keydown={(k) => (k.key == 'T' ? thing : null)}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="ml-6 cursor-pointer"
					>
						<path
							in:draw={{duration: 500, speed: 5}}
							d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
						/>
					</svg>
				{:else}
					<svg
						on:click={thing}
						on:keydown={(k) => (k.key == 'T' ? thing : null)}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="ml-6 cursor-pointer"
					>
						<circle in:draw={{duration: 500, speed: 5}} cx="12" cy="12" r="5" />
						<line in:draw={{duration: 500, speed: 5}} x1="12" y1="1" x2="12" y2="3" />
						<line in:draw={{duration: 500, speed: 5}} x1="12" y1="21" x2="12" y2="23" />
						<line in:draw={{duration: 500, speed: 5}} x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
						<line in:draw={{duration: 500, speed: 5}} x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
						<line in:draw={{duration: 500, speed: 5}} x1="1" y1="12" x2="3" y2="12" />
						<line in:draw={{duration: 500, speed: 5}} x1="21" y1="12" x2="23" y2="12" />
						<line in:draw={{duration: 500, speed: 5}} x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
						<line in:draw={{duration: 500, speed: 5}} x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
					</svg>
				{/if}
			{/key}
		</div>
	</div>
</nav>
