<script lang="ts">
  import { browser } from "$app/environment";
  import { isAuthenticated, userData } from "$globals";
  import tippy from "sveltejs-tippy";

  let signInHoverMsg = {
    content: "Sign In",
    placement: "bottom",
  };

  let personHoverMsg = {
    content: "",
    placement: "bottom",
  };

  let notificiationHoverMsg = {
    content: "Notifications",
    placement: "bottom",
  };

  (async () => {
    if (browser) {
      let token = localStorage.getItem("dph_token");
      if (token != null) {
        let res = await fetch("https://api.datapackhub.net/user/me", {
          method: "get",
          headers: {
            authentication: `Basic ${token}`,
          },
        });

        if (res.ok) {
          $userData = (await res.json()) as User;
          personHoverMsg.content = $userData.username;
          $isAuthenticated = true;
        }
      }
    }
  })();
</script>

<a href="/" target="_self" class="ml-6 flex items-center justify-center z-20">
  {#if $isAuthenticated}
    <img
      src="/icons/bell.svg"
      width="32"
      height="32"
      alt="wip"
      class="dark:invert z-20"
      use:tippy={notificiationHoverMsg}
    />
    <a href="/user/{$userData.username}" use:tippy={personHoverMsg}>
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
      href="https://api.datapackhub.net/auth/login"
      class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-1 md:py-2 text-md md:text-lg lg:text-xl hover:scale-110 transition-all border-2 border-red-400 active:brightness-75"
      use:tippy={signInHoverMsg}
    >
      Sign in
    </a>
  {/if}
</a>

<style lang="postcss">
  .admin-outline {
    @apply outline-red-500;
  }

  .moderator-outline {
    @apply outline-orange-500;
  }

  .developer-outline {
    @apply outline-lime-500;
  }

  .helper-outline {
    @apply outline-blue-500;
  }

  .default-outline {
    @apply outline-yellow-500;
  }
</style>
