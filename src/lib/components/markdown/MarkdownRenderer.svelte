<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import MKDWorker from "./markdown.worker?worker";

  export let source: string | undefined = "";
  export let classes = "";
  export let limitedMode = false;

  let html = "";

  onMount(async () => {
    if (!browser) {
      return;
    }
    const msp = await import("marked-smartypants");
    const { marked } = await import("marked");

    marked.use(msp.markedSmartypants());

    if (source) {
      let worker = new MKDWorker();
      worker.postMessage([source, limitedMode]);
      worker.addEventListener("message",  message => {
        if (typeof message.data == "string") html = message.data;
      });
    }
    else {html = "";}
  });

  afterNavigate(() => {
    if (!browser) {
      return;
    }

    if (source) {
      let worker = new MKDWorker();
      worker.postMessage([source, limitedMode]);
      worker.addEventListener("message", message => {
        if (typeof message.data == "string") html = message.data;
      });
    }
    else {html = "";}
  });
</script>

<div
  class="prose dark:prose-invert leading-snug break-words prose-table:bg-slate-300 prose-table:dark:bg-stone-800 prose-td:p-2 prose-th:p-2 prose-table:rounded-md prose-tbody:odd:bg-stone-600 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
