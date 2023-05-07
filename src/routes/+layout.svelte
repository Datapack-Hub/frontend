<script lang="ts">
  import "../app.postcss";
  import Navbar from "$components/nav/Navbar.svelte";
  import {
    apiURL,
    fetchAuthed,
    getCookie,
    isDark,
    loadColorPref,
    user,
    isAuthenticated,
    role,
  } from "$globals";
  import BannedModal from "$components/modals/BannedModal.svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Footer from "$components/nav/Footer.svelte";
  import { setContext } from "svelte";

  (async () => {
    if (browser) {
      if ($page.url.searchParams.has("token")) {
        let newToken = $page.url.searchParams.get("token");
        let expires = new Date();

        expires.setTime(Date.now() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = `dph_token=${newToken}; expires=${expires.toUTCString()}`;

        goto("/");
      }

      let token = await getCookie("dph_token");

      if (token) {
        let [userRes, roleRes] = await Promise.all([
          fetchAuthed("get", `${apiURL}/user/me`),
          fetch(`${apiURL}/user/staff/roles`),
        ]);

        $user = (await userRes.json()) as User;
        $role = (await roleRes.json()).roles.find(
          (v: Role) => v.name == $user.role
        );

        $isAuthenticated = true;
      }

      loadColorPref();
    }
  })();

  setContext("user", user);
  setContext("roleData", role);
</script>

<!-- {#await pageLoad() then} -->
<div class="{$isDark ? 'dark' : ''}">
  <div class="min-h-screen bg-new-white-200 transition-all dark:bg-stone-900">
    <Navbar />
    <BannedModal />
    <slot />
  </div>
  <Footer />
</div>

<!-- {/await} -->
