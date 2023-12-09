<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/decorative/Button.svelte";
  import { fetchAuthed, getCookie } from "$lib/globals/functions";
  import { user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";
  import type { PageData } from "./$types";

  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
  import { createTabs, melt } from "@melt-ui/svelte";
  import { quartInOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import IconDiscord from "~icons/tabler/BrandDiscord.svelte";
  import IconGithub from "~icons/tabler/BrandGithub.svelte";
  import IconClipboard from "~icons/tabler/Clipboard.svelte";
  import IconReset from "~icons/tabler/RefreshAlert.svelte";

  export let data: PageData;

  let usernameElement: HTMLInputElement;
  let bioValue: string | undefined = data.profile?.bio.replaceAll("\\n", "\n");

  const {
    elements: { root, list, content, trigger },
    states: { value }
  } = createTabs({
    defaultValue: "profile"
  });

  const triggers = [
    { id: "profile", title: "Profile" },
    { id: "account", title: "Account" }
  ];

  const [send, receive] = crossfade({
    duration: 250,
    easing: quartInOut
  });

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
      fetchAuthed("PATCH", `/user/id/${data.profile?.id}`, {
        data: request
      }).then(response => {
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
      }),
      {
        success: "Profile saved!",
        loading: "Saving...",
        error: "Profile unable to save 😭"
      }
    );
  }

  function copyToken() {
    navigator.clipboard.writeText(getCookie("dph_token") || "TOKEN_NOT_FOUND");
    toast.success("Copied token to clipboard!");
  }

  async function resetToken() {
    let response = await fetchAuthed("GET", "/users/obtain_token");
    console.log(response.headers.getSetCookie());
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
    class=" h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-32">
    <h1
      class="my-3 pb-2 text-center text-5xl font-bold text-zinc-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Settings
    </h1>
    <div
      class="mb-2 flex w-max space-x-2 rounded-full bg-slate-200 p-2 dark:bg-zinc-800"
      use:melt="{$root}">
      <div use:melt="{$list}">
        {#each triggers as triggerItem}
          <button
            class="relative border-r border-slate-400 px-2 last:border-r-0 dark:border-zinc-600 dark:text-white"
            use:melt="{$trigger(triggerItem.id)}">
            {triggerItem.title}
            {#if $value === triggerItem.id}
              <div
                in:send="{{ key: 'trigger' }}"
                out:receive="{{ key: 'trigger' }}"
                class="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-slate-400 dark:bg-zinc-400">
              </div>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <div use:melt="{$content('profile')}">
      <div
        class="space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start">
        <div class="text-center align-middle md:text-start">
          <p class="align-middle text-zinc-950 dark:text-zinc-100">Username</p>
          <p
            class="align-middle text-sm text-zinc-950 opacity-40 dark:text-zinc-100">
            Your username is used to view your profile, and is displayed on your
            datapacks, comments, and replies.
          </p>
          <input
            class="input"
            value="{data.profile?.username}"
            maxlength="32"
            bind:this="{usernameElement}" />
          <p class="mt-6 align-middle text-zinc-950 dark:text-zinc-100">Bio</p>
          <p
            class="mb-2 align-middle text-sm text-zinc-950 opacity-40 dark:text-zinc-100">
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
    </div>

    <div use:melt="{$content('account')}">
      <div
        class="space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start">
        <div class="text-center align-middle md:text-start">
          <p class="align-middle text-zinc-950 dark:text-zinc-100">
            Linked Github
          </p>
          <p
            class="align-middle text-sm text-zinc-950 opacity-40 dark:text-zinc-100">
            Link your Github account to your Datapack Hub account, and you'll be
            able to log in with Github.
          </p>
          <a
            class="flex w-fit items-center space-x-2 rounded-lg bg-black p-3 font-bold text-white"
            href="https://github.com/login/oauth/authorize?client_id=8a0527a3da5b002db8c9&redirect_uri=https%3A%2F%2Fdatapackhub.net%2Fsettings%2Fgithub">
            <IconGithub />
            <p>Link your Github account</p>
          </a>
          <p class="mt-6 align-middle text-zinc-950 dark:text-zinc-100">
            Linked Discord
          </p>
          <p
            class="align-middle text-sm text-zinc-950 opacity-40 dark:text-zinc-100">
            Link your Discord account to your Datapack Hub account, and you'll
            be able to log in with Discord.
          </p>
          <a
            class="flex w-fit items-center space-x-2 rounded-lg bg-[#5865F2] p-3 font-bold text-white"
            href="https://discord.com/api/oauth2/authorize?client_id=1121129295868334220&redirect_uri=https%3A%2F%2Fdatapackhub.net%2Fsettings%2Fdiscord&response_type=code&scope=identify">
            <IconDiscord />
            <p>Link your Discord account</p>
          </a>
          <p class="my-6 align-middle text-zinc-950 dark:text-zinc-100">
            (If you've already linked an account, it'll be re-linked.)
          </p>
          <p class="text-zinc-950 dark:text-zinc-100">Tokens</p>
          <div class="flex items-center gap-3">
            <button
              class="button-primary flex w-fit items-center gap-3"
              on:click="{() => copyToken()}"
              ><IconClipboard /> Copy Token</button>
            <button
              class="button-base flex w-fit items-center gap-3 bg-red-500 text-lg text-white"
              on:click="{() => resetToken()}"><IconReset /> Reset Token</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-24"></div>
</main>
