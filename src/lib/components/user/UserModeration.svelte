<script lang="ts">
  import { browser } from "$app/environment";
  import CasualLine from "$lib/components/decorative/CasualLine.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import type { User } from "$lib/globals/schema";
  import { isDark, role } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";
  import IconBan from "~icons/tabler/Ban.svelte";
  import IconLogOut from "~icons/tabler/Logout.svelte";
  import IconMessage from "~icons/tabler/MailForward.svelte";
  import IconSettings from "~icons/tabler/Settings.svelte";
  import IconWarn from "~icons/tabler/AlertTriangle.svelte";
  import IconTags from "~icons/tabler/Tags.svelte";
  import { fetchAuthed } from "../../globals/functions";
  import MarkdownComponent from "../MarkdownComponent.svelte";
  import Button from "../decorative/Button.svelte";
  import { MultiSelect } from "svelte-multiselect";
  import { badges } from "$lib/globals/consts";

  export let user: User | undefined;

  let warnDialog: Modal;
  let notifDialog: Modal;
  let banDialog: Modal;
  let unbanDialog: Modal;
  let logOutDialog: Modal;
  let addBadgesDialog: Modal;

  let badgeState = user?.badges ?? [];

  let modJson: { banned: boolean; banExpiry: number; banMessage: string } = {
    banned: false,
    banExpiry: -1,
    banMessage: "null"
  };

  async function loadData() {
    if (browser) {
      let modData = await fetchAuthed("get", `/moderation/user/${user?.id}`);
      modJson = await modData.json();
    }
  }

  function open(mod: Modal) {
    mod.open();
  }

  async function warn() {
    const msgTxt = document.getElementById(
      "warn-message"
    ) as HTMLTextAreaElement;

    let warnRes = await fetchAuthed("post", `/notifs/send/${user?.id}`, {
      type: "important",
      message: "Warning",
      description: msgTxt.value
    });

    if (warnRes.ok) {
      warnDialog.close();
      toast.success(`Warned ${user?.username}!`);
    } else {
      toast.error(await warnRes.text());
    }
  }

  async function sendNotif() {
    const message = document.getElementById(
      "notif-message"
    ) as HTMLInputElement;
    const content = document.getElementById(
      "notif-content"
    ) as HTMLTextAreaElement;
    const type = document.getElementById("notif-type") as HTMLSelectElement;

    if (![message.value, content.value].every(v => v.length > 0)) {
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
    let expiry = document.getElementById("ban-expiry") as HTMLInputElement;
    const message = document.getElementById(
      "ban-message"
    ) as HTMLTextAreaElement;
    const permanent = document.getElementById(
      "ban-permanent"
    ) as HTMLInputElement;

    let exp = parseInt(expiry.value);
    if (permanent.checked) exp = 36500;

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
    modJson.banned == false;
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
    let badgeRes = await fetchAuthed("PATCH", `/user/badges/${user?.id}`, {
      badges: badgeState
    });

    if (!badgeRes.ok) {
      toast.error(await badgeRes.text());
      return;
    }

    addBadgesDialog.close();
    toast.success(`${user?.username}'s badges have now been edited.`);
  }

  function disableBan() {
    const permanent = document.getElementById(
      "ban-permanent"
    ) as HTMLInputElement;
    let expiry = document.getElementById("ban-expiry") as HTMLInputElement;
    expiry.disabled = false;
    if (permanent.checked) expiry.disabled = true;
  }

  $: iconColor = $isDark ? "white" : "black";
</script>

{#if user && ["admin", "moderator", "helper"].includes($role.name)}
  {#await loadData()}
    <p class="text-slate-950 dark:text-white">Loading...</p>
  {:then}
    <div class="flex max-w-full justify-center md:justify-start">
      <div class="w-full rounded-xl moderation p-3">
        <h1
          class=" text-base font-medium text-slate-950 dark:text-white md:text-lg">
          Moderate {user.username}
        </h1>
        <CasualLine />
        <div class="xs:flex-col md:flex">
          <div class="md:w-2/3">
            <button
              class="mt-1 flex w-full items-center rounded-md bg-red-600 p-1 text-left text-slate-950 transition-all hover:scale-102 dark:text-white"
              on:click="{() => {
                if (modJson.banned) open(unbanDialog);
                else open(banDialog);
              }}">
              <IconBan height="32" width="32" color="{iconColor}" class="p-1" />
              {#if modJson.banned}Unban (expires {new Date(
                  modJson.banExpiry
                ).toDateString()}){:else}Ban{/if}
            </button>
            <button
              class="mt-1 flex w-full items-center rounded-md bg-orange-600 p-1 text-left text-slate-950 transition-all hover:scale-102 dark:text-white"
              on:click="{() => open(warnDialog)}">
              <IconWarn
                height="32"
                width="32"
                color="{iconColor}"
                class="p-1" />
              Warn
            </button>
            <button
              class="mt-1 flex w-full items-center rounded-md bg-yellow-500 p-1 text-left text-slate-950 transition-all hover:scale-102 dark:text-white"
              id="send_notif"
              on:click="{() => open(notifDialog)}">
              <IconMessage
                color="{iconColor}"
                class="p-1"
                height="32"
                width="32" />
              Send a Notification
            </button>
            <a
              href="/user/{user?.username}/edit"
              class="mt-1 flex w-full items-center rounded-md bg-green-500 p-1 text-left text-slate-950 transition-all hover:scale-102 dark:text-white">
              <IconSettings
                height="32"
                width="32"
                color="{iconColor}"
                class="p-1" />
              Edit Profile Details
            </a>
            <button
              class="mt-1 flex w-full items-center rounded-md bg-sky-500 p-1 text-left text-slate-950 transition-all hover:scale-102 dark:text-white"
              on:click="{() => open(logOutDialog)}">
              <IconLogOut
                height="32"
                width="32"
                color="{iconColor}"
                class="p-1" />
              Log User Out
            </button>
            <button
              class="mt-1 flex w-full items-center rounded-md bg-indigo-500 p-1 text-left text-slate-950 transition-all hover:scale-102 dark:text-white"
              on:click="{() => open(addBadgesDialog)}">
              <IconTags
                height="32"
                width="32"
                color="{iconColor}"
                class="p-1" />
              Edit Badges
            </button>
          </div>
          <div class="w-1/3 pl-2">
            <p
              class="mt-6 text-xl font-extrabold text-slate-950 dark:text-white md:mt-0">
              User Info
            </p>
            <p class=" text-slate-950 dark:text-white">
              <b>ID: </b>
              {user.id}
            </p>
            {#if modJson.banned}
              <p class=" text-slate-950 dark:text-white">
                <b>Banned</b>
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <br />
  {/await}
{/if}

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
    class="input w-full h-32 resize-none"
    placeholder="..."
    id="warn-message"></textarea>
  <Button click="{async () => await warn()}">Warn {user?.username}</Button>
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
    class="input w-full h-48 resize-none"
    placeholder="Just a quick reminder that your cake which you forgot about has been in the oven for 10 minutes too long."
    name="notif-content"
    id="notif-content"></textarea>
  <label
    for="notif-type"
    class="mt-2 align-middle text-slate-950 dark:text-slate-100">
    Notification Type
  </label>
  <select name="notif-type" id="notif-type" class="input w-full mb-2">
    <option value="default">Default</option>
    <option value="important">Important</option>
    <option value="announcement">Announcement</option>
    <option value="rainbow">Rainbow 🌈</option>
  </select>
  <button
    on:click="{async () => await sendNotif()}"
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
    class="input w-full h-48 resize-none"
    placeholder="Burning cake after being **repeatedly told** to stop"
    id="ban-message"></textarea>
  <Button click="{async () => await banUser()}">Ban {user?.username}</Button>
</Modal>

<Modal bind:this="{unbanDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Unban {user?.username}
  </h1>
  <CasualLine />
  <p class=" text-slate-950 dark:text-white">
    {user?.username} has been banned for the following reason:
  </p>
  <p class="my-2 rounded-xl bg-stone-700 p-2 dark:text-stone-300">
    <MarkdownComponent source="" />
  </p>
  <p class=" text-slate-950 dark:text-white">
    Unban them to end their ban early.
  </p>
  <Button click="{async () => await unbanUser()}">Log them out!</Button>
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
  <Button click="{async () => await logOutUser()}">Log them out!</Button>
</Modal>
<Modal bind:this="{addBadgesDialog}">
  <h1 class=" text-xl font-bold text-slate-950 dark:text-white">
    Edit {user?.username}'s badges
  </h1>
  <CasualLine />
  <div class="my-4">
    <h2 class="text-slate-950 dark:text-white mb-2">Badges</h2>
    <MultiSelect
      options="{badges.map(v => v.name)}"
      bind:selected="{badgeState}" />
  </div>
  <Button click="{async () => await submitBadgeChanges()}"
    >Submit Changes</Button>
</Modal>
