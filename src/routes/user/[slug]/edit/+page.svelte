<script lang="ts">
  import { goto } from "$app/navigation";
  import { apiURL, fetchAuthed } from "$lib/globals/functions";
  import { isAuthenticated, user } from "$lib/globals/stores"
  import type { PageData } from "./$types";

  export let data: PageData;

  function save() {
    const uname = document.getElementById("username") as HTMLInputElement;
    const bio = document.getElementById("bio") as HTMLTextAreaElement;

    let req = {
      username: uname.value,
      bio: bio.value,
      role: data.profile?.role,
    };

    if ($user.role == "admin") {
      req.role = (document.getElementById("role") as HTMLInputElement).value;
    }

    fetchAuthed("patch", `${apiURL}/user/id/${data.profile?.id}`, req).then(
      (res) => {
        if (!res.ok) {
          return res.text().then((txt) => alert(txt));
        }
        if (data.profile?.id == $user.id) {
          $user.username = uname.value;
          $user.bio = bio.value;
        }
        goto("/user/" + uname.value);
      }
    );
  }
</script>

<svelte:head>
  <title>Profile Settings | Datapack Hub</title>
</svelte:head>

<main
  class="-translate-y-20 overflow-y-scroll bg-new-white-200 px-4 transition-all dark:bg-stone-900 md:translate-y-0 lg:px-32 xl:px-64">
  <div
    class="h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-10 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Profile Settings for <span class="{data.profile?.role}-text"
        >{data.profile?.username || "<loading>"}</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <p class="align-middle font-brand dark:text-new-white-200">Username</p>
      <input
        class="h-10 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        value="{data.profile?.username}"
        id="username" />
      <br /><br />
      <p class="align-middle font-brand dark:text-new-white-200">Bio</p>
      <textarea
        class="h-40 w-80 resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        maxlength="500"
        value="{data.profile?.bio.replaceAll('\\n', '\n')}"
        id="bio"></textarea>
      <br /><br />
      {#if $isAuthenticated && $user.role == "admin"}
        <p class="align-middle font-brand dark:text-new-white-200">Site Role</p>
        <input
          class="h-10 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
          value="{data.profile?.role}"
          id="role" /><br /><br />
      {/if}
      <button
        on:click="{save}"
        class="text-md my-2 rounded-md border-2 border-red-400 bg-red-400 bg-opacity-10 px-2 py-2 font-brand text-red-400 transition-all hover:scale-105 active:brightness-75 md:px-3 md:py-2 md:text-lg lg:text-xl">
        Save Changes
      </button>
    </div>
  </div>
</main>
