<script lang="ts">
  import CasualLine from "$lib/components/CasualLine.svelte";
  import IconGithub from "~icons/tabler/BrandGithub.svelte";
  import IconDiscord from "~icons/tabler/BrandDiscord.svelte";
</script>

<svelte:head>
  <title>Sign In | Datapack Hub</title>
</svelte:head>

<div
  class="right-0 top-0 flex h-screen transform-gpu">
  <div
  class="m-auto w-fit justify-self-center rounded-xl p-3 align-middle dark:bg-stone-800 overflow-x-hidden">
    <a href="/login" class="z-20 flex cursor-pointer items-center justify-center">
      <img
        src="/logos/dph.svg"
        alt="dph logo"
        class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
        height="32"
        width="32" />
      <span
        class="hidden text-2xl font-bold text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:block">
        Sign In
      </span>
    </a>
    <!-- <h1 class=" text-2xl text-pearl-lusta-950 dark:text-white font-regular">You are temporarily banned from Datapack Hub</h1> -->
    <CasualLine />
    <p class="dark:text-white mb-1">Use a sign in option below.</p>
    <div class="grid grid-cols-2 gap-1 w-fit ">
      <a class="flex rounded-lg p-2 bg-black text-white font-bold space-x-2 items-center" href="https://api.datapackhub.net/auth/login/github">
        <IconGithub />
        <p>Sign In with Github</p>
      </a>
      <a class="flex rounded-lg p-2 bg-[#5865F2] text-white font-bold space-x-2 items-center" href="https://api.datapackhub.net/auth/login/discord">
        <IconDiscord />
        <p>Sign In with Discord</p>
      </a>
    </div>
    <p class="mt-2 dark:text-neutral-500 text-sm">If you haven't made an account, one will be made for you.
  </div>
</div>
