<script lang="ts">
  import { browser } from "$app/environment";
  import {
    isAuthenticated,
    userData,
    apiURL,
    fetchAuthed,
    isDark,
    role,
  } from "$globals";
  import { onMount } from "svelte";
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
  let iconColor = $isDark ? "white" : "black";

  onMount(async () => {
    if (browser) {
      let notif = await fetchAuthed("get", `${apiURL}/notifs/unread`);

      if (notif.ok) {
        let notifJson = await notif.json();
        if (notifJson.count != 0) notifsAvailable = true;
      }

      console.log($role);
      setTimeout(() => console.log($role), 2000)
    }
  });
</script>

<div class="z-50 ml-6 flex items-center justify-center">
  {#if $isAuthenticated}
    {#key $isDark}
      {#if ["moderator", "developer", "admin"].includes($role.name)}
        <a
          href="/moderation/console"
          class="z-20 mr-6"
          use:tippy="{moderationHoverMsg}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-shield stroke-black dark:stroke-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"
            ></path>
          </svg>
        </a>
      {/if}
      <a href="/notifications" class="z-20" use:tippy="{notificationHoverMsg}">
        {#if notifsAvailable}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="{iconColor}"
            class="icon icon-tabler icon-tabler-bell-exclamation stroke-black dark:stroke-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5"
            ></path>
            <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
            <path d="M19 16v3"></path>
            <path d="M19 22v.01"></path>
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="{iconColor}"
            class="icon icon-tabler icon-tabler-bell stroke-black dark:stroke-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
            ></path>
            <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
          </svg>
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
          src="{$userData.profile_icon}&size=32"
          alt="{$userData.username}'s profile picture"
          height="32"
          width="32"
          class="ml-6 rounded-full outline outline-2 outline-offset-2"
          style="outline-color:{userRole.color ?? '#eab308'};" />
      </a>
    {/key}
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
