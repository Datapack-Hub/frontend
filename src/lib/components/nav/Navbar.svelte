<script lang="ts">
  import {
    authed,
    isDark,
    roleInfo,
    user,
    windowWidth
  } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import tippy from "sveltejs-tippy";
  import IconCompass from "~icons/tabler/Compass.svelte";
  import ColorSchemeSelector from "../ColorSchemeSelector.svelte";
  import ProfileNavComponent from "./ProfileNavComponent.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import { fetchAuthed, moderatorOrAbove } from "$lib/globals/functions";
  import IconRead from "~icons/tabler/Bell.svelte";
  import IconUnread from "~icons/tabler/BellRinging.svelte";
  import { afterNavigate } from "$app/navigation";
  import { browser } from "$app/environment";
  import ConditionalWrapper from "../utility/ConditionalWrapper.svelte";

  let scrollY: number;
  let showNavItems = false;
  let showNavBG: boolean;

  onMount(() => (showNavItems = true));

  let signInHoverMessage = {
    content: "Sign In",
    placement: "bottom"
  };

  let notificationHoverMessage = {
    content: "Notifications",
    placement: "bottom"
  };

  let moderationHoverMessage = {
    content: "Moderation",
    placement: "bottom"
  };

  let newHoverMessage = {
    content: "Create Project",
    placement: "bottom"
  };

  $: unreadNotifications = false;

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

  $: iconColor = $isDark ? "white" : "black";
  $: isSmall = ($windowWidth ?? 769) < 768;
  $: showNavBG = (scrollY ?? 34) > 35 || isSmall;
</script>

<svelte:window bind:scrollY />

<header class="fixed w-full z-50 {isSmall
      ? 'bottom-0'
      : 'top-0'}">
  <a
    href="#main-content"
    class="invert absolute transition-transform select-none cursor-default top-4 right-1/2 translate-x-1/2 opacity-0 translate-y-16 md:-translate-y-16 focus:opacity-100 focus:translate-y-0"
    >Jump to Main Content</a>
  <nav
    class="flex justify-around md:justify-between transition-all transform-gpu will-change-transform items-center w-full py-4 md:px-16 bg-slate-200/40 dark:bg-zinc-800/40 backdrop-blur">
    <ConditionalWrapper wrapCondition={!isSmall} classes="flex items-center space-x-4">
      <a
        href="/"
        class="flex cursor-pointer items-center space-x-2 hover:brightness-75 active:brightness-50">
        <img
          src="/logos/dph.svg"
          alt="logo"
          class="h-8 flex-shrink-0"
          height="32"
          width="32" />
        <span
          class="hidden text-2xl font-bold text-slate-950 dark:text-white lg:block">
          Datapack Hub
        </span>
      </a>
      <a
        href="/projects"
        class="hover:bg-dph-orange/40 transition-all p-1 rounded-lg"
        >
        {#if isSmall}
        <IconCompass width="24" height="24" color="{iconColor}" />
        {:else}
        <span class="dark:text-slate-100 font-light">Explore</span>
        {/if}
      </a>
      {#if !isSmall}
        <a class="hover:bg-dph-orange/40 transition-all p-1 rounded-lg dark:text-slate-100 font-light" href="https://discord.gg/aEXsdjjdu4">Discord</a>
      {/if}
    </ConditionalWrapper>
    <ConditionalWrapper wrapCondition={!isSmall} classes="flex justify-end items-center space-x-4">
      <a
        href="/projects/new"
        class="hover:bg-dph-orange/40 transition-all p-1 rounded-lg"
        ><IconPlus width="24" height="24" color="{iconColor}" /></a>
      <a
        href="/notifications"
        class="z-20 hover:bg-dph-orange/40 transition-all p-1 rounded-lg"
        aria-label="Notifications page">
        {#if unreadNotifications}
          <IconUnread height="24" width="24" color="{iconColor}" />
        {:else}
          <IconRead height="24" width="24" color="{iconColor}" />
        {/if}
      </a>
      {#if !isSmall}
        {#if $authed && moderatorOrAbove($roleInfo)}
          <a
            href="/moderation"
            class="hover:bg-dph-orange/40 transition-all p-1 rounded-lg"
            ><IconShield width="24" height="24" color="{iconColor}" /></a>
        {/if}
        <ColorSchemeSelector />
      {/if}
      {#if $authed}
        <a
          aria-label="Your profile"
          href="/user/{$user.username}"
          use:tippy="{{
            content:
              $user.username +
              "<span class='items-center'><br /><button onclick=\"document.cookie = 'dph_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; location.replace('/')\" class='text-sky-500'>Sign Out</a></span>",
            placement: 'bottom',
            interactive: true,
            allowHTML: true
          }}">
          <img
            src="{$user.profile_icon}{$user.profile_icon.includes('?')
              ? '&'
              : '?'}size=36"
            alt="{$user.username}'s profile picture"
            height="24"
            width="24"
            class="rounded-full outline outline-2 outline-offset-2 ml-2 hover:brightness-75"
            style="outline-color:{$roleInfo.color ?? '#eab308'};" />
        </a>
      {:else}
        <a
          id="sign_in"
          href="/login"
          aria-label="Button to sign in"
          class="button-primary">
          Sign in
        </a>
      {/if}
    </ConditionalWrapper>
  </nav>
</header>
