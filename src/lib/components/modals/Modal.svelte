<script lang="ts">
  import IconClose from "~icons/tabler/X.svelte"

  let instance: HTMLDialogElement;

  export function open() {
    instance.showModal();
  }

  export function close() {
    instance.close();
  }
</script>

<dialog bind:this="{instance}" class="bg-transparent backdrop:backdrop-blur-lg backdrop:brightness-75 backdrop:transition-all transition-all w-1/3">
  <div
    class="rounded-xl p-3 dark:bg-stone-800">
    <form method="dialog">
      <button
        class="float-right text-pearl-lusta-950 dark:text-white"
        ><IconClose/></button>
    </form>
    <slot />
  </div>
</dialog>
