<script lang="ts">
    import { error } from '@sveltejs/kit';
    import { isAuthenticated, userData } from "$globals";
    import type { PageData } from "../edit/$types";
  
    function titleCase(str: string): string {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }
  </script>
  
  <svelte:head>
    <title>Profile Settings | Datapack Hub</title>
  </svelte:head>
  
  <main
    class="dark:bg-stone-900 bg-newWhite transition-all px-4 lg:px-32 xl:px-64"
  >
  <div class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10" >
    <h1 class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-10">
        Profile Settings for <span class="{$userData.role}-text">{$userData.username}</span>
    </h1>
    <div class="align-middle text-center md:text-start">
      <p class="align-middle dark:text-newWhite font-brand">Username</p>
      <input class="dark:bg-stone-800 bg-darkWhite rounded-md dark:text-white h-10 text-lg p-2 font-brand" value={$userData.username}/>
      <br /><br />
      <p class="align-middle dark:text-newWhite font-brand">Bio</p>
      <textarea class="dark:bg-stone-800 bg-darkWhite rounded-md dark:text-white h-40 w-80 text-lg p-2 font-brand resize-none" value={$userData.bio.replaceAll("\\n","\n")}/>
      <br /><br />
      <a
          href= "{$userData.username}/edit/"
          class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 md:py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2"
        >
          Save Changes
        </a>
    </div>
  </div>
  </main>
  
  <style lang="postcss">
    .admin-outline {
      @apply outline-red-500;
    }
  
    .admin-text {
      @apply text-red-500;
    }
  
    .moderator-outline {
      @apply outline-orange-500;
    }
  
    .moderator-text {
      @apply text-orange-500;
    }
  
    .developer-outline {
      @apply outline-lime-500;
    }
  
    .developer-text {
      @apply text-lime-500;
    }
  
    .helper-outline {
      @apply outline-blue-500;
    }
  
    .helper-text {
      @apply text-blue-500;
    }
  
    .default-outline {
      @apply outline-yellow-500;
    }
  
    .default-text {
      @apply text-yellow-500;
    }
  </style>
  