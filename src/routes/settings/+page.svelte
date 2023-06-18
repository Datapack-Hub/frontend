<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import { fetchAuthed } from "$lib/globals/functions";
  import { user } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";

  export let data: PageData;

  let uname: HTMLInputElement;
  let bio: HTMLTextAreaElement;

  onMount(() => {
    uname = document.getElementById("username") as HTMLInputElement;
    bio = document.getElementById("bio") as HTMLTextAreaElement;
  });

  async function save() {
    console.log(data.role?.name);
    let req = {
      username: uname.value,
      bio: bio.value,
      role: data.profile?.role
    };

    if (bio.value.length > 500) {
      return;
    }

    await toast.promise(
      fetchAuthed("PATCH", `/user/id/${data.profile?.id}`, req).then(res => {
        if (!res.ok) {
          return res.text().then(txt => alert(txt));
        }
        if (data.profile?.id == $user.id) {
          $user.username = uname.value.trim();
          $user.bio = bio.value.trim();
        }
        goto("/user/" + uname.value);
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
  class="-translate-y-20 bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 md:translate-y-0 lg:px-32 xl:px-64">
  <div
    class="min-h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      id="profile"
      class="mt-8 text-center text-3xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-2xl lg:text-3xl">
      Profile Settings for <span style="color: {data.role?.color};"
        >{data.profile?.username || "Loading..."}</span>
    </h1>
    <p class="text-pearl-lusta-950 dark:text-pearl-lusta-100 pb-6">
      These settings are visible to everyone who views your profile
    </p>
    <div class="text-center align-middle md:text-start">
      <p class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
        Username
      </p>
      <p
        class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 opacity-40 text-sm">
        Your username is used to view your profile. Your username is displayed
        on your datapacks and more coming soon
      </p>
      <input
        class="h-10 rounded-md bg-pearl-lusta-200 p-2 text-lg text-pearl-lusta-950 dark:bg-stone-800 dark:text-white"
        value="{data.profile?.username}"
        maxlength="32"
        id="username" />
      <p
        class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 mt-6">
        Bio
      </p>
      <p
        class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 mb-2 text-sm opacity-40">
        Your bio is visible for anyone to see, don't store important information
        in it!
      </p>
      <textarea
        class="h-64 w-1/2 resize-none rounded-md bg-pearl-lusta-200 p-2 text-lg text-pearl-lusta-950 dark:bg-stone-800 dark:text-white"
        maxlength="500"
        value="{data.profile?.bio.replaceAll('\\n', '\n')}"
        id="bio"></textarea>
      {#key 500 - bio?.value.length}
        <p
          class="align-middle text-xs text-pearl-lusta-950 dark:text-pearl-lusta-100">
          {(500 - bio?.value.length).toString()} characters left
        </p>
      {/key}
      <br />
      <Button click="{save}" wait="{true}" style="alt" classes="mb-6"
        >Save Changes</Button>
    </div>
  </div>
</main>
