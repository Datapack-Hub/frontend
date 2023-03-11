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

	function loadRoleColour(role: string): string {
		switch (role) {
			case 'admin': {
				return 'red-500';
			}
			case 'moderator': {
				return 'orange-500';
			}
			case 'developer': {
				return 'lime-500';
			}
			case 'helper': {
				return 'blue-500';
			}
			default: {
				return 'dark:text-white';
			}
		}
	}
</script>

<main class="dark:bg-stone-900 bg-newWhite transition-all px-72">
	<div class="flex w-full h-screen pt-32">
		<div>
			{#if data.profile.role != 'default'}
				<img
					src={data.profile.profile_icon}
					alt="{data.profile.username}'s profile picture"
					height="128"
					width="128"
					class="h-32 rounded-full outline outline-2 {data.profile.role}-outline outline-offset-4"
				/>
			{:else}
				<img
					src={data.profile.profile_icon}
					alt="{data.profile.username}'s profile picture"
					height="128"
					width="128"
					class="h-32 rounded-full outline outline-2 outline-white outline-offset-4"
				/>
			{/if}

			<p class="dark:text-white text-5xl font-brand font-bold mt-8">
				{data.profile.username}
			</p>

			<p class="dark:text-white text-lg font-brand font-bold">
				{#if data.profile.role != 'default'}
					<span class="text-{loadRoleColour(data.profile.role)}">
						⬤ {titleCase(data.profile.role)}
					</span>
				{/if}
			</p>
			<p class="dark:text-white text-lg mt-4 font-brand font-light">
				{data.profile.bio}
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

<style lang="postcss">
	.admin-outline {
		@apply outline-red-500
	}

	.admin-text {
		@apply text-red-500
	}

	.moderator-outline {
		@apply outline-orange-500
	}

	.moderator-text {
		@apply text-orange-500
	}

	.developer-outline {
		@apply outline-lime-500
	}

	.developer-text {
		@apply text-lime-500
	}

	.helper-outline {
		@apply outline-blue-500
	}

	.helper-text {
		@apply text-blue-500
	}
</style>