<script lang="ts">
  import CasualLine from "$lib/components/CasualLine.svelte";
  import BannedModal from "$lib/components/modals/BannedModal.svelte";
  import Footer from "$lib/components/nav/Footer.svelte";
  import Navbar from "$lib/components/nav/Navbar.svelte";
  import { authed, isDark, user } from "$lib/globals/stores";
  import { Toaster } from "svelte-french-toast";
  import "../app.postcss";
  import NProgress from "nprogress";
  import { navigating } from "$app/stores";

  const maintenance = false;

  NProgress.configure({
    // Full list: https://github.com/rstacruz/nprogress#configuration
    minimum: 0.16
  });

  $: {
    if ($navigating) {
      NProgress.start();
    }
    if (!$navigating) {
      NProgress.done();
    }
  }
</script>

<svelte:head>
  {#if authed && !["helper", "moderator", "admin", "beta access", "verified"].includes($user.role)}
    <title>Coming Soon</title>
  {/if}
</svelte:head>

<!-- {#await pageLoad() then} -->
<div class="{$isDark ? 'dark' : ''} font-brand">
  {#if !maintenance || $user.role == "admin"}
    {#if $authed && ["admin", "moderator", "helper", "beta access", "verified"].includes($user.role)}
      <div
        class="min-h-screen bg-pearl-lusta-100 transition-all dark:bg-stone-900">
        {#if $user.banned}
          <BannedModal />
        {/if}
        <Navbar />
        <slot />
      </div>
      <Footer />
      <Toaster />
    {:else}
      <div class="fixed left-0 top-0 flex h-screen w-screen bg-stone-900">
        <div
          class="relative m-auto w-2/3 md:w-1/2 lg:w-1/3 justify-self-center rounded-xl bg-stone-800 p-3 align-middle shadow-md shadow-black/25">
          <div class="flex items-center justify-center">
            <img
              src="/logos/dph.svg"
              alt="logo"
              class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
              height="32"
              width="32" />
            <span
              class="hidden text-2xl font-bold text-white transition-colors md:block">
              Datapack Hub
            </span>
          </div>
          <CasualLine />
          <p class="mb-5 text-lg text-white">
            The Datapack Hub website is coming very soon!
          </p>
          <p class=" text-white"><b>In the meantime, come chat!</b></p>
          <p>
            <a href="https://discord.gg/aEXsdjjdu4" class=" text-sky-200">
              - Join our Discord</a>
          </p>
          <p class="mb-5">
            <a
              href="https://planetminecraft.com/group/daily_datapackers"
              class=" text-sky-200">
              - Follow our PMC group!</a>
          </p>
          <p class=" text-sm font-thin italic text-white">
            ~ your favourite datapack hub staff team
          </p>
        </div>
      </div>
    {/if}
  {:else}
    <div
      class="fixed left-0 top-0 flex h-screen w-screen bg-stone-900 align-middle">
      <div
        class="relative m-auto w-1/3 justify-self-center rounded-xl bg-stone-800 p-3 align-middle shadow-md shadow-black/25">
        <div class="flex items-center justify-center">
          <img
            src="/logos/dph.svg"
            alt="logo"
            class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
            height="32"
            width="32" />
          <span
            class="hidden text-2xl font-bold text-white transition-colors md:block">
            Datapack Hub
          </span>
        </div>
        <CasualLine />
        <p class="text-lg text-white font-bold">
          Datapack Hub is down for maintenance!
        </p>
        <p class="text-white mb-2">
          While we're improving the site, come hang out with us on our <a
            href="https://discord.gg/aEXsdjjdu4"
            class=" text-sky-200">Discord</a
          >!
        </p>
        <img alt="poorly drawn maintenance screen" src="/maintenance.avif" />
      </div>
    </div>
  {/if}
</div>
<!-- {/await} -->
