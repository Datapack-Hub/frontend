<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main
  id="main-content"
  class="flex h-screen items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24">
  <img src="/logos/dph.svg" alt="logo" class="w-1/4 p-12" />
  <div class="w-3/4">
    <h1
      class="mb-4 text-3xl font-bold text-zinc-950 dark:text-zinc-100 md:text-4xl lg:text-5xl">
      Stop!
    </h1>
    <p
      class="text-base text-zinc-950 dark:text-zinc-100 md:text-lg lg:text-xl">
      You are being redirected to another page. This page may have different
      privacy policies or may be malicious. Make sure you know that the site is
      safe before continuing!
    </p>
    <p
      class="text-sm text-zinc-950/60 dark:text-zinc-100/60 md:text-base lg:text-lg">
      URL: {data.url}
    </p>
    <div class="mt-4 flex w-2/3 justify-between md:w-1/2 lg:w-2/5">
      <a
        class="button-primary"
        rel="nofollow"
        href="{decodeURIComponent(data.url ?? 'https://datapackhub.net')}"
        >Continue to page</a>
      <Button click="{() => history.back()}">Go Back</Button>
    </div>
  </div>
</main>
