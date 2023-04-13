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

  let notificiationHoverMsg = {
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

      if (token != null) {
        let res = await fetchAuthed("get", apiURL + "/user/me");

        if (res.ok) {
          $userData = (await res.json()) as User;
          $isAuthenticated = true;
        }
        return
      }
      let loginIsPresent = query.has("login") && parseInt(query.get("login")!) == 1
      
      if (loginIsPresent && query.has("token")) {
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

<a href="/" target="_self" class="flex items-center justify-center ml-6 z-50">
  {#if $isAuthenticated}
    {#if $userData.role != "default"}
      <a href="/moderation/console">
        <img
          src="/icons/moderation.svg"
          width="32"
          height="32"
          alt="wip"
          class="dark:invert z-20 mr-7"
          use:tippy={moderationHoverMsg}
        />
      </a>
    {/if}
    <a href="/notifications"
      ><img
        src="/icons/bell.svg"
        width="32"
        height="32"
        alt="wip"
        class="dark:invert z-20"
        use:tippy={notificiationHoverMsg}
      /></a
    >
    <a
      href="/user/{$userData.username}"
      use:tippy={{
        content: $userData.username,
        placement: "bottom",
      }}
    >
      <img
        src={$userData.profile_icon}
        alt="{$userData.username}'s profile picture"
        height="32"
        width="32"
        class="rounded-full outline outline-2 {$userData.role}-outline outline-offset-2 ml-6"
      />
    </a>
  {:else}
    <a
      id="sign_in"
      href="{apiURL}/auth/login"
      class="dark:text-red-400 text-red-500 dark:bg-red-400 bg-red-500 bg-opacity-30 dark:bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-1 md:py-2 text-md md:text-lg lg:text-xl hover:scale-110 transition-all border-2 dark:border-red-400 border-red-500 active:brightness-75"
      use:tippy={signInHoverMsg}
    >
      Sign in
    </a>
  {/if}
</a>