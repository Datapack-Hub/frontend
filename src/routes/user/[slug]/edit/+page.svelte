<script lang="ts">
  import { goto } from "$app/navigation";
  import { userData, apiURL, patchAuthed, isAuthenticated } from "$globals";
  import type { PageData } from "./$types";

  export let data: PageData;

  function save() {
    const uname = document.getElementById("username") as HTMLInputElement;
    const bio = document.getElementById("bio") as HTMLTextAreaElement;
    let send = {
      username: uname.value,
      bio: bio.value,
      role: data.profile?.role,
    };
    if ($userData.role == "admin") {
      send.role = (document.getElementById("role") as HTMLInputElement).value;
    }
    patchAuthed(`${apiURL}/user/id/${data.profile?.id}`, send).then((resp) => {
      if (resp.ok) {
      } else return resp.text().then((txt) => alert(txt));
      if (data.profile?.id == $userData.id) {
        $userData.username = uname.value;
        $userData.bio = bio.value;
      }
      goto("/user/" + uname.value);
    });
  }
</script>

<svelte:head>
  <title>Profile Settings | Datapack Hub</title>
</svelte:head>

<main
  class="overflow-y-scroll bg-new-white px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="h-screen w-full flex-col items-center pt-10 md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-10 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Profile Settings for <span class="{data.profile?.role}-text"
        >{data.profile?.username || "<loading>"}</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <p class="align-middle font-brand dark:text-new-white">Username</p>
      <input
        class="h-10 rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        value="{data.profile?.username}"
        id="username" />
      <br /><br />
      <p class="align-middle font-brand dark:text-new-white">Bio</p>
      <textarea
        class="h-40 w-80 resize-none rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        maxlength="500"
        value="{data.profile?.bio.replaceAll('\\n', '\n')}"
        id="bio"></textarea>
      <br /><br />
      {#if $isAuthenticated && $userData.role == "admin"}
        <p class="align-middle font-brand dark:text-new-white">Site Role</p>
        <input
          class="h-10 rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
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
