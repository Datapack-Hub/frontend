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
  import Modal from "../modals/Modal.svelte";
  import ConditionalWrapper from "../utility/ConditionalWrapper.svelte";

  let signInModal: Modal;

  let scrollY: number;

  let notificationTip = {
    content: "Notifications",
    placement: "bottom"
  };

  let moderationTip = {
    content: "Moderation",
    placement: "bottom"
  };

  let newProjectTip = {
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
  class="fixed z-50 w-full transform-gpu backdrop-blur {isSmall
    ? 'bottom-0'
    : 'top-0'}">
  <a
    href="#main-content"
    class="absolute right-1/2 top-4 translate-x-1/2 translate-y-16 cursor-default select-none opacity-0 invert transition-transform focus:translate-y-0 focus:opacity-100 md:-translate-y-16"
    >Jump to Main Content</a>
  <nav
    class="flex w-full items-center justify-around bg-slate-200/40 py-4 dark:bg-zinc-800/40 md:justify-between md:px-16">
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
        aria-label="Explore datapacks"
        class="rounded-full p-1 transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange">
        <IconCompass width="24" height="24" class="block md:hidden" />
        <span class="hidden font-light md:block">Explore</span>
      </a>
      <a
        class="hidden rounded-full p-1 font-light transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:block md:hover:bg-transparent md:hover:text-dph-orange"
        href="https://discord.datapackhub.net">Discord</a>
    </ConditionalWrapper>
    <ConditionalWrapper
      wrapCondition="{!isSmall}"
      classes="flex items-center justify-end space-x-4">
      {#if $authed}
        <a
          aria-label="New project"
          href="/projects/new"
          class="rounded-full p-1 transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange"
          use:tippy="{newProjectTip}"><IconPlus width="24" height="24" /></a>
        <a
          href="/notifications"
          class="rounded-full p-1 transition-all hover:bg-dph-orange/40 dark:text-slate-100 md:hover:bg-transparent md:hover:text-dph-orange"
          aria-label="Notifications page"
          use:tippy="{notificationTip}">
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
              use:tippy="{moderationTip}"
              ><IconShield width="24" height="24" /></a>
          {/if}
        {/if}
      {/if}
      <ColorSchemeSelector />
      {#if $authed}
        <a
          class="py-2"
          aria-label="Your profile"
          href="/user/{$user.username}"
          use:tippy="{{
            content:
              $user.username +
              "<span class='items-center'><br /><a data-sveltekit-preload-data=\"tap\" href='/?log_out=1' class='text-sky-500'>Sign Out</a></span>",
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
