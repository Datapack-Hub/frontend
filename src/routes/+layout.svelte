<script lang="ts">
  import CookieConsent from "$lib/components/CookieConsent.svelte";
  import "../styles/app.postcss";
  import "../styles/fonts.postcss";
  import "../styles/nprogress.css";

  import { navigating } from "$app/stores";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import BannedModal from "$lib/components/modals/BannedModal.svelte";
  import Footer from "$lib/components/nav/Footer.svelte";
  import Navbar from "$lib/components/nav/Navbar.svelte";
  import { isDark, user, windowWidth } from "$lib/globals/stores";
  import NProgress from "nprogress";
  import { Toaster } from "svelte-sonner";

  export let data;

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

<div class="font-brand {$isDark ? 'dark' : ''}">
  {#if !maintenance || $user.role == "admin"}
    <div class="min-h-screen bg-slate-50 transition-all dark:bg-zinc-900">
      {#if $user.banned}
        <BannedModal />
      {/if}
      <Navbar />
      <slot />
    </div>
    {#if data.cookieNotice}
      <CookieConsent />
    {/if}
    <Toaster
      theme="{$isDark ? 'dark' : 'light'}"
      position="{$windowWidth > 768 ? 'bottom-right' : 'top-center'}"
      richColors />
    <Footer />
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
            class=" text-blue-200">Discord</a
          >!
        </p>
        <img alt="poorly drawn maintenance screen" src="/maintenance.avif" />
      </div>
    </div>
  {/if}
</div>
<!-- {/await} -->
