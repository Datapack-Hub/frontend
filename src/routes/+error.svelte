<script lang="ts">
  import { page } from "$app/stores";

  let message = $page.error?.message;
  let description = $page.error?.description;
  let STATUS = $page.status;
  // STATUS = 501; // DEBUG ONLY

  // if description not set, fallback to default message for status code
  if (!description) {
    switch (STATUS) {
      case 401: {
        message = "Unauthorized";
        description =
          "Hey there datpack enthusiast! Have we met before? Sign in to your account to access this page.";
        break;
      }

      case 403: {
        message = "Forbidden";
        description =
          "Forbidden fruit! This page is tempting, but unfortunately, it's off-limits for now. Don't worry, we have plenty of other juicy datapacks for you to enjoy!";
        break;
      }

      case 404: {
        message = "Not Found";
        description =
          "Looks like you hit a block in your adventure, but don't worry, we've got plenty of awesome projects to help you break through. Unfortunately, this page isn't one of them.";
        break;
      }

      case 500: {
        message = "Internal Server Error";
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
  <div class="mx-10 w-full md:w-1/2">
    <p
      class="w-full text-center font-console text-8xl font-bold text-zinc-950 dark:text-white md:mb-0 md:text-9xl lg:text-[10rem] xl:text-[12rem]">
      {STATUS}
    </p>
    <p
      class="my-4 w-full text-center font-console text-4xl font-bold text-zinc-950 dark:text-white md:text-5xl lg:text-6xl xl:text-7xl">
      {message}
    </p>
  </div>

  <!-- details -->
  <div class="my-4 w-full md:w-1/2">
    <div
      class="w-full rounded-lg bg-slate-200 p-4 dark:bg-zinc-800 lg:col-auto">
      <p class="mb-4 text-lg dark:text-zinc-100">
        {description}
      </p>

      <!-- select buttons depending on status -->
      <!-- Unauthorized -->
      {#if STATUS == 401}
        <div class="grid-auto-fit-2md grid gap-4">
          <a
            href="/login"
            class="button-base flex items-center justify-center gap-3 bg-[#ff631a] text-white">
            <img src="/logos/dph.svg" alt="dph logo" class="h-4 self-center" />
            Sign In
          </a>
        </div>

        <!-- Forbidden -->
      {:else if STATUS == 403}
        <div class="grid-auto-fit-2md grid gap-4">
          <a
            href="/"
            class="button-base flex items-center justify-center gap-3 bg-[#ff631a] text-white">
            <img src="/logos/dph.svg" alt="dph logo" class="h-4 self-center" />
            Home
          </a>
          <a
            href="/explore"
            class="button-base flex items-center justify-center gap-3 bg-[#ff631a] text-white">
            <img src="/logos/dph.svg" alt="dph logo" class="h-4 self-center" />
            Explore Projects
          </a>
        </div>
        <p class="my-4 text-lg dark:text-zinc-100">
          Do you believe you should have access to this place? Report the issue!
        </p>
        <div class="grid-auto-fit-2md grid gap-4">
          <a
            href="https://discord.datapackhub.net"
            class="button-base flex items-center justify-center gap-3 bg-[#5865F2] text-white">
            <img
              src="/logos/discord-white.svg"
              alt="discord logo"
              class="h-4 self-center" />
            Discord
          </a>
          <a
            href="https://github.com/Datapack-Hub/api"
            class="button-base flex items-center justify-center gap-3 bg-black text-white">
            <img
              src="/logos/github-white.svg"
              alt="github logo"
              class="h-4 self-center" />
            API Repo
          </a>
          <a
            href="https://github.com/Datapack-Hub/frontend"
            class="button-base flex items-center justify-center gap-3 bg-black text-white">
            <img
              src="/logos/github-white.svg"
              alt="github logo"
              class="h-4 self-center" />
            Site Repo
          </a>
        </div>

        <!-- Not Found -->
      {:else if STATUS == 404}
        <div class="grid-auto-fit-2md grid gap-4">
          <a
            href="/"
            class="button-base flex items-center justify-center gap-3 bg-[#ff631a] text-white">
            <img src="/logos/dph.svg" alt="dph logo" class="h-4 self-center" />
            Home
          </a>
          <a
            href="/explore"
            class="button-base flex items-center justify-center gap-3 bg-[#ff631a] text-white">
            <img src="/logos/dph.svg" alt="dph logo" class="h-4 self-center" />
            Explore Projects
          </a>
        </div>
        <p class="my-4 text-lg dark:text-zinc-100">
          Do you think something should be here? Report the issue!
        </p>
        <div class="grid-auto-fit-2md grid gap-4">
          <a
            href="https://discord.datapackhub.net"
            class="button-base flex items-center justify-center gap-3 bg-[#5865F2] text-white">
            <img
              src="/logos/discord-white.svg"
              alt="discord logo"
              class="h-4 self-center" />
            Discord
          </a>
          <a
            href="https://github.com/Datapack-Hub/api"
            class="button-base flex items-center justify-center gap-3 bg-black text-white">
            <img
              src="/logos/github-white.svg"
              alt="github logo"
              class="h-4 self-center" />
            API Repo
          </a>
          <a
            href="https://github.com/Datapack-Hub/frontend"
            class="button-base flex items-center justify-center gap-3 bg-black text-white">
            <img
              src="/logos/github-white.svg"
              alt="github logo"
              class="h-4 self-center" />
            Site Repo
          </a>
        </div>

        <!-- Internal Server Error -->
      {:else if STATUS == 500}
        <p class="mb-4 text-lg dark:text-zinc-100">
          You can check our discord server for updates, if you want.
        </p>
        <div class="grid-auto-fit-2md grid gap-4">
          <a
            href="https://discord.datapackhub.net"
            class="button-base flex items-center justify-center gap-3 bg-[#5865F2] text-white">
            <img
              src="/logos/discord-white.svg"
              alt="discord logo"
              class="h-4 self-center" />
            Discord
          </a>
        </div>

        <!-- default -->
      {:else}
        <div class="grid-auto-fit-2md grid gap-4">
          <a
            href="https://discord.datapackhub.net"
            class="button-base flex items-center justify-center gap-3 bg-[#5865F2] text-white">
            <img
              src="/logos/discord-white.svg"
              alt="discord logo"
              class="h-4 self-center" />
            Discord
          </a>
          <a
            href="https://github.com/Datapack-Hub/api"
            class="button-base flex items-center justify-center gap-3 bg-black text-white">
            <img
              src="/logos/github-white.svg"
              alt="github logo"
              class="h-4 self-center" />
            API Repo
          </a>
          <a
            href="https://github.com/Datapack-Hub/frontend"
            class="button-base flex items-center justify-center gap-3 bg-black text-white">
            <img
              src="/logos/github-white.svg"
              alt="github logo"
              class="h-4 self-center" />
            Site Repo
          </a>
        </div>
      {/if}
    </div>
  </div>
</main>
