<script lang="ts">
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import { fetchAuthed } from "$lib/globals/functions";
  import { authed, isDark, role, user } from "$lib/globals/stores";
  import tippy from "sveltejs-tippy";
  import IconRead from "~icons/tabler/Bell.svelte";
  import IconUnread from "~icons/tabler/BellRinging.svelte";
  import IconPlus from "~icons/tabler/Plus.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";

  export let small: boolean;

  let signInHoverMsg = {
    content: "Sign In",
    placement: "bottom"
  };

  let notificationHoverMsg = {
    content: "Notifications",
    placement: "bottom"
  };

  let moderationHoverMsg = {
    content: "Moderation",
    placement: "bottom"
  };

  let newHoverMsg = {
    content: "Create Project",
    placement: "bottom"
  };

  $: unreadNotifications = false;

  afterNavigate(() => {
    if (browser && $authed) {
      refreshNotifications().catch(err => console.error(err));
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
    {#if ["moderator", "developer", "admin"].includes($role.name) && !small}
      <a
        href="/moderation"
        aria-label="Moderation"
        class="z-20 mr-2 md:mr-6"
        use:tippy="{moderationHoverMsg}">
        <IconShield height="24" width="24" color="{iconColor}" />
      </a>
    {/if}
    <a
      href="/notifications"
      class="z-20"
      aria-label="Click to read notifications"
      use:tippy="{notificationHoverMsg}">
      {#if unreadNotifications}
        <IconUnread height="24" width="24" color="{iconColor}" />
      {:else}
        <IconRead height="24" width="24" color="{iconColor}" />
      {/if}
    </a>
    {#if !small}
      <a
        href="/projects/new"
        aria-label="Create Project"
        class="z-20 ml-2 md:ml-6"
        use:tippy="{newHoverMsg}">
        <IconPlus height="24" width="24" color="{iconColor}" />
      </a>
    {/if}
    <a
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
        class="ml-3 rounded-full outline outline-2 outline-offset-2 md:ml-6"
        style="outline-color:{$role.color ?? '#eab308'};" />
    </a>
  {:else}
    <a
      id="sign_in"
      href="/login"
      aria-label="Button to sign in"
      class="button-secondary"
      use:tippy="{signInHoverMsg}">
      Sign in
    </a>
  {/if}
</div>
