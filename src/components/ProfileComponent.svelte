<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import tippy from 'sveltejs-tippy';

	let authenticated = false;
	let rankColor;
	let data: User;

	$: props = {
		content: 'Sign In',
		placement: 'bottom',
	};

	(async () => {
		if (browser) {
			let res = await fetch('https://api.datapackhub.net/user/me', {
				method: 'get',
				credentials: 'include',
			});

			if (res.ok) {
				data = (await res.json()) as User;
				props.content = data.username;
				authenticated = true;
			}
		}
	})();
</script>

<a
	href="/"
	target="_self"
	class="ml-6 flex items-center justify-center z-20"
	use:tippy={props}
>
	{#if authenticated}
		<div>
			<!-- <p class="text-right mr-3 w-18 dark:text-white font-brand">Silabear</p>
			<p class="text-right mr-3 w-18 text-yellow-500 font-brand text-xs">⬤ Developer</p> -->
		</div>
		<a href="/user/{data.id}">
			{#if data.role != 'default'}
				<img
					src={data.profile_icon}
					alt="{data.username}'s profile picture"
					height="32"
					width="32"
					class="rounded-full outline outline-2 {data.role}-outline outline-offset-2"
				/>
			{:else}
				<img
					src={data.profile_icon}
					alt="{data.username}'s profile picture"
					height="32"
					width="32"
					class="rounded-full outline outline-2 outline-yellow-500 outline-offset-2"
				/>
			{/if}
		</a>
	{:else}
		<a
			href="https://api.datapackhub.net/auth/login"
			class="dark:text-newWhite text-black px-4 py-1 bg-dphOrange rounded-md text-sm md:text-md lg:text-lg hover:scale-110 transition-all active:brightness-75"
		>
			Sign in
		</a>
	{/if}
</a>

<style lang="postcss">
	.admin-outline {
		@apply outline-red-500;
	}

	.moderator-outline {
		@apply outline-orange-500;
	}

	.developer-outline {
		@apply outline-lime-500;
	}

	.helper-outline {
		@apply outline-blue-500;
	}
</style>
