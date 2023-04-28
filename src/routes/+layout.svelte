<script lang="ts">
  import Navbar from "$components/interactable/Navbar.svelte";
  import {
    apiURL,
    fetchAuthed,
    getCookie,
    isDark,
    loadColorPref,
    userData,
    isAuthenticated,
    roleInfo,
  } from "$globals";
  import "../app.postcss";
  import BannedModal from "$components/modals/BannedModal.svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Footer from "$components/interactable/Footer.svelte";
  import { setContext } from "svelte";

  let banData:
    | { banned: boolean; banData: { message: string; expires: number } }
    | undefined;

  (async () => {
    if (browser) {
      $userData = JSON.parse(localStorage.getItem("userData")!) as User;

      if ($page.url.searchParams.has("token")) {
        let newToken = $page.url.searchParams.get("token");
        let date = new Date();

        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);

        let expires = date.toUTCString();

        document.cookie = `dph_token=${newToken}; expires=${expires}`;

        goto("/");
      }

      let token = await getCookie("dph_token");
      if (token) {
        let [userRes, roleRes] = await Promise.all([
          await fetchAuthed("get", `${apiURL}/user/me`),
          await fetch(`${apiURL}/user/staff/roles`),
        ]);
        let fullUser = await userRes.json();
        let user = fullUser as User;

        $roleInfo = (await roleRes.json()).roles.find(
          (v: Role) => (v.name = user.role)
        );
        $userData = user;

        banData = { banned: fullUser.banned, banData: fullUser.banData };
        localStorage.setItem("userData", JSON.stringify($userData));

        $isAuthenticated = true;
      }

      loadColorPref();
    }
  })();

  setContext("roleData", roleInfo);
</script>

<!-- {#await pageLoad() then} -->
<div class="{$isDark ? ' dark' : ''}">
  <div class="bg-new-white-200 dark:bg-stone-900">
    <Navbar />
    <BannedModal bannedUser="{banData}" />
    <slot />
  </div>
  <Footer />
</div>

<!-- {/await} -->
