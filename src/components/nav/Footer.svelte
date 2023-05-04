<script>
  import CasualLine from "$components/CasualLine.svelte";

</script>
<footer
  class="flex flex-col md:flex-row items-center justify-evenly md:justify-between h-96 md:h-64 border-t-2 border-new-white-100 bg-new-white-200 px-8 dark:border-stone-700 dark:bg-stone-900 md:px-16 lg:px-24"
  id="footer">
  <div>
    <img
      src="/logos/dph.svg"
      alt="logo"
      class="h-12 transition-all hover:brightness-75 w-full md:w-auto" />
    <p
      class="font-brand text-2xl font-bold transition-colors hover:text-neutral-700 active:text-neutral-600 dark:text-white dark:hover:text-neutral-400 dark:active:text-neutral-500 w-full text-center md:text-left">
      Datapack Hub
    </p>
    <p class="font-light font-brand dark:text-white text-opacity-25 dark:text-opacity-25 text-sm mt-4">Copyright © 2023 Datapack Hub</p>
  </div>
  <div></div>
  <div class="w-full md:w-2/3 max-w-5xl">
    <div class="w-full flex">
      <h3 class="font-brand font-bold text-orange-500 text-xl w-1/3 text-center md:text-right">Socials</h3>
      <h3 class="font-brand font-bold text-orange-500 text-xl w-1/3 text-center md:text-right">Info</h3>
      <h3 class="font-brand font-bold text-orange-500 text-xl w-1/3 text-center md:text-right">idk</h3>
    </div>
    <CasualLine/>
    <!-- put header content here -->
    <div class="w-full flex">
      <ul class="font-brand dark:text-white w-1/3 text-center md:text-right">
        <li>Thing</li>
        <li>Thing</li>
        <li>Thing</li>
      </ul>
      <ul class="font-brand dark:text-white w-1/3 text-center md:text-right">
        <li>Thing</li>
        <li>Thing</li>
        <li>Thing</li>
      </ul>
      <ul class="font-brand dark:text-white w-1/3 text-center md:text-right">
        <li>Thing</li>
        <li>Thing</li>
        <li>Thing</li>
      </ul>
    </div>
  </div>
</footer>
