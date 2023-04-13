<script lang="ts">
  import { goto } from "$app/navigation";
  import { userData, apiURL, patchAuthed, isAuthenticated } from "$globals";
  import type { PageData } from "./$types";

  export let data: PageData;

  function save(){
    const uname = document.getElementById("username") as HTMLInputElement;
    const bio = document.getElementById("bio") as HTMLTextAreaElement;
    let send = {
      username: uname.value,
      bio: bio.value,
      role: data.profile?.role
    }
    if($userData.role == "admin"){
      send.role = (document.getElementById("role") as HTMLInputElement).value;
    }
    patchAuthed(`${apiURL}/user/id/${data.profile?.id}`,send).then(resp => {
      if (resp.ok) {} else return resp.text().then(txt => alert(txt));
      if(data.profile?.id == $userData.id) {
        $userData.username = uname.value
        $userData.bio = bio.value
      }
      goto("/user/"+uname.value)
    })
  }
</script>

<svelte:head>
  <title>Profile Settings | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64 overflow-y-scroll"
>
  <div
    class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"
  >
    <h1
      class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-10"
    >
      Profile Settings for <span class="{data.profile?.role}-text"
        >{data.profile?.username || "<loading>"}</span
      >
    </h1>
    <div class="align-middle text-center md:text-start">
      <p class="align-middle dark:text-new-white font-brand">Username</p>
      <input
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-10 text-lg p-2 font-brand"
        value={data.profile?.username}
        id="username"
      />
      <br /><br />
      <p class="align-middle dark:text-new-white font-brand">Bio</p>
      <textarea
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-40 w-80 text-lg p-2 font-brand resize-none"
        maxlength="500"
        value={data.profile?.bio.replaceAll("\\n", "\n")}
        id="bio"
      />
      <br /><br />
      {#if $isAuthenticated && $userData.role == "admin"}
      <p class="align-middle dark:text-new-white font-brand">Site Role</p>
      <input
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-10 text-lg p-2 font-brand"
        value={data.profile?.role}
        id="role"
      /><br /><br />
      {/if}
      <button
        on:click={save}
        class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 md:py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 my-2"
      >
        Save Changes
    </button>
    </div>
  </div>
</main>