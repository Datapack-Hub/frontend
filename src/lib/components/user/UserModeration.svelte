<script lang="ts">
  import { browser } from "$app/environment";
  import { goto, invalidateAll } from "$app/navigation";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import { badges } from "$lib/globals/badges";
  import type { User } from "$lib/globals/schema";
  import { roleInfo, roles } from "$lib/globals/stores";
  import { MultiSelect } from "svelte-multiselect";
  import { toast } from "svelte-sonner";
  import IconShield from "~icons/tabler/Shield.svelte";
  import { fetchAuthed } from "../../globals/functions";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";
  import Button from "../decorative/Button.svelte";
  import UserCard from "./UserCard.svelte";
  import { processMarkdown } from "$lib/globals/markdown";

  export let user: User;

  let moderationModalPage = "warn";

  let moderationModal: Modal;
  let unbanDialog: Modal;

  let notifTitle: string;
  let notifContent: string;
  let notifType: string;

  let warnMessage: string;

  let badgeState = user?.badges ?? [];

  let banJson: {
    banned: boolean;
    banExpiry: number;
    banMessage: string;
  } = {
    banned: false,
    banExpiry: -1,
    banMessage: "null"
  };

  processMarkdown(user.bio).then(bio => (user.bio = bio));

  async function loadData() {
    if (browser) {
      let moderationData = await fetchAuthed(
        "get",
        `/moderation/user/${user?.id}`
      );
      banJson = await moderationData.json();
    }
  }

  async function warn() {
    let warnResponse = await fetchAuthed("post", `/notifs/send/${user?.id}`, {
      data: {
        type: "important",
        message: "Warning",
        description: warnMessage
      }
    });

    if (warnResponse.ok) {
      moderationModal.close();
      toast.success(`Warned ${user?.username}!`);
    } else {
      toast.error(await warnResponse.text());
    }
  }

  async function sendNotif() {
    if ([notifTitle, notifContent].some(v => v.length <= 0)) {
      toast.error("Make sure all fields are filled");
      return;
    }

    let sent = await fetchAuthed("post", `/notifs/send/${user?.id}`, {
      data: {
        type: notifType,
        message: notifTitle,
        description: notifContent
      }
    });

    if (!sent.ok) return toast.error(await sent.text());

    moderationModal.close();
    toast.success(`Sent a notification to ${user?.username}!`);
  }

  async function banUser() {
    let expiry = document.querySelector("#ban-expiry") as HTMLInputElement;
    const message = document.querySelector(
      "#ban-message"
    ) as HTMLTextAreaElement;
    const permanent = document.querySelector(
      "#ban-permanent"
    ) as HTMLInputElement;

    let exp = Number.parseInt(expiry.value);
    if (permanent.checked) exp = 36_500;

    let ban = await fetchAuthed("post", `/moderation/ban/${user?.id}`, {
      data: {
        id: user?.id,
        expires: exp,
        message: message.value
      }
    });
    if (!ban.ok) {
      toast.error(await ban.text());
      return;
    }

    moderationModal.close();
    toast.success(`${user?.username} is now banned!`);
  }

  async function unbanUser() {
    let unban = await fetchAuthed("DELETE", `/moderation/ban/${user?.id}`);
    if (!unban.ok) {
      toast.error(await unban.text());
      return;
    }

    unbanDialog.close();
    banJson.banned == false;
    toast.success(`${user?.username} is now unbanned.`);
  }

  async function logOutUser() {
    let logout = await fetchAuthed("post", `/moderation/log_out/${user?.id}`);
    if (!logout.ok) {
      toast.error(await logout.text());
      return;
    }

    moderationModal.close();
    toast.success(`${user?.username} is now logged out of their account!`);
  }

  async function submitBadgeChanges() {
    let badgeResponse = await fetchAuthed("PATCH", `/user/badges/${user?.id}`, {
      data: {
        badges: badgeState
      }
    });

    if (!badgeResponse.ok) {
      toast.error(await badgeResponse.text());
      return;
    }

    moderationModal.close();
    toast.success(`${user?.username}'s badges have been edited!`);
    await invalidateAll();
  }

  function disableBan() {
    const perm = document.querySelector<HTMLInputElement>("#ban-permanent")!;
    let expiry = document.querySelector<HTMLInputElement>("#ban-expiry")!;
    expiry.disabled = false;
    if (perm.checked) expiry.disabled = true;
  }
</script>

{#if user && ["admin", "moderator", "helper"].includes($roleInfo.name)}
  {#await loadData()}
    <p class="h-9 text-zinc-950 dark:text-white">Loading...</p>
  {:then}
    <Button
      style="boring"
      click="{() => moderationModal.open()}"
      classes="modBtn mt-2 text-sm">
      <IconShield width="16" height="16" class="mr-2 inline-block" />
      Moderate {user?.username}
    </Button>
  {/await}
{/if}

<Modal
  bind:this="{moderationModal}"
  width="wide"
  title="{'Moderate ' + user?.username}">
  <p class="align-middle text-lg text-zinc-950 dark:text-zinc-100">User</p>
  <UserCard person="{user}" role="{$roles.find(v => user?.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p class="mb-2 align-middle text-lg text-zinc-950 dark:text-zinc-100">
      Select Action
    </p>
    {#if !banJson.banned}
      <button
        class="button-base text-zinc-950 dark:text-zinc-100 active:bg-slate-500 active:dark:bg-zinc-600 bg-slate-300 dark:bg-zinc-900"
        on:click="{() => (moderationModalPage = 'ban')}">Ban</button>
    {:else}
      <button
        class="button-base text-zinc-950 dark:text-zinc-100 active:bg-slate-500 active:dark:bg-zinc-600 bg-slate-300 dark:bg-zinc-900"
        on:click="{() => unbanDialog.open()}">Pardon</button>
    {/if}
    <button
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ==
      'warn'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'warn')}">Warn</button>
    <button
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ==
      'logout'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'logout')}">Log Out</button>
    <button
      id="send_notif"
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ==
      'notif'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'notif')}"
      >Send Notification</button>
    <div class="mx-2 inline-block h-10 w-[2px] bg-stone-500/40 align-top"></div>
    <button
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ==
      'badges'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'badges')}">Edit Badges</button>
    <button
      class="button-base text-zinc-950 dark:text-zinc-100 {moderationModalPage ==
      'edit'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => goto(user?.username + '/edit')}">Edit User</button>
  </div>
  {#if moderationModalPage == "ban"}
    <p class="text-sm text-zinc-950/40 dark:text-white/40">
      Banning a user prevents them from interacting with the website. You can
      write a message or ban reason to be displayed when they try to log in.
    </p>
    <p class="mt-3 align-middle text-zinc-950 dark:text-zinc-100">
      Ban Expiry (days from now)
    </p>
    <input
      required
      type="number"
      class="input w-full"
      id="ban-expiry"
      placeholder="i.e 1, 7, 14, 30, 365" />
    <label class=" text-zinc-950 dark:text-zinc-100">
      <input type="checkbox" id="ban-permanent" on:change="{disableBan}" />
      Permanent?
    </label>
    <p class="mt-3 align-middle text-zinc-950 dark:text-zinc-100">
      Ban Message (supports markdown)
    </p>
    <textarea
      class="input h-48 w-full resize-none"
      placeholder="Burning cake after being **repeatedly told** to stop"
      id="ban-message"></textarea>
    <Button click="{banUser}">Ban {user?.username}</Button>
  {:else if moderationModalPage == "warn"}
    <p class=" text-sm text-zinc-950/40 dark:text-white/40">
      This message is sent to the user as a notification. Always be
      professional, even when they are not.
    </p>
    <p class="mt-3 align-middle text-zinc-950 dark:text-zinc-100">
      Warn Message
    </p>
    <textarea
      class="input h-32 w-full resize-none"
      placeholder="..."
      bind:value="{warnMessage}"></textarea>
    <Button click="{warn}">Warn {user?.username}</Button>
  {:else if moderationModalPage == "notif"}
    <p class=" mb-3 text-sm text-zinc-950/40 dark:text-white/40">
      Send an anonymous notification (unless you put your name down) to the
      user. For warnings, use the Warn button.
    </p>
    <label
      for="notif-message"
      class="mt-3 align-middle text-zinc-950 dark:text-zinc-100">
      Notification Message
    </label>
    <input
      required
      class="input w-full"
      placeholder="Your cake is burning!"
      name="notif-message"
      bind:value="{notifTitle}" />
    <label
      for="notif-content"
      class="mt-3 align-middle text-zinc-950 dark:text-zinc-100">
      Notification Body
    </label>
    <textarea
      class="input h-48 w-full resize-none"
      maxlength="2000"
      placeholder="Just a quick reminder that your cake which you forgot about has been in the oven for 10 minutes too long."
      name="notif-content"
      bind:value="{notifContent}"></textarea>
    <label
      for="notif-type"
      class="mt-2 align-middle text-zinc-950 dark:text-zinc-100">
      Notification Type
    </label>
    <select
      name="notif-type"
      id="notif-type"
      class="input mb-2 w-full"
      bind:value="{notifType}">
      <option value="default">Default</option>
      <option value="important">Important</option>
      <option value="announcement">Announcement</option>
      <option value="rainbow">Rainbow 🌈</option>
    </select>
    <button
      on:click="{sendNotif}"
      id="send_notif_btn"
      class="rounded-md bg-dph-orange p-3 text-base font-bold text-zinc-100 transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl"
      >Send</button>
  {:else if moderationModalPage == "logout"}
    <p class=" mb-3 text-sm text-zinc-950/40 dark:text-white/40">
      This will log {user?.username} out of all their signed-in devices, and generate
      them a new token. They will need to sign in again.
    </p>
    <Button click="{logOutUser}">Log them out!</Button>
  {:else if moderationModalPage == "badges"}
    <div class="my-4">
      <h2 class="mb-2 text-zinc-950 dark:text-white">Badges</h2>
      <MultiSelect
        options="{badges.map(v => v.name)}"
        bind:selected="{badgeState}" />
    </div>
    <Button click="{submitBadgeChanges}">Submit Changes</Button>
  {/if}
</Modal>

<Modal bind:this="{unbanDialog}">
  <h1 class=" text-xl font-bold text-zinc-950 dark:text-white">
    Unban {user?.username}
  </h1>
  <CasualLine />
  <p class=" text-zinc-950 dark:text-white">
    {user?.username} has been banned for the following reason:
  </p>
  <p class="my-2 rounded-xl bg-zinc-700 p-3 dark:text-zinc-300">
    <MarkdownComponent source="{banJson.banMessage ?? 'Ban data lost!'}" />
  </p>
  <p class=" text-sm text-zinc-950/40 dark:text-white/40">
    Unban them to end their ban early.
  </p>
  <Button click="{unbanUser}">Unban them!</Button>
</Modal>

<style lang="postcss">
  :root {
    --sms-bg: theme(colors.zinc.800);
    --sms-border: 2px solid theme(colors.zinc.200);
    --sms-selected-bg: theme(colors.zinc.700);
    --sms-remove-btn-hover-bg: theme(colors.orange.500);
    --sms-options-bg: theme(colors.zinc.800);
    --sms-text-color: theme(colors.slate.100);
  }
</style>
