<script lang="ts">
  import { browser } from "$app/environment";
  import {
    apiURL,
    fetchAuthed,
  } from "$lib/globals/functions";
  import { onMount } from "svelte";
  import tippy from "sveltejs-tippy";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconUnread from "~icons/tabler/BellExclamation.svelte";
  import IconRead from "~icons/tabler/Bell.svelte";
  import { isAuthenticated, isDark, role, user } from "$lib/globals/stores";

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

  onMount(async () => {
    if (browser) {
      let notif = await fetchAuthed("get", `${apiURL}/notifs/unread`);

      if (notif.ok) {
        let notifJson = await notif.json();
        if (notifJson.count != 0) notifsAvailable = true;
      }
    }
  });

  $: iconColor = $isDark ? "white" : "black";
</script>

<div class="z-50 ml-6 flex items-center justify-center">
  {#if $isAuthenticated}
    {#if ["moderator", "developer", "admin"].includes($role.name)}
      <a
        href="/moderation/console"
        aria-label="Moderation console"
        class="z-20 mr-6"
        use:tippy="{moderationHoverMsg}">
        <IconShield height="24" width="24" color="{iconColor}" />
      </a>
    {/if}
    <a href="/notifications" class="z-20" use:tippy="{notificationHoverMsg}">
      {#if notifsAvailable}
        <IconUnread height="24" width="24" color="{iconColor}" />
      {:else}
        <IconRead height="24" width="24" color="{iconColor}" />
      {/if}
    </a>
    <a
      href="/user/{$user.username}"
      use:tippy="{{
        content:
          $user.username +
          "<span class='items-center'><br /><button onclick=\"document.cookie = 'dph_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; window.location.replace('/')\" class='text-sky-500'>Sign Out</a></span>",
        placement: 'bottom',
        interactive: true,
        allowHTML: true,
      }}">
      <img
        src="{$user.profile_icon}&size=48"
        alt="{$user.username}'s profile picture"
        height="32"
        width="32"
        class="ml-6 rounded-full outline outline-2 outline-offset-2"
        style="outline-color:{$role.color ?? '#eab308'};" />
    </a>
  {:else}
    <a
      id="sign_in"
      href="{apiURL}/auth/login"
      aria-label="Button to sign in via GitHub"
      class="text-md rounded-md border-2 border-red-500 bg-red-500 bg-opacity-30 px-2 py-1 font-brand text-red-500 transition-all hover:scale-110 active:brightness-75 dark:border-red-400 dark:bg-red-400 dark:bg-opacity-10 dark:text-red-400 md:px-3 md:py-2 md:text-lg lg:text-xl"
      use:tippy="{signInHoverMsg}">
      Sign in
    </a>
  {/if}
</div>
