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
  } from "$globals";
  import "../app.postcss";
  import BannedModal from "$components/modals/BannedModal.svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Footer from "$components/interactable/Footer.svelte";

  (async () => {
    if (browser) {
      $userData = JSON.parse(localStorage.getItem("userData")!) as User;

      loadColorPref();

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
        let usr = await fetchAuthed("get", `${apiURL}/user/me`);
        let usrJson = (await usr.json()) as User;
        $userData = usrJson;
        localStorage.setItem("userData", JSON.stringify($userData));
        $isAuthenticated = true;
      }

    }
  })();
</script>

<!-- {#await pageLoad() then} -->
<div class="{$isDark ? ' dark' : ''}">
  <div class="bg-new-white-200 dark:bg-stone-900">
    <Navbar />
    <BannedModal />
    <slot />
  </div>
  <Footer />
</div>

<!-- {/await} -->
