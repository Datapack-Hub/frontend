<script lang="ts">
  import { browser } from "$app/environment";
  import Button from "$lib/components/decorative/Button.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  function goBack() {
    if (browser) {
      history.back();
    }
  }
</script>

<main
  class="flex items-center justify-between h-screen px-4 sm:px-8 md:px-16 lg:px-24">
  <img src="/logos/dph.svg" alt="logo" class="w-1/4 p-12" />
  <div class="w-3/4">
    <h1
      class="text-3xl md:text-4xl lg:text-5xl text-slate-950 dark:text-slate-100 mb-4 font-bold">
      Stop!
    </h1>
    <p
      class="text-base md:text-lg lg:text-xl text-slate-950 dark:text-slate-100">
      You are being redirected to another page. This page may have different
      privacy policies or may be malicious. Make sure you know that the site is
      safe before continuing!
    </p>
    <p
      class="text-sm md:text-base lg:text-lg text-slate-950/60 dark:text-slate-100/60">
      URL: {data.url}
    </p>
    <div class="flex w-2/3 md:w-1/2 lg:w-2/5 justify-between mt-4">
      <Button click="{data.url ?? 'https://datapackhub.net'}"
        >Continue to page</Button>
      <Button click="{goBack}">Go Back</Button>
    </div>
  </div>
</main>
