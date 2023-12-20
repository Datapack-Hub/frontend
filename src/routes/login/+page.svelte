<script lang="ts">
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import IconGithub from "~icons/tabler/BrandGithub.svelte";
  import IconDiscord from "~icons/tabler/BrandDiscord.svelte";
  import { authed, user } from "$lib/globals/stores";
</script>

<svelte:head>
  <title>Log In | Datapack Hub</title>
  <meta name="description" content="Log into Discord or GitHub" />
</svelte:head>

<div class="right-0 top-0 flex h-screen transform-gpu">
  <div
    class="m-auto w-fit justify-self-center overflow-x-hidden rounded-xl p-3 align-middle dark:bg-zinc-800">
    {#if !$authed}
      <a
        href="/login"
        class="z-20 flex cursor-pointer items-center justify-center">
        <img
          src="/logos/dph.svg"
          alt="dph logo"
          class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
          height="32"
          width="32" />
        <span
          class="hidden text-2xl font-bold text-zinc-950 transition-colors hover:text-neutral-700 active:text-neutral-600 md:block dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500">
          Sign In
        </span>
      </a>
      <!-- <h1 class=" text-2xl text-zinc-950 dark:text-white font-regular">You are temporarily banned from Datapack Hub</h1> -->
      <CasualLine />
      <p class="dark:text-white">Use a sign in option below.</p>
      <p class="mb-2 text-sm dark:text-neutral-500">
        If you haven't made an account, one will be made for you.
      </p>
      <div class="grid w-fit grid-cols-2 gap-1">
        <a
          class="flex items-center space-x-2 rounded-lg bg-black p-3 font-bold text-white"
          href="https://api.datapackhub.net/auth/login/github">
          <IconGithub />
          <p>Sign In with Github</p>
        </a>
        <a
          class="flex items-center space-x-2 rounded-lg bg-[#5865F2] p-3 font-bold text-white"
          href="https://api.datapackhub.net/auth/login/discord">
          <IconDiscord />
          <p>Sign In with Discord</p>
        </a>
      </div>
      <p class="mt-2 text-sm dark:text-neutral-300">
        By using Datapack Hub, you agree to our <a
          href="/privacy"
          class="text-blue-500">privacy policy</a>
      </p>
    {:else}
      <p class="dark:text-white">
        Silly {$user.username}, you're already signed in!
      </p>
      <a href="/" class="text-blue-500">Go back to home</a>
    {/if}
  </div>
</div>
