<script lang="ts">
  import { page } from "$app/stores";

  let message = $page.error?.description;

  if (!message) {
    switch ($page.status) {
      case 404:
        message =
          "Looks like you hit a block in your Minecraft adventure, but don't worry, we've got plenty of datapacks to help you break through. Unfortunately, this page isn't one of them.";
        break;

      case 401:
        message = "No cracked accounts allowed! Please sign in and try again!";
        break;

      case 403:
        message =
          "Forbidden fruit! This page is tempting, but unfortunately, it's off-limits for now. Don't worry, we have plenty of other juicy datapacks for you to enjoy!";
        break;

      case 500:
        message =
          "Oops, a creeper exploded in our server room. Our redstone engineers are on the case rewiring the server to get it working as soon as possible!";
        break;

      default:
        message =
          "We haven't coded a message for this error yet! If you think we should, reach out to us, or, if you're a dev, make a pull request.";
    }
  }
</script>

<svelte:head>
  <title>{$page.error?.message} | Datapack Hub</title>
</svelte:head>

<main
  class="flex h-screen w-full flex-col items-center justify-center bg-pearl-lusta-100 px-8 transition-colors dark:bg-stone-900 md:flex-row md:justify-start md:px-16 lg:px-24">
  <p
    class="mb-8 w-full text-center font-console text-9xl font-bold text-pearl-lusta-950 dark:text-white md:mb-0 md:w-1/2 md:text-[10rem] lg:text-[12rem] xl:text-[15rem]">
    {$page.status}
  </p>
  <div class="w-full md:w-1/3">
    <p
      class="mb-6 text-center font-console text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-left md:text-6xl lg:text-8xl">
      {$page.error?.message}
    </p>
    <p
      class="font-brand text-lg text-pearl-lusta-950/40 dark:text-white/40 md:text-xl lg:text-2xl">
      {message}
      {$page.error?.description}
    </p>
  </div>
</main>
