<script lang="ts">
  import CasualLine from "$lib/components/CasualLine.svelte";
  import { fetchAuthed, removeCookie } from "$lib/globals/functions";
  import SvelteMarkdown from "svelte-markdown";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { isAuthenticated } from "$lib/globals/stores";
  import { apiURL } from "$lib/globals/consts";

  let visible = false;
  let banReason: string;
  let expiry: number;

  onMount(async () => {
    if (browser) {
      let me = await fetchAuthed("get", `${apiURL}/user/me`);
      if (me.ok) {
        let meJson = (await me.json()) as {
          banned: boolean;
          banData: { message: string; expires: number };
        };
        if (meJson.banned == true) {
          banReason = meJson.banData.message;
          expiry = meJson.banData.expires;
          visible = true;
        }
      }
    }
  });

  function signOut() {
    removeCookie("dph_token");
    window.location.replace("/");
  }
</script>

{#if $isAuthenticated && visible}
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-screen backdrop-blur-lg backdrop-brightness-50">
    <div
      class="relative m-auto w-1/2 justify-self-center rounded-xl p-3 align-middle dark:bg-stone-800">
      <a href="/" class="z-20 flex cursor-pointer items-center justify-center">
        <img
          loading="lazy"
          src="/logos/dph.svg"
          alt="logo"
          class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
          height="32"
          width="32" />
        <span
          class="hidden font-brand text-2xl font-bold text-black text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:block">
          Datapack Hub
        </span>
      </a>
      <!-- <h1 class="font-brand text-2xl text-pearl-lusta-950 dark:text-white font-regular">You are temporarily banned from Datapack Hub</h1> -->
      <CasualLine />
      <p class="font-brand text-lg text-pearl-lusta-950 dark:text-white">
        <b>You are banned from Datapack Hub.</b> The reason is displayed below:
      </p>
      <p
        class="my-2 rounded-xl bg-stone-700 p-2 font-brand dark:text-stone-300">
        <SvelteMarkdown source="{banReason}" />
      </p>
      <p class="mt-6 font-brand text-pearl-lusta-950 dark:text-white">
        <b>Your ban will expire:</b>
        {new Date(expiry).toLocaleString()}. <br /> Until then, wait for the ban
        to expire, and read
        <a href="/rules" class="text-blue-500 underline">our rules</a>.
      </p>
      <button class="button-style mt-4" on:click="{signOut}">Log Out</button>
    </div>
  </div>
{/if}
