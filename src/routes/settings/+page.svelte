<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import { fetchAuthed } from "$lib/globals/functions";
  import { user } from "$lib/globals/stores";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";
  import autoAnimate from "@formkit/auto-animate";

  import IconGithub from "~icons/tabler/BrandGithub.svelte";
  import IconDiscord from "~icons/tabler/BrandDiscord.svelte";

  export let data: PageData;

  let uname: HTMLInputElement;
  let bioVal: string | undefined = data.profile?.bio.replaceAll("\\n", "\n");

  let activePage = "profile";

  let remainingCharacters: number;

  onMount(() => {
    uname = document.getElementById("username") as HTMLInputElement;
  });

  async function save() {
    let req = {
      username: uname.value,
      bio: bioVal,
      role: data.profile?.role
    };

    if ((bioVal?.length ?? 0) > 500) {
      return;
    }

    await toast.promise(
      fetchAuthed("PATCH", `/user/id/${data.profile?.id}`, req).then(res => {
        if (!res.ok) {
          return res.text().then(txt => alert(txt));
        }
        if (data.profile?.id == $user.id) {
          $user.username = uname.value.trim();
          $user.bio =
            bioVal?.trim() ??
            "If you see this, something went wrong with bio parsing, message Cobble";
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

  function calcRemaining() {
    remainingCharacters = 500 - (bioVal?.length ?? 0);
  }
</script>

<svelte:head>
  <title>Profile Settings | Datapack Hub</title>
</svelte:head>

<main
  class="-translate-y-20 bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 md:translate-y-0 lg:px-32 xl:px-64">
  <div
    class=" h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="my-3 pb-2 text-center text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Settings
    </h1>
    <div class="mb-2 flex space-x-2">
      <Button
        style="base"
        classes="{activePage === 'profile'
          ? 'bg-pearl-lusta-500 dark:bg-stone-600'
          : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'profile')}">Profile</Button>
      <Button
        style="base"
        classes="{activePage === 'account'
          ? 'bg-pearl-lusta-500 dark:bg-stone-600'
          : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'account')}">Account</Button>
    </div>

    <div use:autoAnimate>
      {#if activePage == "profile"}
        <div
          class="rounded-xl bg-pearl-lusta-200 p-3 text-center align-middle dark:bg-pearl-lusta-100/10 md:text-start space-y-2">
          <div class="text-center align-middle md:text-start">
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
              Username
            </p>
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 opacity-40 text-sm">
              Your username is used to view your profile. Your username is
              displayed on your datapacks and more coming soon
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
              Your bio is visible for anyone to see, don't store important
              information in it!
            </p>
            <textarea
              class="h-64 w-1/2 resize-none rounded-md bg-pearl-lusta-200 p-2 text-lg text-pearl-lusta-950 dark:bg-stone-800 dark:text-white"
              maxlength="500"
              bind:value="{bioVal}"
              on:keypress="{calcRemaining}"></textarea>
            <p
              class="align-middle text-xs text-pearl-lusta-950 dark:text-pearl-lusta-100">
              {remainingCharacters} characters left
            </p>
            <br />
            <Button click="{save}" wait="{true}" style="alt" classes="mb-6"
              >Save Changes</Button>
          </div>
        </div>
      {:else if activePage == "account"}
        <div
          class="rounded-xl bg-pearl-lusta-200 p-3 text-center align-middle dark:bg-pearl-lusta-100/10 md:text-start space-y-2">
          <div class="text-center align-middle md:text-start">
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100">
              Linked Github
            </p>
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 opacity-40 text-sm">
              Link your Github account to your Datapack Hub account, and you'll
              be able to log in with Github.
            </p>
            <a
              class="flex rounded-lg p-2 bg-black text-white font-bold space-x-2 items-center w-fit"
              href="https://github.com/login/oauth/authorize?client_id=8a0527a3da5b002db8c9&redirect_uri=https%3A%2F%2Fdatapackhub.net%2Fsettings%2Fgithub">
              <IconGithub />
              <p>Link your Github account</p>
            </a>
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 mt-6">
              Linked Discord
            </p>
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 opacity-40 text-sm">
              Link your Discord account to your Datapack Hub account, and you'll
              be able to log in with Discord.
            </p>
            <a
              class="flex rounded-lg p-2 bg-[#5865F2] text-white font-bold space-x-2 items-center w-fit"
              href="https://discord.com/api/oauth2/authorize?client_id=1121129295868334220&redirect_uri=https%3A%2F%2Fdatapackhub.net%2Fsettings%2Fdiscord&response_type=code&scope=identify">
              <IconDiscord />
              <p>Link your Discord account</p>
            </a>
            <p
              class="align-middle text-pearl-lusta-950 dark:text-pearl-lusta-100 mt-6">
              (If you've already linked an account, it'll be re-linked.)
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
