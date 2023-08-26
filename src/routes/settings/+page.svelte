<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/decorative/Button.svelte";
  import { fetchAuthed } from "$lib/globals/functions";
  import { user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import { toast } from "svelte-sonner";
  import type { PageData } from "./$types";

  import IconDiscord from "~icons/tabler/BrandDiscord.svelte";
  import IconGithub from "~icons/tabler/BrandGithub.svelte";
  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";

  export let data: PageData;

  let usernameElement: HTMLInputElement;
  let bioValue: string | undefined = data.profile?.bio.replaceAll("\\n", "\n");

  let activePage = "profile";

  async function save() {
    let request = {
      username: usernameElement.value,
      bio: bioValue,
      role: data.profile?.role
    };

    if ((bioValue?.length ?? 0) > 500) {
      return;
    }

    toast.promise(
      fetchAuthed("PATCH", `/user/id/${data.profile?.id}`, request).then(
        response => {
          if (!response.ok) {
            return response.text().then(txt => alert(txt));
          }
          if (data.profile?.id == $user.id) {
            $user.username = usernameElement.value.trim();
            $user.bio =
              bioValue?.trim() ??
              "If you see this, something went wrong with bio parsing, message Cobble";
          }
          goto("/user/" + $user.username);
        }
      ),
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
  <meta name="description" content="Your profile settings" />
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 px-4 transition-all dark:bg-zinc-900 lg:px-32 xl:px-64">
  <div
    class=" h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="my-3 pb-2 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Settings
    </h1>
    <div class="mb-2 flex space-x-2">
      <Button
        style="base"
        classes="dark:text-slate-100 {activePage === 'profile'
          ? 'bg-slate-500 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'profile')}">Profile</Button>
      <Button
        style="base"
        classes="dark:text-slate-100 {activePage === 'account'
          ? 'bg-slate-500 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'account')}">Account</Button>
    </div>

    <div use:autoAnimate>
      {#if activePage == "profile"}
        <div
          class="space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start">
          <div class="text-center align-middle md:text-start">
            <p class="align-middle text-slate-950 dark:text-slate-100">
              Username
            </p>
            <p
              class="align-middle text-sm text-slate-950 opacity-40 dark:text-slate-100">
              Your username is used to view your profile, and is displayed on
              your datapacks, comments, and replies.
            </p>
            <input
              class="input"
              value="{data.profile?.username}"
              maxlength="32"
              bind:this="{usernameElement}" />
            <p class="mt-6 align-middle text-slate-950 dark:text-slate-100">
              Bio
            </p>
            <p
              class="mb-2 align-middle text-sm text-slate-950 opacity-40 dark:text-slate-100">
              Your bio is visible for anyone to see, don't store important
              information in it!
            </p>
            <MarkdownEditor
              classes="h-80 w-full resize-none md:w-2/3 lg:w-1/2"
              maxEditorLength="{500}"
              bind:content="{bioValue}" />
            <br />
            <Button click="{save}" wait="{true}">Save Changes</Button>
          </div>
        </div>
      {:else if activePage == "account"}
        <div
          class="space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start">
          <div class="text-center align-middle md:text-start">
            <p class="align-middle text-slate-950 dark:text-slate-100">
              Linked Github
            </p>
            <p
              class="align-middle text-sm text-slate-950 opacity-40 dark:text-slate-100">
              Link your Github account to your Datapack Hub account, and you'll
              be able to log in with Github.
            </p>
            <a
              class="flex w-fit items-center space-x-2 rounded-lg bg-black p-3 font-bold text-white"
              href="https://github.com/login/oauth/authorize?client_id=8a0527a3da5b002db8c9&redirect_uri=https%3A%2F%2Fdatapackhub.net%2Fsettings%2Fgithub">
              <IconGithub />
              <p>Link your Github account</p>
            </a>
            <p class="mt-6 align-middle text-slate-950 dark:text-slate-100">
              Linked Discord
            </p>
            <p
              class="align-middle text-sm text-slate-950 opacity-40 dark:text-slate-100">
              Link your Discord account to your Datapack Hub account, and you'll
              be able to log in with Discord.
            </p>
            <a
              class="flex w-fit items-center space-x-2 rounded-lg bg-[#5865F2] p-3 font-bold text-white"
              href="https://discord.com/api/oauth2/authorize?client_id=1121129295868334220&redirect_uri=https%3A%2F%2Fdatapackhub.net%2Fsettings%2Fdiscord&response_type=code&scope=identify">
              <IconDiscord />
              <p>Link your Discord account</p>
            </a>
            <p class="mt-6 align-middle text-slate-950 dark:text-slate-100">
              (If you've already linked an account, it'll be re-linked.)
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="py-16"></div>
</main>
