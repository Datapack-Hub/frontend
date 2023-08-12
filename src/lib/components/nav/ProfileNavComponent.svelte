<script lang="ts">
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import { fetchAuthed, moderatorOrAbove } from "$lib/globals/functions";
  import { authed, isDark, roleInfo, user } from "$lib/globals/stores";
  import tippy from "sveltejs-tippy";
  import IconRead from "~icons/tabler/Bell.svelte";
  import IconUnread from "~icons/tabler/BellRinging.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import { sanitize } from "isomorphic-dompurify";

  export let small: boolean;

  let cleanUsername = "";

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
</script>

<div class="z-50 ml-3 flex items-center justify-center md:ml-6">
  {#if $authed}
    {#if moderatorOrAbove($roleInfo) && !small}
      <a
        href="/moderation"
        aria-label="Moderation page"
        class="z-20 mr-2 md:mr-6 hover:brightness-75"
        use:tippy="{moderationHoverMessage}">
        <IconShield height="24" width="24" color="{iconColor}" />
      </a>
    {/if}
    <a
      href="/notifications"
      class="z-20 hover:brightness-75"
      aria-label="Notifications page"
      use:tippy="{notificationHoverMessage}">
      {#if unreadNotifications}
        <IconUnread height="24" width="24" color="{iconColor}" />
      {:else}
        <IconRead height="24" width="24" color="{iconColor}" />
      {/if}
    </a>
    {#if !small}
      <a
        href="/projects/new"
        aria-label="Create Project page"
        class="z-20 ml-2 md:ml-6 hover:brightness-75"
        use:tippy="{newHoverMessage}">
        <IconPlus height="24" width="24" color="{iconColor}" />
      </a>
    {/if}
    <a
      aria-label="Your profile"
      href="/user/{$user.username}"
      use:tippy="{{
        content:
          sanitize($user.username) +
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
        class="ml-3 rounded-full outline outline-2 outline-offset-2 md:ml-6 hover:brightness-75"
        style="outline-color:{$roleInfo.color ?? '#eab308'};" />
    </a>
  {:else}
    <a
      id="sign_in"
      href="/login"
      aria-label="Button to sign in"
      class="button-primary"
      use:tippy="{signInHoverMessage}">
      Sign in
    </a>
  {/if}
</div>
