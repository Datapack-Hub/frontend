<script lang="ts">
  import { page } from "$app/stores";

  let message = $page.error?.description;

  if (!message) {
    switch ($page.status) {
      case 404:
        message =
          "This link either stopped existing, no longer exists, or never existed in the first place, you may want to check if the link is correct!";
        break;

      case 401:
        message =
          "Please log in! This page contains data which needs you to be logged in!";
        break;

      case 403:
        message =
          "You don't have permission to visit this page! If you think this is an error, contact an admin!";
        break;

      case 500:
        message = "Our servers are currently blowing up, look what you did!";
        break;

      default:
        message =
          "We haven't coded a message for this error yet! If you think we should, reach out to us, or, if you're a dev, make a pull request.";
    }
  }
</script>

<main
  class="flex h-screen w-full flex-col items-center justify-center bg-new-white-200 px-8 transition-colors dark:bg-stone-900 md:flex-row md:justify-start md:px-16 lg:px-24">
  <p
    class="mb-8 w-full text-center font-mono text-9xl dark:text-white md:mb-0 md:w-1/2 md:text-[10rem] lg:text-[12rem] xl:text-[15rem]">
    {$page.status}
  </p>
  <div class="w-full md:w-1/3">
    <p
      class="mb-6 text-center font-brand text-5xl dark:text-white md:text-left md:text-6xl lg:text-8xl xl:text-9xl">
      {$page.error?.message}
    </p>
    <p
      class="font-brand text-lg opacity-40 dark:text-white md:text-xl lg:text-2xl">
      {message}
    </p>
  </div>
</main>
