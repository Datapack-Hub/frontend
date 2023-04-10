<script>
  import CasualLine from "$components/CasualLine.svelte";

</script>
<div class="bg-red-500/25 rounded-xl w-full p-2 mt-4">
    <h1 class="dark:text-white font-brand font-medium text-lg">Moderation Actions</h1>
    <CasualLine />
    <button class="flex mt-1 w-full rounded-md bg-red-500 text-left p-1 dark:text-white font-brand hover:scale-102">
        <img src="/icons/ban.svg" alt="ban" class="h-6 inline-block mr-1 align-bottom"/>
        Ban
    </button>
    <button class="flex mt-1 w-full rounded-md bg-orange-500 text-left p-1 dark:text-white font-brand hover:scale-102">
        <img src="/icons/warn.svg" alt="ban" class="h-6 inline-block mr-1 align-bottom"/>
        Warn
    </button>
</div>