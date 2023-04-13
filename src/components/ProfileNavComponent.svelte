<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    isAuthenticated,
    fetchAuthed,
    userData,
    apiURL,
    getCookie,
  } from "$globals";
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

  (async () => {
    if (browser) {
      let token = await getCookie("dph_token");
      let query = $page.url.searchParams;

      if (token != "") {
        let res = await fetchAuthed("get", apiURL + "/user/me");

        if (res.ok) {
          $userData = (await res.json()) as User;
          $isAuthenticated = true;
        }
        return;
      }

      let loginExist = query.has("login") && parseInt(query.get("login")!) == 1;

      if (loginExist && query.has("token")) {
        let token = query.get("token");

        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);

        let expires = date.toUTCString();

        document.cookie = `dph_token=${token}; expires=${expires}`;

        let res = await fetchAuthed("get", apiURL + "/user/me");

        if (res.ok) {
          $userData = (await res.json()) as User;
          $isAuthenticated = true;
        }
        goto("/");
      }
    }
  })();
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
