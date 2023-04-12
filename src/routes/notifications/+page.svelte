<script lang="ts">
import type { PageData } from "./$types";
import UserCard from "$components/UserCard.svelte";
  import { userData } from "$globals";
  import Modal from "$components/modals/Modal.svelte";
  import Notification from "$components/Notification.svelte";
  
export let data: PageData;
</script>

    <svelte:head>
      <title>Notifications | Datapack Hub</title>
    </svelte:head>
    
    <main
      class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64 overflow-y-scroll"
    >
        <div 
            class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"
        >
            <h1
                class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2"
            >
            Notifications
            </h1>
            {#if data.notifications?.length == 0}
                <h1 class="dark:text-white font-brand"><b>No notifications!</b> It's lonely in here</h1>
            {/if}
            {#each data.notifications ?? [] as notif}
            <Notification notification={notif} />
            {/each}
        </div>
    </main>