<script lang="ts">
  import { isAuthenticated, userData, apiURL } from "$globals";
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
</script>

<a href="/" target="_self" class="z-50 ml-6 flex items-center justify-center">
  {#if $isAuthenticated}
    {#if $userData.role != "default"}
      <a href="/moderation/console">
        <img
          src="/icons/moderation.svg"
          width="32"
          height="32"
          alt="moderation menu"
          class="z-20 mr-7 dark:invert"
          use:tippy="{moderationHoverMsg}" />
      </a>
    {/if}
    <a href="/notifications"
      ><img
        src="/icons/bell.svg"
        width="32"
        height="32"
        alt="wip"
        class="z-20 dark:invert"
        use:tippy="{notificationHoverMsg}" /></a>
    <a
      href="/user/{$userData.username}"
      use:tippy="{{
        content: $userData.username,
        placement: 'bottom',
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
</a>
