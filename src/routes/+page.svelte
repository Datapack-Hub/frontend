<script lang="ts">
	import { onMount } from 'svelte';
	import ButtonPrimary from '../components/buttons/ButtonPrimary.svelte';
	import ButtonSecondary from '../components/buttons/ButtonSecondary.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { isDark, loadColorPref } from './globals';
	import anime from 'animejs/lib/anime.es';

	let rand = Math.floor(Math.random() * 10_000_000);
	let formattedRand = Intl.NumberFormat('en', {
		notation: 'compact',
	}).format(rand);

	onMount(async () => {
		var textWrapper = document.querySelectorAll('.split-text .letters');
		textWrapper.forEach((el) => {
			el.innerHTML = el?.textContent?.replace(
				/\S/g,
				"<span class='letter'>$&</span>"
			);
		});

		anime
			.timeline({ loop: true, autoplay: true })
			.add({
				targets: '#indexText1 .letter',
				translateY: ['1.1em', 0],
				duration: 750,
				delay: (el, i) => 50 * i,
			})
			.add({
				targets: '#indexText1',
				opacity: 0,
				duration: 1000,
				easing: 'easeOutExpo',
				delay: 1000,
			})
			.add({
				targets: '#indexText2 .letter',
				translateY: ['1.1em', 0],
				duration: 750,
				delay: (el, i) => 50 * i,
			})
			.add({
				targets: '#indexText2',
				opacity: 0,
				duration: 1000,
				easing: 'easeOutExpo',
				delay: 1000,
			})
			.add({
				targets: '#indexText3 .letter',
				translateY: ['1.1em', 0],
				duration: 750,
				delay: (el, i) => 50 * i,
			})
			.add({
				targets: '#indexText3',
				opacity: 0,
				duration: 1000,
				easing: 'easeOutExpo',
				delay: 1000,
			});
		loadColorPref().then((v) => isDark.set(v));
	});
</script>

<main class="{$isDark ? 'dark' : ''} h-screen">
	<div class="dark:bg-stone-900 bg-newWhite transition-all">
		<Navbar />
		<div class="flex flex-col items-center justify-center h-screen w-screen overflow-visible">
			<div>
				<h1
					id="indexText1"
					class="split-text text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-brand font-bold text-gradient inline-block overflow-y-hidden"
				>
					<span class="letters inline-block">Explore</span>
				</h1>
				<h1
					id="indexText2"
					class="split-text text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-brand font-bold text-gradient inline-block overflow-y-hidden"
				>
					<span class="letters inline-block">Create</span>
				</h1>
				<h1
					id="indexText3"
					class="split-text text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-brand font-bold text-gradient inline-block overflow-y-hidden"
				>
					<span class="letters inline-block">Play</span>
				</h1>
			</div>
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
	</div>
</main>
