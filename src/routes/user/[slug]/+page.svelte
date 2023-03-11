<script lang="ts">
	import { browser } from '$app/environment';
	import ProjectComponent from '$components/ProjectComponent.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function titleCase(str: string): string {
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
			{#if data.profile.role == "admin"}
			<span class="text-red-500">
			⬤ {titleCase(data.profile.role)}
			</span>
			{:else if data.profile.role == "developer"}
			<span class="text-lime-500">
			⬤ {titleCase(data.profile.role)}
			</span>
			{:else if data.profile.role == "moderator"}
			<span class="text-orange-400">
			⬤ {titleCase(data.profile.role)}
			</span>
			{:else if data.profile.role == "helper"}
			<span class="text-teal-500>
			⬤ {titleCase(data.profile.role)}
			</span>
			{:else}
			<span>
			⬤ {titleCase(data.profile.role)}
			</span>
			{/if}
			</p>
		</div>
		<div class="w-full overflow-scroll mx-24 h-full overflow-y-scroll">
			{#if data.projects.length == 0}
				<p class="dark:text-white text-opacity-40 text-3xl text-center mt-48">
					No projects!
				</p>
			{:else}
				{#each data.projects as project}
					<ProjectComponent {project} />
				{/each}
			{/if}
		</div>
	</div>
</main>
