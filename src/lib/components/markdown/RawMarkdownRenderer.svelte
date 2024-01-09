<script lang="ts">
  import { isDark } from "$lib/globals/stores";
  import "./code-colors.css";
  export let html = "";
  export let classes = "";
</script>

<!-- tailwind is so clean ._. -->
<div
  class="prose break-words
  dark:prose-invert
  prose-a:break-all
  prose-a:underline
  prose-blockquote:border-slate-300
  prose-code:rounded-md
  prose-code:bg-slate-100
  prose-code:p-1
  prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-100
  prose-pre:p-3 prose-table:rounded-lg prose-table:bg-slate-300/40 prose-th:p-3 prose-td:p-3
  prose-img:py-3 prose-hr:my-12
  prose-blockquote:dark:border-zinc-600 dark:prose-code:bg-zinc-950 dark:prose-pre:bg-zinc-950
  prose-code:text-black
  dark:prose-code:text-white
  prose-table:dark:bg-zinc-700/40 {classes} {$isDark ? 'dark' : ''}">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>
