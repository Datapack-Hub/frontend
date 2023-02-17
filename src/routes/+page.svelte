<script lang="ts">
  	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	let rand = Math.floor(Math.random() * 1_000_000_000)
	let formattedRand = Intl.NumberFormat('en', {
		notation: "compact"
	}).format(rand)

	let visible = false

	onMount(() => {visible = true})
</script>

<body class="bg-stone-900 h-screen">
	<nav class="w-screen fixed">
		<div class="w-full bg-gradient-to-br from-pink-600 to-yellow-400 py-4 h-20 -translate-y-2 opacity-10 blur-md"></div>
		<div class="h-16 flex absolute top-0 justify-center items-center px-4">
			<img src="dph.png" alt="logo" class="h-8 rounded-full">
			<p class="text-white ml-2 font-brand text-xl">Datapack Hub</p>
		</div>
	</nav>
	{#if visible}		
		<div class="flex flex-col items-center justify-center h-screen w-screen">
			<h1 class="text-white text-[10rem] font-brand font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br">Explore</h1>
			<p class="text-white w-1/3 mt-8 text-center text-4xl">Over <span title="{rand.toString()}" class="font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br">{formattedRand}</span> of the latest and best datapacks from creators across the globe</p>
			<div class="flex w-1/2 items-center justify-evenly mt-16">
				<button class="text-pink-400 bg-pink-400 bg-opacity-20 font-brand rounded-md px-3 py-2 text-2xl hover:scale-110 transition-all border-2 border-pink-400">Lorem</button>
				<button class="text-white px-3 py-2 bg-orange-500 rounded-md font-bold font-brand text-2xl hover:scale-110 transition-all">Discover</button>
			</div>
		</div>
	{/if}
</body>
