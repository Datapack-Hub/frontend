<script lang="ts">
	import { onMount } from 'svelte';
	import ButtonPrimary from '../components/ButtonPrimary.svelte';
	import ButtonSecondary from '../components/ButtonSecondary.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { isDark, loadColorPref } from '../globals';

	let rand = Math.floor(Math.random() * 10_000_000);
	let formattedRand = Intl.NumberFormat('en', {
		notation: 'compact',
	}).format(rand);

	let visible = false;
	let texts = ['Explore', 'Create', 'Play'];
	let activeText = 'Explore';
	let counter = 1;

	onMount(() => {
		visible = true;
		addEventListener('animationiteration', (e) => {
			if (e.animationName == 'shrink') {
				if (counter > 2) counter = 0;
				activeText = texts[counter];
				counter++;
			}
		});
		isDark.set(loadColorPref());
	});
</script>

<main class="{$isDark ? 'dark' : ''} h-screen">
	<div class="dark:bg-stone-900 bg-newWhite transition-all">
		<Navbar />
		{#if visible}
			<div class="flex flex-col items-center justify-center h-screen w-screen">
				<h1
					class="dark:text-newWhite text-black text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-brand font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br relative overflow-clip shrink-anim"
				>
					{activeText}
				</h1>
				<p
					class="dark:text-newWhite text-black w-2/3 md:w-1/2 lg:w-1/3 mt-12 text-center sm:text-2xl md:text-3xl lg:text-4xl"
				>
					Over <span
						title={rand.toString()}
						class="font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br"
					>
						{formattedRand}
					</span>
					of the latest and best datapacks from creators across the globe
				</p>
				<div
					class="flex w-2/3 md:w-1/2 lg:w-1/2 items-center justify-evenly mt-8 md:mt-16"
				>
					<ButtonSecondary>Lorem</ButtonSecondary>
					<ButtonPrimary>Discover</ButtonPrimary>
				</div>
			</div>
		{/if}
	</div>
</main>
