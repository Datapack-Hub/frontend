<script lang="ts">
  export let html = "";
  export let classes = "";
</script>

<!-- tailwind is so clean ._. -->
<div
  class="prose break-words
  leading-snug dark:prose-invert prose-a:break-all
  prose-a:underline
  prose-blockquote:border-slate-300
  prose-code:before:content-none
  prose-code:after:content-none prose-table:rounded-lg
  prose-table:bg-slate-300/40 prose-th:p-3
  prose-td:p-3 prose-img:py-3 prose-blockquote:dark:border-zinc-600
  prose-table:dark:bg-zinc-700/40 {classes}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
