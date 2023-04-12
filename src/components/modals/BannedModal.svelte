<script lang="ts">
  import CasualLine from "$components/CasualLine.svelte";
  import SvelteMarkdown from "svelte-markdown";

    let visible = false
    export function open(){
        visible = true;
    }

    export function close(){
        visible = false;
    }

    let expiry = 210938192379812 as number;
    let banReason = "_Repeatedly_ uploading stolen content and claiming it as your own after being told multiple times to stop. We do not tolerate theft of datapacks on Datapack Hub."

</script>

{#if visible}
<div class="fixed top-0 left-0 flex backdrop-blur-lg w-screen h-screen">
    <div class="relative m-auto align-middle justify-self-center p-3 dark:bg-stone-800 rounded-xl w-1/2">
        <a href="/" class="flex justify-center items-center z-20 cursor-pointer">
            <img
              src="/logos/dph.svg"
              alt="logo"
              class="h-8 rounded-full hover:brightness-75 transition-all mr-1"
              height="32"
              width="32"
            />
            <span
              class="dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 hover:text-neutral-700 active:text-neutral-600 text-black font-brand font-bold text-2xl transition-colors hidden md:block"
            >
              Datapack Hub
            </span>
          </a>
        <!-- <h1 class="font-brand text-2xl dark:text-white font-regular">You are temporarily banned from Datapack Hub</h1> -->
        <CasualLine />
        <p class="font-brand dark:text-white text-lg"><b>You are banned from Datapack Hub.</b> The reason is displayed below:</p>
        <p class="p-2 bg-stone-700 rounded-xl font-brand dark:text-stone-300 my-2"><SvelteMarkdown source={banReason}/></p>
        <p class="font-brand dark:text-white"><b>Your ban will expire:</b> {new Date(expiry).toLocaleString()}. <br /> Until then, wait for the ban to expire, and read <a href="" class="text-cyan-500 underline">our rules</a>.</p>
  
    </div>
</div>
{/if}