<script lang="ts">
	import { exampleProjects } from '$globals';
	import type { PageData } from './$types';

	export let data: PageData;

	function titleCase(str: string) {
		return str
			.toLowerCase()
			.split(' ')
			.map((word) => {
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(' ');
	}
</script>

<main class="dark:bg-stone-900 bg-newWhite transition-all px-72">
	<div class="flex w-full h-screen pt-32">
		<div>
			<img
				src={data.profile.profile_icon}
				alt="{data.profile.username}'s profile picture"
				height="128"
				class="h-32 rounded-full outline outline-2 outline-yellow-500 outline-offset-4"
			/>
			<p class="dark:text-white text-5xl font-brand font-bold mt-8">
				{data.profile.username}
			</p>
			<p class="dark:text-white text-lg mt-4 font-brand font-light">
				{data.profile.bio}
			</p>
			<p class="dark:text-white text-lg font-brand font-light">
				{titleCase(data.profile.role)}
			</p>
		</div>
		<div class="w-full overflow-scroll mx-24 h-full overflow-y-scroll">
			{#each exampleProjects as project}
				<div class="bg-stone-800 text-white rounded-lg bg-cover flex my-1 items-center overflow-scroll">
					<img
						src={project.image}
						alt="project icon"
						class="aspect-square bg-cover h-24 rounded-lg ml-4"
					/>
					<div class="p-2">
						<p class="ml-4 font-brand text-2xl">{project.name}</p>
						<p class="ml-4 text-sm text-opacity-20">By {project.author}</p>
						<p class="m-4">{project.description}</p>
					</div>
				</div>
			{/each}
			{#each exampleProjects as project}
				<div class="bg-stone-800 text-white rounded-lg bg-cover flex my-1 items-center overflow-scroll">
					<img
						src={project.image}
						alt="project icon"
						class="aspect-square bg-cover h-24 rounded-lg ml-4"
					/>
					<div class="p-2">
						<p class="ml-4 font-brand text-2xl">{project.name}</p>
						<p class="ml-4 text-sm text-opacity-20">By {project.author}</p>
						<p class="m-4">{project.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
