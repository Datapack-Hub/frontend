<script lang="ts">
  import { goto } from "$app/navigation";
  import { roles } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import { authed, user } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import type { PageData } from "./$types";
  import Button from "$lib/components/decorative/Button.svelte";
  import { title } from "radash";

  export let data: PageData;

  let newRole = data.profile?.role;

  let uname: HTMLInputElement;
  let bio: HTMLTextAreaElement;

  onMount(() => {
    uname = document.getElementById("username") as HTMLInputElement;
    bio = document.getElementById("bio") as HTMLTextAreaElement;
  });

  function save() {
    let req = {
      username: uname.value,
      bio: bio.value,
      role: newRole
    };

    if (bio.value.length > 500) {
      return;
    }

    toast.promise(
      fetchAuthed("PATCH", `/user/id/${data.profile?.id}`, req)
        .then(res => {
          if (!res.ok) {
            return res.text().then(txt => alert(txt));
          }
          if (data.profile?.id == $user.id) {
            $user.username = uname.value;
            $user.bio = bio.value;
          }
          goto("/user/" + uname.value);
        })
        .catch(err => {
          console.error(err);
        }),
      {
        success: "Profile saved!",
        loading: "Saving...",
        error: "Profile unable to save 😭"
      }
    );
  }
</script>

<svelte:head>
  <title>Profile Settings | Datapack Hub</title>
</svelte:head>

<main
  class=" bg-slate-50 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-10 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Profile Settings for <span style="color: {data.role?.color};"
        >{data.profile?.username || "<loading>"}</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <p class="align-middle text-slate-950 dark:text-slate-100">Username</p>
      <input
        class="h-10 rounded-md bg-slate-200 p-2 text-lg text-slate-950 dark:bg-stone-800 dark:text-white"
        value="{data.profile?.username}"
        maxlength="32"
        id="username" />
      <br /><br />
      <p class="align-middle text-slate-950 dark:text-slate-100">Bio</p>
      <textarea
        class="h-96 w-1/2 resize-none rounded-md bg-slate-200 p-2 text-lg text-slate-950 dark:bg-stone-800 dark:text-white"
        maxlength="500"
        value="{data.profile?.bio.replaceAll('\\n', '\n')}"
        id="bio"></textarea>
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
          class="h-10 rounded-md bg-slate-200 p-2 text-lg text-slate-950 dark:bg-stone-800 dark:text-white">
          <option value="{data.profile?.role}" selected
            >{data.profile?.role}</option>
          {#each roles as r}
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
