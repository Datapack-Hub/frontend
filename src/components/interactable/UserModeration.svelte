<script lang="ts">
  import CasualLine from "$components/CasualLine.svelte";
  import Modal from "$components/modals/Modal.svelte";
  import { apiURL, fetchAuthed, postAuthed, userData } from "$globals";
  import ButtonLink from "./buttons/ButtonLink.svelte";

  export let user: User | undefined;

  let warnDialog: Modal;
  let notifDialog: Modal;

  async function warn() {
    const msgTxt = document.getElementById("warn-message") as HTMLTextAreaElement;
    
    let warnt = await postAuthed(`${apiURL}/notifs/send/${user?.id}`,{
      'type': "warn",
      'message':"Warning",
      'description': msgTxt.value
    })
    if(warnt.ok){
      warnDialog.close()
    }else{
      alert(await warnt.text())
    }
  }

  async function sendNotif() {
    const message = document.getElementById("notif-message") as HTMLInputElement;
    const content = document.getElementById("notif-content") as HTMLTextAreaElement;
    const type = document.getElementById("notif-type") as HTMLInputElement;
    
    let sent = await postAuthed(`${apiURL}/notifs/send/${user?.id}`,{
      'type': type.value,
      'message':message.value,
      'description': content.value
    })
    if(sent.ok){
      notifDialog.close()
    }else{
      alert(await sent.text())
    }
  }

</script>

<Modal bind:this={warnDialog}>
  <h1 class="font-brand text-xl dark:text-white font-bold">Warn {user?.username}</h1>
  <CasualLine />
  <p class="font-brand dark:text-white">This message is sent to the user as a notification. Always be professional, even when they are not.</p>
  <p class="align-middle dark:text-new-white font-brand mt-3">Warn Message</p>
  <textarea
    class="dark:bg-stone-700 bg-dark-white rounded-md dark:text-white h-24 text-lg p-2 font-brand w-full resize-none mb-4"
    placeholder="..."
    id="warn-message"
  />
  <button on:click={async () => await warn()} class="text-new-white p-2 bg-dph-orange rounded-md font-bold text-md md:text-lg lg:text-xl font-brand hover:scale-110 transition-all active:brightness-75">Warn {user?.username}</button>
</Modal>

<Modal bind:this={notifDialog}>
  <h1 class="font-brand text-xl dark:text-white font-bold">Notify {user?.username}</h1>
  <CasualLine />
  <p class="font-brand dark:text-white">
    Send an anonymous notification (unless you put your name down) to the user.
    For warnings, use the Warn button.
  </p>
  <p class="align-middle dark:text-new-white font-brand mt-3">Notification Message</p>
  <input
    class="dark:bg-stone-700 bg-dark-white rounded-md dark:text-white h-8 text-lg p-2 font-brand w-full resize-none"
    placeholder="Your cake is burning!"
    id="notif-message"
  />
  <p class="align-middle dark:text-new-white font-brand mt-3">Notification Body</p>
  <textarea
    class="dark:bg-stone-700 bg-dark-white rounded-md dark:text-white h-24 text-lg p-2 font-brand w-full resize-none"
    placeholder="Just a quick reiminder that your cake which you forgot about has been in the oven for 10 minutes too long."
    id="notif-content"
  />
  <p class="align-middle dark:text-new-white font-brand mt-2">Notification Type</p>
  <input
    class="dark:bg-stone-700 bg-dark-white rounded-md dark:text-white h-8 text-lg p-2 font-brand w-full resize-none mb-4"
    value="default"
    id="notif-type"
  />
  <button on:click={async () => await sendNotif()} class="text-new-white p-2 bg-dph-orange rounded-md font-bold text-md md:text-lg lg:text-xl font-brand hover:scale-110 transition-all active:brightness-75">Send</button>
</Modal>

{#if user}
<div class="flex max-w-full ms:max-w-lg justify-center md:justify-start">
  <div class="bg-red-500/25 rounded-xl p-2 mt-4 w-full">
      <h1 class="dark:text-white font-brand font-medium text-lg">Moderation Actions</h1>
      <CasualLine />
      <button class="flex mt-1 w-full rounded-md bg-red-500 text-left p-1 dark:text-white items-center font-brand hover:scale-102 transition-all">
          <img src="/icons/ban.svg" alt="ban" class="p-1 h-8 dark:invert"/>
          Ban
      </button>
      <button class="flex mt-1 w-full rounded-md bg-orange-500 text-left p-1 dark:text-white items-center font-brand hover:scale-102 transition-all" on:click={() => warnDialog.open()}>
          <img src="/icons/warn.svg" alt="warn" class="p-1 h-8 dark:invert"/>
          Warn
      </button>
      <button class="flex mt-1 w-full rounded-md bg-yellow-500 text-left p-1 dark:text-white items-center font-brand hover:scale-102 transition-all" on:click={() => notifDialog.open()}>
          <img src="/icons/message.svg" alt="msg" class="p-1 h-8 dark:invert"/>
          Send a Notification
      </button>
      <a href="/user/{user?.username}/edit" class="flex mt-1 w-full rounded-md bg-blue-500 text-left p-1 dark:text-white items-center font-brand hover:scale-102 transition-all">
        <img src="/icons/settings.svg" alt="ban" class="p-1 h-8 dark:invert"/>
        Edit Profile Details
      </a>
  </div>
</div><br />
{/if}