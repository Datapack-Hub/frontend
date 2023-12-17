<script lang="ts">
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import {
    appendSize,
    fetchAuthed,
    moderatorOrAbove
  } from "$lib/globals/functions";
  import { authed, roleInfo, user, windowWidth } from "$lib/globals/stores";
  import IconRead from "~icons/tabler/Bell.svelte";
  import IconUnread from "~icons/tabler/BellRinging.svelte";
  import IconCompass from "~icons/tabler/Compass.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconProfile from "~icons/tabler/User.svelte";
  import IconGear from "~icons/tabler/Settings.svelte";
  import IconWrench from "~icons/tabler/Tool.svelte";
  import IconMail from "~icons/tabler/Mail.svelte";
  import IconRobot from "~icons/tabler/BrandDiscord.svelte";
  import IconLogOut from "~icons/tabler/Logout.svelte";
  import ColorSchemeSelector from "./ColorSchemeSelector.svelte";
  import Modal from "../modals/Modal.svelte";
  import ConditionalWrapper from "../utility/ConditionalWrapper.svelte";
  import Tooltip from "../utility/Tooltip.svelte";

  let signInModal: Modal;

  let scrollY: number;
  let unreadNotifications = false;

  afterNavigate(() => {
    if (browser && $authed) {
      refreshNotifications().catch(error => console.error(error));
    }
  });

  async function refreshNotifications() {
    if (browser && $authed) {
      unreadNotifications = false;
      let notif = await fetchAuthed("get", "/notifs/unread");

      if (notif.ok) {
        let notifJson = await notif.json();
        if (notifJson.count != 0) unreadNotifications = true;
      }
    }
  }

  $: isSmall = ($windowWidth ?? 769) < 768;
</script>

<svelte:window bind:scrollY />

<Modal title="Sign In or Sign Up" bind:this="{signInModal}" width="small">
  <div class="flex align-middle">
    <div class="flex w-1/5 flex-col justify-around">
      <img src="/logos/dph.svg" alt="logo" class="mr-2 w-3/4 self-center" />
    </div>
    <div>
      <p class="dark:text-white">Welcome to Datapack Hub!</p>
      <p class="mb-2 text-sm dark:text-neutral-400">
        If you haven't made an account, one will be made for you.
      </p>
      <div class="grid w-full grid-cols-2 gap-2">
        <a
          class="flex items-center space-x-2 rounded-lg bg-black p-3 text-center font-bold text-white"
          href="https://api.datapackhub.net/auth/login/github">
          <img
            src="/logos/github-white.svg"
            alt="logo"
            class="h-6 self-center" />
          <p>Log In with Github</p>
        </a>
        <a
          class="flex items-center space-x-2 rounded-lg bg-[#5865F2] p-3 font-bold text-white"
          href="https://api.datapackhub.net/auth/login/discord">
          <img
            src="/logos/discord-white.svg"
            alt="logo"
            class="h-5 self-center" />
          <p>Log In with Discord</p>
        </a>
      </div>
      <p class="mt-2 text-sm dark:text-neutral-300">
        By using Datapack Hub, you agree to our <a
          href="/privacy"
          class="text-blue-500">privacy policy</a>
      </p>
    </div>
  </div>
</Modal>

<header
  class="fixed bottom-0 top-auto z-50 w-full shadow-sm md:bottom-auto md:top-0">
  <a
    href="#main-content"
    class="absolute right-1/2 top-4 translate-x-1/2 translate-y-16 cursor-default select-none opacity-0 transition-transform focus:translate-y-0 focus:opacity-100 dark:text-white md:-translate-y-16"
    >Jump to Main Content</a>
  <nav
    class="flex w-full items-center justify-around border-t border-black/10 bg-slate-100 p-4 dark:border-white/10 dark:bg-zinc-900 md:justify-between md:border-b md:px-16 lg:px-24">
    <ConditionalWrapper
      wrapCondition="{!isSmall}"
      classes="flex items-center space-x-4">
      <a
        href="/"
        class="flex cursor-pointer items-center space-x-2 text-zinc-950 transition-colors hover:text-dph-orange active:brightness-75 dark:text-white dark:hover:text-dph-orange">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="h-8 flex-shrink-0"
          height="32"
          width="32" />
        <span class="hidden text-2xl font-bold lg:block"> Datapack Hub </span>
      </a>
      <a
        href="/projects"
        aria-label="Explore datapacks"
        class="hidden rounded-full p-1 font-light transition-all hover:text-dph-orange dark:text-zinc-100 md:block md:hover:bg-transparent md:active:brightness-75">
        <span class="font-light">Explore</span>
      </a>
      <button
        class="group hidden cursor-pointer rounded-full p-1 font-light transition-all hover:text-dph-orange dark:text-zinc-100 md:block">
        Tools
        <div
          class="grid-first-small absolute -top-32 hidden w-max gap-3 rounded-md bg-slate-50 px-6 py-3 text-start text-black shadow-lg group-hover:grid group-focus:grid group-active:grid dark:bg-zinc-950 dark:text-white md:top-12">
          <div class="flex cursor-no-drop items-center">
            <IconWrench class="inline-grid align-middle" />
          </div>
          <div class="cursor-no-drop">
            <p class="font-bold opacity-50">dph.tools</p>
            <p class="text-xs opacity-50">
              The hub for all sorts of command generators and tools!
            </p>
          </div>
          <div class="flex items-center">
            <IconMail class="inline-grid align-middle" />
          </div>
          <a href="https://mailman.datapackhub.net">
            <p class="font-bold">Mailman</p>
            <p class="text-xs">
              Upload your projects to Datapack Hub, <br />Smithed and Modrinth
              at the same time, instantly.
            </p>
          </a>
          <div class="flex items-center">
            <IconRobot class="inline-grid align-middle" />
          </div>
          <a href="https://bot.datapackhub.net">
            <p class="font-bold">Datapack Helper Bot</p>
            <p class="text-xs">
              A multi-purpose Discord bot to give <br />your datapacking server
              superpowers!
            </p>
          </a>
        </div>
      </button>
      <a
        class="hidden rounded-full p-1 font-light transition-all hover:text-dph-orange dark:text-zinc-100 md:block md:hover:bg-transparent md:active:brightness-75"
        href="https://discord.datapackhub.net">Discord</a>
    </ConditionalWrapper>
    <ConditionalWrapper
      wrapCondition="{!isSmall}"
      classes="flex items-center justify-end gap-3">
      {#if $authed}
        <Tooltip
          tooltipText="{'Explore'}"
          placement="bottom"
          classes="flex md:hidden">
          <a
            href="/projects"
            aria-label="Explore datapacks"
            class="rounded-full p-1 transition-all dark:text-zinc-100 md:hover:bg-transparent md:active:brightness-75">
            <IconCompass width="24" height="24" />
          </a></Tooltip>

        <div
          class="group rounded-full p-1 dark:text-zinc-100 md:hidden md:hover:bg-transparent md:active:brightness-75">
          <IconWrench width="24" height="24" />
          <div
            class="grid-first-small absolute -top-48 left-0 hidden w-full gap-3 rounded-md bg-slate-50 px-6 py-3 shadow-lg group-hover:grid group-focus:grid dark:bg-zinc-950 dark:text-white md:top-12">
            <div class="flex items-center">
              <IconWrench class="inline-grid align-middle" />
            </div>
            <a href="https://dph.tools">
              <p class="font-bold">dph.tools</p>
              <p class="text-xs">
                The hub for all sorts of command generators and tools!
              </p>
            </a>
            <div class="flex items-center">
              <IconMail class="inline-grid align-middle" />
            </div>
            <a href="https://mailman.datapackhub.net">
              <p class="font-bold">Mailman</p>
              <p class="text-xs">
                Upload your projects to Datapack Hub, <br />Smithed and Modrinth
                at the same time, instantly.
              </p>
            </a>
            <div class="flex items-center">
              <IconRobot class="inline-grid align-middle" />
            </div>
            <a href="https://bot.datapackhub.net">
              <p class="font-bold">Datapack Helper Bot</p>
              <p class="text-xs">
                A multi-purpose Discord bot to give <br />your datapacking
                server superpowers!
              </p></a>
          </div>
        </div>
        <Tooltip
          tooltipText="{'Create project'}"
          placement="{'bottom'}"
          classes="flex">
          <a
            aria-label="New project"
            href="/projects/new"
            class="rounded-full p-1 transition-all hover:text-dph-orange dark:text-zinc-100 md:hover:bg-transparent md:active:brightness-75">
            <IconPlus width="24" height="24" /></a>
        </Tooltip>
        <Tooltip
          tooltipText="{'Notifications'}"
          placement="{'bottom'}"
          classes="flex">
          <a
            href="/notifications"
            class="rounded-full p-1 transition-all hover:text-dph-orange dark:text-zinc-100 md:hover:bg-transparent md:active:brightness-75"
            aria-label="Notifications page">
            {#if unreadNotifications}
              <IconUnread height="24" width="24" />
            {:else}
              <IconRead height="24" width="24" />
            {/if}
          </a>
        </Tooltip>
        {#if !isSmall}
          {#if $authed && moderatorOrAbove($roleInfo)}
            <Tooltip
              tooltipText="{'Moderation Page'}"
              placement="{'bottom'}"
              classes="flex">
              <a
                href="/moderation"
                class="rounded-full p-1 transition-all hover:text-dph-orange dark:text-zinc-100 md:hover:bg-transparent md:active:brightness-75"
                ><IconShield width="24" height="24" /></a>
            </Tooltip>
          {/if}
        {/if}
      {/if}
      <ColorSchemeSelector />
      {#if $authed}
        <a
          class="group py-2"
          aria-label="Your profile"
          href="/user/{$user.username}">
          <img
            src="{appendSize($user.profile_icon, 64)}"
            alt="{$user.username}'s profile picture"
            height="24"
            width="24"
            class="ml-2 rounded-full outline outline-2 outline-offset-2 hover:brightness-75"
            style="outline-color:{$roleInfo.color ?? '#eab308'};" />
          <div
            class="grid-first-small absolute -top-32 right-4 hidden gap-3 rounded-md bg-slate-50 px-6 py-3 shadow-lg group-hover:grid dark:bg-zinc-950 dark:text-white md:top-14">
            <div class="flex items-center">
              <IconProfile class="inline-grid align-middle" />
            </div>
            <a href="/user/{$user.username}">Profile</a>
            <div class="flex items-center">
              <IconGear class="inline-grid align-middle" />
            </div>
            <a href="/settings">Settings</a>
            <div class="flex items-center">
              <IconLogOut class="inline-grid align-middle" />
            </div>
            <a data-sveltekit-preload-data="tap" href="?log_out=1">Log out</a>
          </div>
        </a>
      {:else}
        <button
          id="sign_in"
          on:click="{signInModal.open}"
          class="button-primary">
          Sign in
        </button>
      {/if}
    </ConditionalWrapper>
  </nav>
</header>
