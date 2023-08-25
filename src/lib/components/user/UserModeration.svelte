<script lang="ts">
  import { browser } from "$app/environment";
  import { goto, invalidateAll } from "$app/navigation";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import { badges } from "$lib/globals/consts";
  import type { User } from "$lib/globals/schema";
  import { roleInfo, roles } from "$lib/globals/stores";
  import { MultiSelect } from "svelte-multiselect";
  import { toast } from "svelte-sonner";
  import IconShield from "~icons/tabler/Shield.svelte";
  import { fetchAuthed } from "../../globals/functions";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";
  import Button from "../decorative/Button.svelte";
  import UserCard from "./UserCard.svelte";

  export let user: User | undefined;

  let moderationModalPage = "warn";

  let moderationModal: Modal;
  let warnDialog: Modal;
  let notifDialog: Modal;
  let banDialog: Modal;
  let unbanDialog: Modal;
  let logOutDialog: Modal;
  let addBadgesDialog: Modal;

  let badgeState = user?.badges ?? [];

  let moderationJson: {
    banned: boolean;
    banExpiry: number;
    banMessage: string;
  } = {
    banned: false,
    banExpiry: -1,
    banMessage: "null"
  };

  async function loadData() {
    if (browser) {
      let moderationData = await fetchAuthed(
        "get",
        `/moderation/user/${user?.id}`
      );
      moderationJson = await moderationData.json();
    }
  }

  async function warn() {
    const messageTxt = document.querySelector(
      "#warn-message"
    ) as HTMLTextAreaElement;

    let warnResponse = await fetchAuthed("post", `/notifs/send/${user?.id}`, {
      type: "important",
      message: "Warning",
      description: messageTxt.value
    });

    if (warnResponse.ok) {
      warnDialog.close();
      toast.success(`Warned ${user?.username}!`);
    } else {
      toast.error(await warnResponse.text());
    }
  }

  async function sendNotif() {
    const message = document.querySelector(
      "#notif-message"
    ) as HTMLInputElement;
    const content = document.querySelector(
      "#notif-content"
    ) as HTMLTextAreaElement;
    const type = document.querySelector("#notif-type") as HTMLSelectElement;

    if ([message.value, content.value].some(v => v.length <= 0)) {
      toast.error("Make sure all fields are filled");
      return;
    }

    let sent = await fetchAuthed("post", `/notifs/send/${user?.id}`, {
      type: type.value,
      message: message.value,
      description: content.value
    });

    if (!sent.ok) {
      toast.error(await sent.text());
      return;
    }
    notifDialog.close();
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
      id: user?.id,
      expires: exp,
      message: message.value
    });
    if (!ban.ok) {
      toast.error(await ban.text());
      return;
    }

    banDialog.close();
    toast.success(`${user?.username} is now banned!`);
  }

  async function unbanUser() {
    let unban = await fetchAuthed("DELETE", `/moderation/ban/${user?.id}`);
    if (!unban.ok) {
      toast.error(await unban.text());
      return;
    }

    unbanDialog.close();
    moderationJson.banned == false;
    toast.success(`${user?.username} is now unbanned.`);
  }

  async function logOutUser() {
    let logout = await fetchAuthed("post", `/moderation/log_out/${user?.id}`);
    if (!logout.ok) {
      toast.error(await logout.text());
      return;
    }

    logOutDialog.close();
    toast.success(`${user?.username} is now logged out of their account.`);
  }

  async function submitBadgeChanges() {
    let badgeResponse = await fetchAuthed("PATCH", `/user/badges/${user?.id}`, {
      badges: badgeState
    });

    if (!badgeResponse.ok) {
      toast.error(await badgeResponse.text());
      return;
    }

    addBadgesDialog.close();
    toast.success(`${user?.username}'s badges have now been edited.`);
    await invalidateAll();
  }

  function disableBan() {
    const permanent = document.querySelector(
      "#ban-permanent"
    ) as HTMLInputElement;
    let expiry = document.querySelector("#ban-expiry") as HTMLInputElement;
    expiry.disabled = false;
    if (permanent.checked) expiry.disabled = true;
  }
</script>

{#if user && ["admin", "moderator", "helper"].includes($roleInfo.name)}
  {#await loadData()}
    <p class="text-slate-950 dark:text-white">Loading...</p>
  {:then}
    <Button
      style="boring"
      click="{() => moderationModal.open()}"
      classes="mt-4 flex w-full items-center">
      <IconShield width="24" height="24" class="float-left mr-2" />
      Moderate {user?.username}
    </Button>
  {/await}
{/if}

<Modal
  bind:this="{moderationModal}"
  wide="{true}"
  title="{'Moderate ' + user?.username}">
  <p class="align-middle text-lg text-slate-950 dark:text-slate-100">User</p>
  <UserCard person="{user}" role="{$roles.find(v => user?.role == v.name)}" />
  <div class="mb-2 min-w-fit items-center">
    <p class="align-middle text-lg text-slate-950 dark:text-slate-100">
      Select Action
    </p>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ==
      'ban'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'ban')}">Ban</button>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ==
      'warn'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'warn')}">Warn</button>
    <button
      id="send_notif"
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ==
      'notif'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'notif')}"
      >Send Notification</button>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ==
      'logout'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'logout')}">Log Out</button>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ==
      'badges'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => (moderationModalPage = 'badges')}">Edit Badges</button>
    <button
      class="button-base text-slate-950 dark:text-slate-100 {moderationModalPage ==
      'edit'
        ? 'bg-slate-500 dark:bg-zinc-600'
        : 'bg-slate-300 dark:bg-zinc-900'}"
      on:click="{() => goto(user?.username + '/edit')}">Edit User</button>
  </div>
  {#if moderationModalPage == "ban"}
    <p class=" text-slate-950 dark:text-white">
      Banning a user prevents them from interacting with the website. You can
      write a message or ban reason to be displayed when they try to log in.
    </p>
    <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
      Ban Expiry (days from now)
    </p>
    <input
      required
      type="number"
      class="input w-full"
      id="ban-expiry"
      placeholder="i.e 1, 7, 14, 30, 365" />
    <label class=" text-slate-950 dark:text-slate-100">
      <input type="checkbox" id="ban-permanent" on:change="{disableBan}" />
      Permanent?
    </label>
    <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
      Ban Message (supports markdown)
    </p>
    <textarea
      class="input h-48 w-full resize-none"
      placeholder="Burning cake after being **repeatedly told** to stop"
      id="ban-message"></textarea>
    <Button click="{banUser}">Ban {user?.username}</Button>
  {:else if moderationModalPage == "warn"}
    <p class=" text-slate-950 dark:text-white">
      This message is sent to the user as a notification. Always be
      professional, even when they are not.
    </p>
    <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
      Warn Message
    </p>
    <textarea
      class="input h-32 w-full resize-none"
      placeholder="..."
      id="warn-message"></textarea>
    <Button click="{warn}">Warn {user?.username}</Button>
  {:else if moderationModalPage == "notif"}
    <p class=" mb-3 text-slate-950 dark:text-white">
      Send an anonymous notification (unless you put your name down) to the
      user. For warnings, use the Warn button.
    </p>
    <label
      for="notif-message"
      class="mt-3 align-middle text-slate-950 dark:text-slate-100">
      Notification Message
    </label>
    <input
      required
      class="input w-full"
      placeholder="Your cake is burning!"
      name="notif-message"
      id="notif-message" />
    <label
      for="notif-content"
      class="mt-3 align-middle text-slate-950 dark:text-slate-100">
      Notification Body
    </label>
    <textarea
      class="input h-48 w-full resize-none"
      maxlength="2000"
      placeholder="Just a quick reminder that your cake which you forgot about has been in the oven for 10 minutes too long."
      name="notif-content"
      id="notif-content"></textarea>
    <label
      for="notif-type"
      class="mt-2 align-middle text-slate-950 dark:text-slate-100">
      Notification Type
    </label>
    <select name="notif-type" id="notif-type" class="input mb-2 w-full">
      <option value="default">Default</option>
      <option value="important">Important</option>
      <option value="announcement">Announcement</option>
      <option value="rainbow">Rainbow 🌈</option>
    </select>
    <button
      on:click="{sendNotif}"
      id="send_notif_btn"
      class="rounded-md bg-dph-orange p-2 text-base font-bold text-slate-100 transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl"
      >Send</button>
  {:else if moderationModalPage == "logout"}
    <p class=" mb-3 text-slate-950 dark:text-white">
      This will log {user?.username} out of all their signed-in devices, and generate
      them a new token. They will need to sign in again.
    </p>
    <Button click="{logOutUser}">Log them out!</Button>
  {:else if moderationModalPage == "badges"}
    <div class="my-4">
      <h2 class="mb-2 text-slate-950 dark:text-white">Badges</h2>
      <MultiSelect
        options="{badges.map(v => v.name)}"
        bind:selected="{badgeState}" />
    </div>
    <Button click="{submitBadgeChanges}">Submit Changes</Button>
  {/if}
</Modal>

<Modal bind:this="{warnDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Warn {user?.username}
  </h1>
  <CasualLine />
  <p class=" text-slate-950 dark:text-white">
    This message is sent to the user as a notification. Always be professional,
    even when they are not.
  </p>
  <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
    Warn Message
  </p>
  <textarea
    class="input h-32 w-full resize-none"
    placeholder="..."
    id="warn-message"></textarea>
  <Button click="{warn}">Warn {user?.username}</Button>
</Modal>

<Modal bind:this="{notifDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Notify {user?.username}
  </h1>
  <CasualLine />
  <p class=" text-slate-950 dark:text-white">
    Send an anonymous notification (unless you put your name down) to the user.
    For warnings, use the Warn button.
  </p>
  <label
    for="notif-message"
    class="mt-3 align-middle text-slate-950 dark:text-slate-100">
    Notification Message
  </label>
  <input
    required
    class="input w-full"
    placeholder="Your cake is burning!"
    name="notif-message"
    id="notif-message" />
  <label
    for="notif-content"
    class="mt-3 align-middle text-slate-950 dark:text-slate-100">
    Notification Body
  </label>
  <textarea
    class="input h-48 w-full resize-none"
    placeholder="Just a quick reminder that your cake which you forgot about has been in the oven for 10 minutes too long."
    name="notif-content"
    id="notif-content"></textarea>
  <label
    for="notif-type"
    class="mt-2 align-middle text-slate-950 dark:text-slate-100">
    Notification Type
  </label>
  <select name="notif-type" id="notif-type" class="input mb-2 w-full">
    <option value="default">Default</option>
    <option value="important">Important</option>
    <option value="announcement">Announcement</option>
    <option value="rainbow">Rainbow 🌈</option>
  </select>
  <button
    on:click="{sendNotif}"
    id="send_notif_btn"
    class="rounded-md bg-dph-orange p-2 text-base font-bold text-slate-100 transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl"
    >Send</button>
</Modal>

<Modal bind:this="{banDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Ban {user?.username}
  </h1>
  <CasualLine />
  <p class=" text-slate-950 dark:text-white">
    Banning a user prevents them from interacting with the website. You can
    write a message or ban reason to be displayed when they try to log in.
  </p>
  <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
    Ban Expiry (days from now)
  </p>
  <input
    required
    type="number"
    class="input w-full"
    id="ban-expiry"
    placeholder="i.e 1, 7, 14, 30, 365" />
  <label class=" text-slate-950 dark:text-slate-100">
    <input type="checkbox" id="ban-permanent" on:change="{disableBan}" />
    Permanent?
  </label>
  <p class="mt-3 align-middle text-slate-950 dark:text-slate-100">
    Ban Message (supports markdown)
  </p>
  <textarea
    class="input h-48 w-full resize-none"
    placeholder="Burning cake after being **repeatedly told** to stop"
    id="ban-message"></textarea>
  <Button click="{banUser}">Ban {user?.username}</Button>
</Modal>

<Modal bind:this="{unbanDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Unban {user?.username}
  </h1>
  <CasualLine />
  <p class=" text-slate-950 dark:text-white">
    {user?.username} has been banned for the following reason:
  </p>
  <p class="my-2 rounded-xl bg-zinc-700 p-2 dark:text-zinc-300">
    <MarkdownComponent source="" />
  </p>
  <p class=" text-slate-950 dark:text-white">
    Unban them to end their ban early.
  </p>
  <Button click="{unbanUser}">Log them out!</Button>
</Modal>

<Modal bind:this="{logOutDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Log {user?.username} out
  </h1>
  <CasualLine />
  <p class=" text-slate-950 dark:text-white">
    This will log {user?.username} out of all their signed-in devices, and generate
    them a new token. They will need to sign in again.
  </p>
  <Button click="{logOutUser}">Log them out!</Button>
</Modal>

<Modal bind:this="{addBadgesDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Edit {user?.username}'s badges
  </h1>
  <CasualLine />
  <div class="my-4">
    <h2 class="mb-2 text-slate-950 dark:text-white">Badges</h2>
    <MultiSelect
      options="{badges.map(v => v.name)}"
      bind:selected="{badgeState}" />
  </div>
  <Button click="{submitBadgeChanges}">Submit Changes</Button>
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
