<script lang="ts">
  export let html = "";
  export let classes = "";
</script>

<!-- tailwind is so clean ._. -->
<div
  class="prose break-words
  dark:prose-invert prose-a:break-all
  prose-a:underline
  prose-p:my-3
  prose-hr:my-12
  prose-blockquote:border-slate-300
  prose-code:before:content-none
  prose-code:after:content-none
  prose-pre:p-3 prose-pre:bg-slate-300 dark:prose-pre:bg-zinc-950
  prose-code:bg-slate-300 dark:prose-code:bg-zinc-950 prose-code:p-1 prose-code:rounded-md prose-table:rounded-lg
  prose-table:bg-slate-300/40 prose-th:p-3
  prose-td:p-3 prose-img:py-3 prose-blockquote:dark:border-zinc-600
  prose-table:dark:bg-zinc-700/40 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
