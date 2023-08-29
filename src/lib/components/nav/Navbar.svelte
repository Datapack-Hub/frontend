<script lang="ts">
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import { fetchAuthed, moderatorOrAbove } from "$lib/globals/functions";
  import { authed, roleInfo, user, windowWidth } from "$lib/globals/stores";
  import tippy from "sveltejs-tippy";
  import IconRead from "~icons/tabler/Bell.svelte";
  import IconUnread from "~icons/tabler/BellRinging.svelte";
  import IconCompass from "~icons/tabler/Compass.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import ColorSchemeSelector from "../ColorSchemeSelector.svelte";
  import ConditionalWrapper from "../utility/ConditionalWrapper.svelte";

  let scrollY: number;

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

  $: isSmall = ($windowWidth ?? 769) < 768;
</script>

<svelte:window bind:scrollY />

<header class="fixed z-50 w-full {isSmall ? 'bottom-0' : 'top-0'}">
  <a
    href="#main-content"
    class="absolute right-1/2 top-4 translate-x-1/2 translate-y-16 cursor-default select-none opacity-0 invert transition-transform focus:translate-y-0 focus:opacity-100 md:-translate-y-16"
    >Jump to Main Content</a>
  <nav
    class="flex w-full transform-gpu items-center justify-around bg-slate-200/40 py-4 backdrop-blur transition-all will-change-transform dark:bg-zinc-800/40 md:justify-between md:px-16">
    <ConditionalWrapper
      wrapCondition="{!isSmall}"
      classes="flex items-center space-x-4">
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
        class="rounded-full p-1 transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange">
        {#if isSmall}
          <IconCompass width="24" height="24" />
        {:else}
          <span class="font-light">Explore</span>
        {/if}
      </a>
      {#if !isSmall}
        <a
          class="rounded-full p-1 font-light transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange"
          href="https://discord.gg/aEXsdjjdu4">Discord</a>
      {/if}
    </ConditionalWrapper>
    <ConditionalWrapper
      wrapCondition="{!isSmall}"
      classes="flex items-center justify-end space-x-4">
      <a
        href="/projects/new"
        class="rounded-full p-1 transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange"
        use:tippy="{newHoverMessage}"><IconPlus width="24" height="24" /></a>
      <a
        href="/notifications"
        class="z-20 rounded-full p-1 transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange"
        aria-label="Notifications page"
        use:tippy="{notificationHoverMessage}">
        {#if unreadNotifications}
          <IconUnread height="24" width="24" />
        {:else}
          <IconRead height="24" width="24" />
        {/if}
      </a>
      {#if !isSmall}
        {#if $authed && moderatorOrAbove($roleInfo)}
          <a
            href="/moderation"
            class="rounded-full p-1 transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange"
            use:tippy="{moderationHoverMessage}"
            ><IconShield width="24" height="24" /></a>
        {/if}
      {/if}
      <ColorSchemeSelector />
      {#if $authed}
        <a
          aria-label="Your profile"
          href="/user/{$user.username}"
          use:tippy="{{
            content:
              $user.username +
              "<span class='items-center'><br /><a href='/?log_out=1' class='text-sky-500'>Sign Out</a></span>",
            placement: 'bottom',
            allowHTML: true,
            interactive: true
          }}">
          <img
            src="{$user.profile_icon}{$user.profile_icon.includes('?')
              ? '&'
              : '?'}size=36"
            alt="{$user.username}'s profile picture"
            height="24"
            width="24"
            class="ml-2 rounded-full outline outline-2 outline-offset-2 hover:brightness-75"
            style="outline-color:{$roleInfo.color ?? '#eab308'};" />
        </a>
      {:else}
        <a id="sign_in" href="/login" class="button-primary"> Sign in </a>
      {/if}
    </ConditionalWrapper>
  </nav>
</header>
