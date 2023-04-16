<script lang="ts">
  import { browser } from "$app/environment";
  import { isAuthenticated, userData, apiURL, fetchAuthed } from "$globals";
  import {
    IconBell,
    IconBellExclamation,
    IconShield,
  } from "@tabler/icons-svelte";
  import tippy from "sveltejs-tippy";

  let signInHoverMsg = {
    content: "Sign In",
    placement: "bottom",
  };

  let notificationHoverMsg = {
    content: "Notifications",
    placement: "bottom",
  };

  let moderationHoverMsg = {
    content: "Moderation",
    placement: "bottom",
  };

  let notifsAvailable = false;

  (async () => {
    if(browser) {
      let notif = await fetchAuthed("get", `${apiURL}/notifs/unread`);
      if(notif.ok) {
        let notifJson = await notif.json();
        if (notifJson.count != 0) notifsAvailable = true;
      }
    }
  })();
</script>

<div class="z-50 ml-6 flex items-center justify-center">
  {#if $isAuthenticated}
    {#if $userData.role != "default"}
      <a
        href="/moderation/console"
        class="z-20 mr-7"
        use:tippy="{moderationHoverMsg}">
        <IconShield color="white" size="{32}" />
      </a>
    {/if}
    <a href="/notifications" class="z-20" use:tippy="{notificationHoverMsg}">
      {#if notifsAvailable}
        <IconBellExclamation color="white" size="{32}" />
      {:else}
        <IconBell color="white" size="{32}" />
      {/if}
    </a>
    <a
      href="/user/{$userData.username}"
      use:tippy="{{
        content:
          $userData.username +
          "<span class='items-center'><br /><button onclick=\"document.cookie = 'dph_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; window.location.replace('/')\" class='text-sky-500'>Sign Out</a></span>",
        placement: 'bottom',
        interactive: true,
        allowHTML: true,
      }}">
      <img
        src="{$userData.profile_icon}"
        alt="{$userData.username}'s profile picture"
        height="32"
        width="32"
        class="rounded-full outline outline-2 {$userData.role}-outline ml-6 outline-offset-2" />
    </a>
  {:else}
    <a
      id="sign_in"
      href="{apiURL}/auth/login"
      class="text-md rounded-md border-2 border-red-500 bg-red-500 bg-opacity-30 px-2 py-1 font-brand text-red-500 transition-all hover:scale-110 active:brightness-75 dark:border-red-400 dark:bg-red-400 dark:bg-opacity-10 dark:text-red-400 md:px-3 md:py-2 md:text-lg lg:text-xl"
      use:tippy="{signInHoverMsg}">
      Sign in
    </a>
  {/if}
</div>
