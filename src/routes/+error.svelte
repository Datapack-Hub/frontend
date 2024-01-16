<script lang="ts">
  import { page } from "$app/stores";

  let message = $page.error?.message;
  let description = $page.error?.description;

  // if description not set, fallback to default message for status code
  if (!description) {
    switch ($page.status) {
      case 401: {
        description =
          "Hey there datpack enthusiast! Have we met before? Sign in to your account to access this page.";
        break;
      }

      case 403: {
        description =
          "Forbidden fruit! This page is tempting, but unfortunately, it's off-limits for now. Don't worry, we have plenty of other juicy datapacks for you to enjoy!";
        break;
      }

      case 404: {
        description =
          "Looks like you hit a block in your adventure, but don't worry, we've got plenty of awesome projects to help you break through. Unfortunately, this page isn't one of them.";
        break;
      }

      case 500: {
        description =
          "A creeper exploded in our server room, but our Redstone engineers are on the case fixing it, try again in a few minutes.";
        break;
      }

      default: {
        description =
          "Our spyglasses haven't spotted this error yet! If you think we should know about it, reach out to us, or, if you're a dev, make a pull request.";
      }
    }
  }
</script>

<svelte:head>
  <title>{message} | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class="flex h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-zinc-900 sm:px-8 md:flex-row md:justify-start md:px-16 lg:px-24">
  
  <!-- HTTP response status code -->
  <div class="w-full md:w-1/2">
    <p
      class="w-full text-center mb-8 font-console text-8xl font-bold text-zinc-950 dark:text-white md:mb-0 md:text-9xl lg:text-[10rem] xl:text-[12rem]">
      {$page.status}
    </p>
    <p
      class="w-full text-center mb-6 font-console text-4xl font-bold text-zinc-950 dark:text-white md:text-5xl lg:text-6xl xl:text-7xl">
      {message}
    </p>
  </div>
  
  <!-- Details -->
  <div class="w-full md:w-1/2">
    <p
        class="text-center text-lg text-zinc-950/40 dark:text-white/40 md:text-left md:text-xl lg:text-2xl">
        {description}
    </p>
  </div>

  
</main>
