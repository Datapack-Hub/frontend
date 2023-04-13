<script lang="ts">
  import CasualLine from "$components/CasualLine.svelte";
  import Modal from "$components/modals/Modal.svelte";
  import { apiURL, fetchAuthed, postAuthed, userData } from "$globals";
  import ButtonLink from "./buttons/ButtonLink.svelte";

  export let user: User | undefined;

  let warnDialog: Modal;
  let notifDialog: Modal;
  let banDialog: Modal;

  function open(me: Modal) {
    warnDialog.close();
    notifDialog.close();
    banDialog.close();
    me.open();
  }

  async function warn() {
    const msgTxt = document.getElementById(
      "warn-message"
    ) as HTMLTextAreaElement;

    let warnt = await postAuthed(`${apiURL}/notifs/send/${user?.id}`, {
      type: "important",
      message: "Warning",
      description: msgTxt.value,
    });
    if (warnt.ok) {
      warnDialog.close();
    } else {
      alert(await warnt.text());
    }
  }

  async function sendNotif() {
    const message = document.getElementById(
      "notif-message"
    ) as HTMLInputElement;
    const content = document.getElementById(
      "notif-content"
    ) as HTMLTextAreaElement;
    const type = document.getElementById("notif-type") as HTMLInputElement;

    if (
      typeof message == "undefined" ||
      typeof content == "undefined" ||
      typeof type == "undefined"
    )
      return alert("Make sure all fields are filled in!");

    let sent = await postAuthed(`${apiURL}/notifs/send/${user?.id}`, {
      type: type.value,
      message: message.value,
      description: content.value,
    });
    if (sent.ok) {
      notifDialog.close();
    } else {
      alert(await sent.text());
    }
  }

  async function banUser() {
    let expiry = document.getElementById("ban-expiry") as HTMLInputElement;
    const message = document.getElementById(
      "ban-message"
    ) as HTMLTextAreaElement;
    const permanent = document.getElementById(
      "ban-permanent"
    ) as HTMLInputElement;

    let exp;

    if (permanent.checked) {
      exp =
        new Date(
          new Date().setFullYear(new Date().getFullYear() + 10)
        ).getTime() / 1000;
    } else {
      exp = new Date(expiry.value).getTime();
    }

    let ban = await postAuthed(`${apiURL}/moderation/ban/${user?.id}`, {
      id: user?.id,
      expires: exp,
      message: message.value,
    });
    if (ban.ok) {
      banDialog.close();
    } else {
      alert(await ban.text());
    }
  }
</script>

<Modal bind:this="{warnDialog}">
  <h1 class="font-brand text-xl font-bold dark:text-white">
    Warn {user?.username}
  </h1>
  <CasualLine />
  <p class="font-brand dark:text-white">
    This message is sent to the user as a notification. Always be professional,
    even when they are not.
  </p>
  <p class="mt-3 align-middle font-brand dark:text-new-white">Warn Message</p>
  <textarea
    class="mb-4 h-24 w-full resize-none rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
    placeholder="..."
    id="warn-message"></textarea>
  <button
    on:click="{async () => await warn()}"
    class="text-md rounded-md bg-dph-orange p-2 font-brand font-bold text-new-white transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl"
    >Warn {user?.username}</button>
</Modal>

<Modal bind:this="{notifDialog}">
  <h1 class="font-brand text-xl font-bold dark:text-white">
    Notify {user?.username}
  </h1>
  <CasualLine />
  <p class="font-brand dark:text-white">
    Send an anonymous notification (unless you put your name down) to the user.
    For warnings, use the Warn button.
  </p>
  <p class="mt-3 align-middle font-brand dark:text-new-white">
    Notification Message
  </p>
  <input
    class="h-8 w-full resize-none rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
    placeholder="Your cake is burning!"
    id="notif-message" />
  <p class="mt-3 align-middle font-brand dark:text-new-white">
    Notification Body
  </p>
  <textarea
    class="h-24 w-full resize-none rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
    placeholder="Just a quick reiminder that your cake which you forgot about has been in the oven for 10 minutes too long."
    id="notif-content"></textarea>
  <p class="mt-2 align-middle font-brand dark:text-new-white">
    Notification Type
  </p>
  <input
    class="mb-4 h-8 w-full resize-none rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
    value="default"
    id="notif-type" />
  <button
    on:click="{async () => await sendNotif()}"
    class="text-md rounded-md bg-dph-orange p-2 font-brand font-bold text-new-white transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl"
    >Send</button>
</Modal>

<Modal bind:this="{banDialog}">
  <h1 class="font-brand text-xl font-bold dark:text-white">
    Ban {user?.username}
  </h1>
  <CasualLine />
  <p class="font-brand dark:text-white">
    Banning a user prevents them from interacting with the website. You can
    write a message or ban reason to be displayed when they try to log in.
  </p>
  <p class="mt-3 align-middle font-brand dark:text-new-white">Ban Expiry</p>
  <input
    type="date"
    class="h-8 w-full resize-none rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
    id="ban-expiry" />
  <label class="font-brand dark:text-new-white">
    <input type="checkbox" id="ban-permanent" />
    Permanent?
  </label>
  <p class="mt-3 align-middle font-brand dark:text-new-white">
    Ban Message (supports markdown)
  </p>
  <textarea
    class="h-24 w-full resize-none rounded-md bg-dark-white p-2 font-brand text-lg dark:bg-stone-700 dark:text-white"
    placeholder="Burning cake after being **repeatedly told** to stop"
    id="ban-message"></textarea>
  <button
    on:click="{async () => await banUser()}"
    class="text-md rounded-md bg-dph-orange p-2 font-brand font-bold text-new-white transition-all hover:scale-110 active:brightness-75 md:text-lg lg:text-xl"
    >Ban {user?.username}</button>
</Modal>

{#if user}
  <div class="ms:max-w-lg flex max-w-full justify-center md:justify-start">
    <div class="mt-4 w-full rounded-xl bg-red-500/25 p-2">
      <h1 class="font-brand text-lg font-medium dark:text-white">
        Moderation Actions
      </h1>
      <CasualLine />
      <div class="xs:flex-col md:flex">
        <div class="md:w-2/3">
          <button
            class="mt-1 flex w-full items-center rounded-md bg-red-500 p-1 text-left font-brand transition-all hover:scale-102 dark:text-white"
            on:click="{() => open(banDialog)}">
            <img src="/icons/ban.svg" alt="ban" class="h-8 p-1 dark:invert" />
            Ban
          </button>
          <button
            class="mt-1 flex w-full items-center rounded-md bg-orange-500 p-1 text-left font-brand transition-all hover:scale-102 dark:text-white"
            on:click="{() => open(warnDialog)}">
            <img src="/icons/warn.svg" alt="warn" class="h-8 p-1 dark:invert" />
            Warn
          </button>
          <button
            class="mt-1 flex w-full items-center rounded-md bg-yellow-500 p-1 text-left font-brand transition-all hover:scale-102 dark:text-white"
            on:click="{() => open(notifDialog)}">
            <img
              src="/icons/message.svg"
              alt="msg"
              class="h-8 p-1 dark:invert" />
            Send a Notification
          </button>
          <a
            href="/user/{user?.username}/edit"
            class="mt-1 flex w-full items-center rounded-md bg-blue-500 p-1 text-left font-brand transition-all hover:scale-102 dark:text-white">
            <img
              src="/icons/settings.svg"
              alt="ban"
              class="h-8 p-1 dark:invert" />
            Edit Profile Details
          </a>
        </div>
        <div class="w-1/3 pl-2">
          <p class="font-brand text-xl font-extrabold dark:text-white">
            User Info
          </p>
          <CasualLine />
          <p class="font-brand dark:text-white"><b>User ID: </b> {user.id}</p>
          insert more here
        </div>
      </div>
    </div>
  </div>
  <br />
{/if}
