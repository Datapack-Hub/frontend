<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main
  id="main-content"
  class="flex h-screen flex-col items-center justify-center space-x-0 px-4 sm:px-8 md:flex-row md:space-x-8 md:px-16 lg:space-x-24 lg:px-24 xl:space-x-48">
  <img src="/logos/dph_stop.svg" alt="logo" class="w-48" />
  <div class="w-full md:w-2/3">
    <h1
      class="mb-4 text-4xl font-bold text-zinc-950 dark:text-zinc-100 md:text-4xl lg:text-5xl">
      Stop!
    </h1>
    <p class="text-base text-zinc-950 dark:text-zinc-100 md:text-lg lg:text-xl">
      You are being redirected to another page. This page may have different
      privacy policies or may be malicious. Make sure you know that the site is
      safe before continuing!
    </p>
    <p
      class="mt-2 text-sm text-zinc-950/60 dark:text-zinc-100/60 md:text-base lg:text-lg">
      URL: {data.url}
    </p>
    <div
      class="mt-4 flex flex-col space-x-0 space-y-3 md:flex-row md:space-x-4 md:space-y-0">
      <a
        class="button-primary text-center"
        rel="nofollow noreferer"
        href="{decodeURIComponent(data.url ?? 'https://datapackhub.net')}"
        >Continue to site</a>
      <Button click="{() => history.back()}">Go Back</Button>
    </div>
  </div>
</main>
