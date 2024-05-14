<script lang="ts">
  import { browser } from "$app/environment";
  import { fetchAuthed, removeCookie } from "$lib/globals/functions";
  import { userSchema } from "$lib/globals/consts/schema";
  import { authed } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import Button from "../decorative/Button.svelte";
  import MarkdownRenderer from "../markdown/MarkdownRenderer.svelte";

  let visible = false;
  let banReason: string;
  let expiry: number;

  onMount(async () => {
    if (browser) {
      let me = await fetchAuthed("get", "/user/me");

      if (me.ok) {
        let meJson = await userSchema.parseAsync(await me.json());

        if (meJson.banned && meJson.banData) {
          banReason = meJson.banData.message;
          expiry = meJson.banData.expires;
          visible = true;
        }
      }
    }
  });

  async function signOut() {
    if (browser) {
      removeCookie("dph_token");
      location.replace("/");
    }
  }
</script>

{#if $authed && visible}
  <div class="absolute">
    <div
      class="fixed right-0 top-0 z-50 flex h-screen w-screen transform-gpu overflow-y-auto px-8 backdrop-blur-xl backdrop-brightness-75">
      <div class="relative m-auto justify-self-center">
        <div
          class="flex items-center justify-items-stretch rounded-t-xl bg-slate-300 p-3 dark:bg-zinc-900">
          <span class="z-20 flex items-center justify-around">
            <img
              src="/logos/dph.svg"
              alt="dph logo"
              class="mr-1 h-8 rounded-full transition-all"
              height="32"
              width="32" />
            <span
              class="hidden text-2xl font-bold text-zinc-950 transition-colors dark:text-white md:block">
              Datapack Hub
            </span>
          </span>
        </div>
        <div class="rounded-b-xl bg-slate-200 p-3 dark:bg-zinc-800">
          <p class="text-lg text-zinc-950 dark:text-white">
            <b>You are banned from Datapack Hub.</b> You are not able to upload,
            edit projects, or interact with the site until your ban has expired.
          </p>
          <p class="text-md mt-2 text-zinc-950 dark:text-white">Ban Reason:</p>
          <MarkdownRenderer source="{banReason}" />
          <p class="mt-3 text-zinc-950 dark:text-white">
            <b>Your ban will expire:</b>
            {new Date(expiry * 1000).toLocaleString()}. <br /> Until then, wait
            for the ban to expire, and read
            <a href="/rules" class="text-blue-500 underline">our rules</a>.
          </p>
          <Button classes="mt-4" click="{signOut}">Log Out</Button>
        </div>
      </div>
    </div>
  </div>
{/if}
