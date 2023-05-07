<script lang="ts">
  import "../app.postcss";
  import Navbar from "$components/nav/Navbar.svelte";
  import {
    apiURL,
    fetchAuthed,
    getCookie,
    isDark,
    loadColorPref,
    isAuthenticated,
  } from "$globals";
  import BannedModal from "$components/modals/BannedModal.svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Footer from "$components/nav/Footer.svelte";
  import { setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";

  /**
   * Store for User Data, this contains all the user's data
   */

  const user: Writable<User> = writable();
  $: user.set({
    id: -1,
    bio: "",
    profile_icon: "",
    role: "default",
    username: "",
    banned: false,
  });

  /**
   * Contains all information about a role
   */
  const role: Writable<Role> = writable();
  $: role.set({
    name: "default",
    color: null,
    verified: false,
    permissions: [] as string[],
  });

  (async () => {
    if (browser) {
      $user = JSON.parse(localStorage.getItem("userData")!) as User;

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
          fetchAuthed("get", `${apiURL}/user/me`),
          fetch(`${apiURL}/user/staff/roles`),
        ]);
        let userJson = (await userRes.json()) as User;

        role.set(
          (await roleRes.json()).roles.find(
            (v: Role) => v.name == userJson.role
          )
        );

        user.set(userJson);

        localStorage.setItem("userData", JSON.stringify($user));

        $isAuthenticated = true;
      }

      loadColorPref();
    }
  })();

  setContext("role", role);
  setContext("user", user);
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
