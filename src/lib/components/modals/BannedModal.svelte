<script lang="ts">
  import { browser } from "$app/environment";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import { fetchAuthed, removeCookie } from "$lib/globals/functions";
  import { authed } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import IconBan from "~icons/tabler/Ban.svelte";
  import Button from "../Button.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";

  let visible = false;
  let banReason: string;
  let expiry: number;

  onMount(async () => {
    if (browser) {
      let me = await fetchAuthed("get", "/user/me");

      if (me.ok) {
        let meJson = (await me.json()) as User;

        if (meJson.banned == true && meJson.banData) {
          banReason = meJson.banData.message;
          expiry = meJson.banData.expires;
          visible = true;
        }
      }
    }
  });

  function signOut() {
    if (browser) {
      removeCookie("dph_token");
      location.replace("/");
    }
  }
</script>

{#if $authed && visible}
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-screen transform-gpu backdrop-blur-lg backdrop-brightness-50">
    <div
      class="relative m-auto w-1/2 justify-self-center rounded-xl p-3 align-middle dark:bg-stone-800">
      <a href="/" class="z-20 flex cursor-pointer items-center justify-center">
        <img
          src="/logos/dph.svg"
          class="mr-1 h-8 rounded-full transition-all hover:brightness-75"
          height="32"
          width="32" />
        <span
          class="hidden text-2xl font-bold text-pearl-lusta-950 transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 md:block">
          Datapack Hub
        </span>
      </a>
      <!-- <h1 class=" text-2xl text-pearl-lusta-950 dark:text-white font-regular">You are temporarily banned from Datapack Hub</h1> -->
      <CasualLine />
      <p class=" text-lg text-pearl-lusta-950 dark:text-white">
        <b>You are banned from Datapack Hub.</b> The reason is displayed below:
      </p>
      <p class="prose my-2 rounded-xl bg-stone-700 p-2 dark:text-stone-300">
        <MarkdownComponent source="{banReason}" />
      </p>
      <p class="mt-6 text-pearl-lusta-950 dark:text-white">
        <b>Your ban will expire:</b>
        {new Date(expiry).toLocaleString()}. <br /> Until then, wait for the ban
        to expire, and read
        <a href="/rules" class="text-blue-500 underline">our rules</a>.
      </p>
      <Button classes="mt-4" click="{signOut}">Log Out</Button>
    </div>
  </div>
{/if}
