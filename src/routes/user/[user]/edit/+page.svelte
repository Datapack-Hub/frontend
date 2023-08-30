<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/decorative/Button.svelte";
  import { roleNames } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import { authed, user } from "$lib/globals/stores";
  import { title } from "radash";
  import { toast } from "svelte-sonner";
  import type { PageData } from "./$types";

  export let data: PageData;

  let newRole = data.profile?.role;

  let uname: HTMLInputElement;
  let bio: HTMLTextAreaElement;

  function save() {
    let request = {
      username: uname.value,
      bio: bio.value,
      role: newRole
    };

    if (bio.value.length > 500) {
      return;
    }

    toast.promise(
      fetchAuthed("PATCH", `/user/id/${data.profile?.id}`, { data: request })
        .then(response => {
          if (!response.ok) {
            return response.text().then(txt => alert(txt));
          }
          if (data.profile?.id == $user.id) {
            $user.username = uname.value;
            $user.bio = bio.value;
          }
          goto("/user/" + uname.value);
        })
        .catch(error => {
          console.error(error);
        }),
      {
        success: "Profile saved!",
        loading: "Saving...",
        error: "Profile unable to save 😭",
        info: "",
        warning: ""
      }
    );
  }
</script>

<svelte:head>
  <title>Profile Settings | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 px-0 transition-all dark:bg-zinc-900 md:px-16 lg:px-32 xl:px-64">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-10 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Profile Settings for <span style="color: {data.role?.color};"
        >{data.profile?.username || "Loading..."}</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <p class="align-middle text-slate-950 dark:text-slate-100">Username</p>
      <input
        class="h-10 rounded-md bg-slate-200 p-3 text-lg text-slate-950 dark:bg-zinc-800 dark:text-white"
        value="{data.profile?.username}"
        maxlength="32"
        bind:this="{uname}" />
      <br /><br />
      <p class="align-middle text-slate-950 dark:text-slate-100">Bio</p>
      <textarea
        class="h-96 w-4/5 resize-none rounded-md bg-slate-200 p-3 text-lg text-slate-950 dark:bg-zinc-800 dark:text-white md:w-2/3 lg:w-1/2"
        maxlength="500"
        value="{data.profile?.bio.replaceAll('\\n', '\n')}"
        bind:this="{bio}"></textarea>
      {#key 500 - bio?.value.length}
        <p class="align-middle text-xs text-slate-950 dark:text-slate-100">
          {(500 - bio?.value.length).toString()} characters left
        </p>
      {/key}
      <br /><br />
      {#if $authed && $user.role == "admin"}
        <p class="align-middle text-slate-950 dark:text-slate-100">Site Role</p>
        <select
          name="roleSelection"
          id="rolez"
          bind:value="{newRole}"
          class="h-10 rounded-md bg-slate-200 p-3 text-lg text-slate-950 dark:bg-zinc-800 dark:text-white">
          <option value="{data.profile?.role}" selected
            >{data.profile?.role}</option>
          {#each roleNames as r}
            {#if r != data.profile?.role}
              <option value="{r}" selected>{title(r)}</option>
            {/if}
          {/each}
        </select><br /><br />
      {/if}
      <Button click="{save}" wait="{true}" style="alt">Save Changes</Button>
    </div>
  </div>
</main>
