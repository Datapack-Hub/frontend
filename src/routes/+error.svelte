<script lang="ts">
  import { page } from "$app/stores";

  let message = "";

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
</script>

<main
  class="dark:bg-stone-900 bg-new-white transition-colors h-screen w-full flex items-center"
>
  <p class="font-brand text-[15rem] dark:text-white w-1/2 text-center">
    {$page.status}
  </p>
  <div class="w-1/3">
    <p class="font-brand text-9xl dark:text-white mb-6">
      {$page.error?.message}
    </p>
    <p class="font-brand text-2xl dark:text-white opacity-40">{message}</p>
  </div>
</main>
