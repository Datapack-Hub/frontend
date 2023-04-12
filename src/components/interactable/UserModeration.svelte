<script lang="ts">
  import CasualLine from "$components/CasualLine.svelte";
  import Modal from "$components/modals/Modal.svelte";
  import { apiURL, fetchAuthed, postAuthed, userData } from "$globals";
  import ButtonLink from "./buttons/ButtonLink.svelte";

  export let user: User | undefined;

  let warnDialog: Modal;

  async function warn() {
    const msgTxt = document.getElementById("message") as HTMLTextAreaElement;
    alert(msgTxt.value)
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

</script>

<Modal bind:this={warnDialog}>
  <h1 class="font-brand text-xl dark:text-white font-bold">Warn {user?.username}</h1>
  <CasualLine />
  <p class="font-brand dark:text-white">This message is sent to the user as a notification. Always be professional, even when they are not.</p>
  <p class="align-middle dark:text-new-white font-brand mt-3">Warn Message</p>
  <textarea
    class="dark:bg-stone-700 bg-dark-white rounded-md dark:text-white h-24 text-lg p-2 font-brand w-full resize-none mb-4"
    placeholder="..."
    id="message"
  />
  <button on:click={async () => await warn()} class="text-new-white p-2 bg-dph-orange rounded-md font-bold text-md md:text-lg lg:text-xl font-brand hover:scale-110 transition-all active:brightness-75">Warn {user?.username}</button>
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
      <a href="/user/{user?.username}/edit" class="flex mt-1 w-full rounded-md bg-blue-500 text-left p-1 dark:text-white items-center font-brand hover:scale-102 transition-all">
        <img src="/icons/settings.svg" alt="ban" class="p-1 h-8 dark:invert"/>
        Edit Profile Details
      </a>
  </div>
</div><br />
{/if}