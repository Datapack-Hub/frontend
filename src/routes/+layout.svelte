<script lang="ts">
  import "../app.postcss";
  import "../fonts.postcss";

  import { dev } from "$app/environment";
  import { navigating } from "$app/stores";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import BannedModal from "$lib/components/modals/BannedModal.svelte";
  import Footer from "$lib/components/nav/Footer.svelte";
  import Navbar from "$lib/components/nav/Navbar.svelte";
  import { authed, isDark, user, windowWidth } from "$lib/globals/stores";
  import NProgress from "nprogress";
  import { Toaster } from "svelte-sonner";

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
    <title>Coming Fall 2023?</title>
    <meta
      name="description"
      content="The Datapack Hub website is coming very soon! In the meantime, come chat!
    https://discord.datapackhub.net
    https://planetminecraft.com/group/daily_datapackers" />
  {/if}
</svelte:head>

<div class="{$isDark ? 'dark' : ''} font-brand">
  {#if !maintenance || $user.role == "admin"}
    {#if dev || ($authed && ["admin", "moderator", "helper", "beta access", "verified", "nerd"].includes($user.role))}
      <div class="min-h-screen bg-slate-50 transition-all dark:bg-zinc-900">
        {#if $user.banned}
          <BannedModal />
        {/if}
        <Navbar />
        <slot />
      </div>
      <Toaster
        theme="{$isDark ? 'dark' : 'light'}"
        position="{$windowWidth > 768 ? 'bottom-right' : 'top-center'}"
        richColors />
      <Footer />
    {:else}
      <div class="fixed left-0 top-0 flex h-screen w-screen bg-zinc-900">
        <div class="flex justify-around relative m-auto justify-self-center align-middle">
          <div class="w-4/5 md:w-2/3 lg:w-3/4 space-y-2">
            <div class="rounded-xl bg-zinc-800 p-3 shadow-md shadow-black/25  flex space-x-3">
              <img src="/logos/dph.svg" class="w-1/4" />
              <div>
                <h1 class="text-3xl dark:text-white font-bold mb-1">Welcome to Datapack Hub!</h1>
                <p class="text-slate-200 mb-1">Datapack Hub started in January 2022 as a PMC group for datapack developers to come together, forming a community around Minecraft Datapacks, Resource Packs, and more. Now, we’re a fast-growing community with over 500 followers, and we’re working on even more epic stuff. We strive to be the friendliest and best datapacking community out there. Thanks for checking us out!
                <p class="text-slate-200 mt-2">Our website is still in development. In the meantime, come join our community!
                </p>
                <ul class="list-disc list-inside">
                  <li><a href="https://discord.datapackhub.net" class="text-blue-400 font-semibold">Join our Discord (the main part of our project)</a></li>
                  <li><a href="https://discord.datapackhub.net" class="text-blue-400">Follow our Planet Minecraft group</a></li>
                </ul>
              </div>
            </div>
            <div class="rounded-xl bg-red-800 p-3 shadow-md shadow-black/25 flex space-x-3">
              <p class="dark:text-white"><b>The Datapack Hub Website is coming in Autumn. </b>If you are part of the website's closed beta and aren't meant to be seeing this page, please sign in again.</p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {:else}
    <div
      class="fixed left-0 top-0 flex h-screen w-screen bg-zinc-900 align-middle">
      <div
        class="relative m-auto w-1/3 justify-self-center rounded-xl bg-zinc-800 p-3 align-middle shadow-md shadow-black/25">
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
        <p class="text-lg font-bold text-white">
          Datapack Hub is down for maintenance!
        </p>
        <p class="mb-2 text-white">
          Come hang out and check site status on our <a
            href="https://discord.datapackhub.net"
            class=" text-sky-200">Discord</a
          >!
        </p>
        <img alt="poorly drawn maintenance screen" src="/maintenance.avif" />
      </div>
    </div>
  {/if}
</div>
<!-- {/await} -->
