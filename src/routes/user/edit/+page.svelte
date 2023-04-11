<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { userData, apiURL, patchAuthed, fetchAuthed } from "$globals";

  function save(){
    const uname = document.getElementById("username") as HTMLInputElement;
    const bio = document.getElementById("bio") as HTMLTextAreaElement;
    let data = {
      id: $userData.id,
      username: uname.value,
      bio: bio.value
    }
    patchAuthed(`${apiURL}/user/id/${$userData.id}`,data).then(resp => {
      $userData.username = uname.value
      $userData.bio = bio.value
      goto("/user/"+uname.value)
    })
  }
</script>

<svelte:head>
  <title>Profile Settings | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64"
>
  <div
    class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"
  >
    <h1
      class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-10"
    >
      Profile Settings for <span class="{$userData.role}-text"
        >{$userData.username}</span
      >
    </h1>
    <div class="align-middle text-center md:text-start">
      <p class="align-middle dark:text-new-white font-brand">Username</p>
      <input
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-10 text-lg p-2 font-brand"
        value={$userData.username}
        id="username"
      />
      <br /><br />
      <p class="align-middle dark:text-new-white font-brand">Bio</p>
      <textarea
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-40 w-80 text-lg p-2 font-brand resize-none"
        maxlength="500"
        value={$userData.bio.replaceAll("\\n", "\n")}
        id="bio"
      />
      <br /><br />
      <button
        on:click={save}
        class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 md:py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2"
      >
        Save Changes
    </button>
    </div>
  </div>
</main>

<style lang="postcss">
  .admin-outline {
    @apply outline-red-500;
  }

  .admin-text {
    @apply text-red-500;
  }

  .moderator-outline {
    @apply outline-orange-500;
  }

  .moderator-text {
    @apply text-orange-500;
  }

  .developer-outline {
    @apply outline-lime-500;
  }

  .developer-text {
    @apply text-lime-500;
  }

  .helper-outline {
    @apply outline-blue-500;
  }

  .helper-text {
    @apply text-blue-500;
  }

  .default-outline {
    @apply outline-yellow-500;
  }

  .default-text {
    @apply text-yellow-500;
  }
</style>
