<script lang="ts">
  import { page } from "$app/stores";

  let message = $page.error?.description;

  if (!message) {
    switch ($page.status) {
      case 404: {
        message =
          "Looks like you hit a block in your adventure, but don't worry, we've got plenty of datapacks to help you break through. Unfortunately, this page isn't one of them";
        break;
      }

      case 401: {
        message =
          "You are logged out, please log back in to enjoy all the luxuries we supply";
        break;
      }

      case 403: {
        message =
          "Forbidden fruit! This page is tempting, but unfortunately, it's off-limits for now. Don't worry, we have plenty of other juicy datapacks for you to enjoy!";
        break;
      }

      case 500: {
        message =
          "A creeper exploded in our server room, but our Redstone engineers are on the case fixing it, try again in a few minutes.";
        break;
      }

      default: {
        message =
          "We haven't coded a message for this error yet! If you think we should, reach out to us, or, if you're a dev, make a pull request.";
      }
    }
  }
</script>

<svelte:head>
  <title>{$page.error?.message} | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class="flex h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-zinc-900 sm:px-8 md:flex-row md:justify-start md:px-16 lg:px-24">
  <p
    class="mb-8 w-full text-center font-console text-8xl font-bold text-slate-950 dark:text-white md:mb-0 md:w-1/2 md:text-9xl lg:text-[10rem] xl:text-[12rem]">
    {$page.status}
  </p>
  <div class="w-full md:w-1/2">
    <p
      class="mb-6 text-center font-console text-4xl font-bold text-slate-950 dark:text-white md:text-left md:text-5xl lg:text-6xl xl:text-7xl">
      {$page.error?.message}
    </p>
    <p
      class="text-center text-lg text-slate-950/40 dark:text-white/40 md:text-left md:text-xl lg:text-2xl">
      {message}
    </p>
  </div>
</main>
