<script lang="ts">
  // import "../app.scss";
  import "../app.postcss";
  import Navbar from "$lib/components/nav/Navbar.svelte";
  import BannedModal from "$lib/components/modals/BannedModal.svelte";
  import Footer from "$lib/components/nav/Footer.svelte";
  import { setContext } from "svelte";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import { isAuthenticated, isDark, role, user } from "$lib/globals/stores";
  import { Toaster } from "svelte-french-toast";

  setContext("user", user);
  setContext("roleData", role);
</script>

<!-- {#await pageLoad() then} -->
<div class="{$isDark ? 'dark' : ''}">
  {#if $isAuthenticated && ["helper", "moderator", "admin"].includes($user.role)}
    <div class="min-h-screen bg-pearl-lusta-100 transition-all dark:bg-stone-900">
      <Navbar></Navbar>
      {#if $user.banned}
        <BannedModal></BannedModal>
      {/if}
      <slot></slot>
    </div>
    <Footer></Footer>
    <Toaster></Toaster>
  {:else}
    <div class="fixed left-0 top-0 flex h-screen w-screen bg-stone-900">
      <div class="relative m-auto w-1/3 justify-self-center rounded-xl bg-stone-800 p-3 align-middle shadow-md shadow-black/25">
        <div class="flex items-center justify-center">
          <img src="/logos/dph.svg" alt="logo" class="mr-1 h-8 rounded-full transition-all hover:brightness-75" height="32" width="32">
          <span class="hidden font-brand text-2xl font-bold text-white transition-colors md:block">
            Datapack Hub
          </span>
        </div>
        <CasualLine></CasualLine>
        <p class="mb-5 font-brand text-lg text-white">
          The Datapack Hub website is coming very soon!
        </p>
        <p class="font-brand text-white"><b>In the meantime, come chat!</b></p>
        <p>
          <a href="https://discord.gg/aEXsdjjdu4" class="font-brand text-sky-200">
            - Join our Discord</a>
        </p>
        <p class="mb-5">
          <a href="https://planetminecraft.com/group/daily_datapackers" class="font-brand text-sky-200">
            - Follow our PMC group!</a>
        </p>
        <p class="font-brand text-sm font-thin italic text-white">
          ~ your favourite datapack hub staff team
        </p>
      </div>
    </div>
  {/if}
</div>

<!-- {/await} -->
