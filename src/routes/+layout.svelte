<script lang="ts">
  import "../app.postcss";
  import Navbar from "$components/nav/Navbar.svelte";
  import {
    apiURL,
    fetchAuthed,
    getCookie,
    isDark,
    loadColorPref,
    user,
    isAuthenticated,
    role,
  } from "$globals";
  import BannedModal from "$components/modals/BannedModal.svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Footer from "$components/nav/Footer.svelte";
  import { setContext } from "svelte";
  import CasualLine from "$components/CasualLine.svelte";

  (async () => {
    if (browser) {
      if ($page.url.searchParams.has("token")) {
        let newToken = $page.url.searchParams.get("token");
        let expires = new Date();

        expires.setTime(Date.now() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = `dph_token=${newToken}; expires=${expires.toUTCString()}`;

        goto("/");
      }

      let token = await getCookie("dph_token");

      if (token) {
        let [userRes, roleRes] = await Promise.all([
          fetchAuthed("get", `${apiURL}/user/me`),
          fetch(`${apiURL}/user/staff/roles`),
        ]);

        $user = (await userRes.json()) as User;
        $role = (await roleRes.json()).roles.find(
          (v: Role) => v.name == $user.role
        );

        $isAuthenticated = true;
      }

      loadColorPref();
    }
  })();

  setContext("user", user);
  setContext("roleData", role);
</script>

<!-- {#await pageLoad() then} -->
{#if $isAuthenticated}
  {#if ["helper","moderator","admin"].includes($user.role)}
  <div class="{$isDark ? 'dark' : ''}">
    <div class="min-h-screen bg-new-white-200 transition-all dark:bg-stone-900">
      <Navbar />
      <BannedModal />
      <slot />
    </div>
    <Footer />
  </div>
  {:else}
  <div class="bg-stone-900 w-screen h-screen flex fixed left-0 top-0">
    <div class="relative m-auto w-1/3 justify-self-center rounded-xl p-3 align-middle bg-stone-800 shadow-md shadow-black/25">
      <div class="flex items-center justify-center">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
          height="32"
          width="32" />
        <span
          class="hidden font-brand text-2xl font-bold transition-colors text-white  md:block">
          Datapack Hub
        </span>
      </div>
      <CasualLine />
      <p class="text-white font-brand mb-5 text-lg">The Datapack Hub website is coming very soon!</p>
      <p class="text-white font-brand"><b>In the meantime, come chat!</b></p>
      <p><a href="https://discord.gg/aEXsdjjdu4" class="text-sky-200 font-brand"> - Join our Discord</a></p>
      <p class="mb-5"><a href="https://planetminecraft.com/group/daily_datapackers" class="text-sky-200 font-brand"> - Follow our PMC group!</a></p>
      <p class="text-white font-brand text-sm italic font-thin">~ your favourite datapack hub staff team</p>
    </div>
  </div>
  {/if}
{:else}
<div class="bg-stone-900 w-screen h-screen flex fixed left-0 top-0">
  <div class="relative m-auto w-1/3 justify-self-center rounded-xl p-3 align-middle bg-stone-800 shadow-md shadow-black/25">
    <div class="flex items-center justify-center">
      <img
        src="/logos/dph.svg"
        alt="logo"
        class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
        height="32"
        width="32" />
      <span
        class="hidden font-brand text-2xl font-bold transition-colors text-white  md:block">
        Datapack Hub
      </span>
    </div>
    <CasualLine />
    <p class="text-white font-brand mb-5 text-lg">The Datapack Hub website is coming very soon!</p>
    <p class="text-white font-brand"><b>In the meantime, come chat!</b></p>
    <p><a href="https://discord.gg/aEXsdjjdu4" class="text-sky-200 font-brand"> - Join our Discord</a></p>
    <p class="mb-5"><a href="https://planetminecraft.com/group/daily_datapackers" class="text-sky-200 font-brand"> - Follow our PMC group!</a></p>
    <p class="text-white font-brand text-sm italic font-thin">~ your favourite datapack hub staff team</p>
  </div>
</div>
{/if}

<!-- {/await} -->
