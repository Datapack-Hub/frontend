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

  (async function onMount() {
    if (browser) {
      $isDark = loadColorPref();

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
        $isAuthenticated = true;
      }
    }
  })();
</script>

<!-- {#await pageLoad() then} -->
<div class="{$isDark ? ' dark' : ''}">
  <div class="dark:bg-stone-900 bg-new-white">
    <BannedModal />
    <Navbar />
    <slot />
  </div>
  <Footer />
</div>
<!-- {/await} -->
