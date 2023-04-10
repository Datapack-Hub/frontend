<script>
  import CasualLine from "$components/CasualLine.svelte";

</script>

<div class="flex max-w-full ms:max-w-lg justify-center md:justify-start">
  <div class="bg-red-500/25 rounded-xl p-2 mt-4 w-full">
      <h1 class="dark:text-white font-brand font-medium text-lg">Moderation Actions</h1>
      <CasualLine />
      <button class="flex mt-1 w-full rounded-md bg-red-500 text-left p-1 dark:text-white items-center font-brand hover:scale-102">
          <img src="/icons/ban.svg" alt="ban" class="p-1 h-8 dark:invert"/>
          Ban
      </button>
      <button class="flex mt-1 w-full rounded-md bg-orange-500 text-left p-1 dark:text-white items-center font-brand hover:scale-102">
          <img src="/icons/warn.svg" alt="ban" class="p-1 h-8 dark:invert"/>
          Warn
      </button>
  </div>
</div><br />