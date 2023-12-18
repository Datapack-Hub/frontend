<script>
  import { random } from "radash";
  import IconX from "~icons/tabler/X.svelte";
</script>

<a
  href="{random(0, 1)
    ? 'https://bisecthosting.com/silabear'
    : 'https://bisecthosting.com/flynecraft'}">
  <div
    class="flex items-center rounded-xl bg-[#03ddff] p-3 text-[#0d1129] transition-all dark:bg-[#0D1129] dark:text-white">
    <div class="flex flex-grow items-center space-x-2">
      <img
        src="/logos/bh.svg"
        alt="BisectHosting Logo"
        class="h-6"
        width="24"
        height="24" />
      <p class="text-sm text-black dark:text-white">
        Want to play Minecraft with friends? <b><u>Bisect Hosting</u></b> is the
        official recommended Minecraft server host of Datapack Hub!
      </p>
    </div>
    <IconX />
  </div>
</a>
