<script lang="ts">
    import { onMount } from 'svelte';
	import tippy from 'sveltejs-tippy';

	const props = {
		content: 'Silabear',
		placement: 'bottom',
	};

	let authenticated = false;
    let rankColor;
    let data;

	// TODO: implement
	async function checkSignIn() {
        const res = await fetch("https://api.datapackhub.net/user/me", {
            method: 'GET',
            credentials: 'include'
        })

        if(res.ok) {
            data = await res.json()
            authenticated = true
            console.log(data)
        }
    }

    onMount(() => {
        checkSignIn()
    })
</script>

<a
	href="/"
	target="_self"
	class="ml-6 flex items-center justify-center"
	use:tippy={props}
>
    {#if authenticated}
        <div>
            <!-- <p class="text-right mr-3 w-18 dark:text-white font-brand">Silabear</p> -->
            <!-- <p class="text-right mr-3 w-18 text-yellow-500 font-brand text-xs">⬤ Developer</p> -->
        </div>
        <div>
            <img
                src="sila_baby.jpg"
                alt="user profile"
                height="32"
                width="32"
                class="rounded-full outline outline-2 outline-yellow-500 outline-offset-2"
            />
        </div>
    {:else}
        <a
            href="https://api.datapackhub.net/auth/login"
            class="dark:text-newWhite text-black px-4 py-1 bg-dphOrange rounded-md text-sm md:text-md lg:text-lg hover:scale-110 transition-all active:brightness-75"
        >
            Sign in
        </a>
    {/if}

</a>
