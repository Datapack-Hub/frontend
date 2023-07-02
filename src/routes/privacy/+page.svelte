<script lang="ts">
  import MarkdownComponent from "$lib/components/markdown/MarkdownComponent.svelte";

  let source = "Loading Policy...";

  fetch(
    "https://gist.githubusercontent.com/Silabear/2fae770ffd59b563668f68dafaa90b82/raw/d9d1ed01a772d4906495982fc6cfc707b93adf6b/policy.md"
  ).then(res => {
    if (res.ok)
      res.text().then(v => {
        source = v;
      });
  });
</script>

<svelte:head>
  <title>Rules | Datapack Hub</title>
</svelte:head>

<main
  class="bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="pt-20"></div>
  <MarkdownComponent source="{source}" />
  <div class="pb-10"></div>
</main>
