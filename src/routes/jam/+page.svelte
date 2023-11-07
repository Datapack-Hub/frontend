<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<svelte:head>
  <title>Datapack Jam | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 transition-all dark:bg-zinc-900 lg:px-16 xl:px-32">
  <div
    class="h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-32">
    <h1
      class="mt-8 pb-2 text-center text-5xl font-bold text-zinc-950 dark:text-white md:text-start md:text-5xl lg:text-6xl">
      Join <span class="text-dph-orange">Datapack Jam</span>
    </h1>
    <p in:fly="{{ x: -200 }}" class=" text-lg dark:text-white">
      Datapack Jam is a monthly competition where you're tasked to create a
      datapack around a theme, in a set period of time.
    </p>
    <h2 class=" mt-3 text-2xl font-bold dark:text-white">How does it work?</h2>
    <p in:fly="{{ x: -200 }}" class=" text-lg dark:text-white">
      You have one week to create a datapack. A countdown to the start can be
      seen below this post. Around that time, the theme will be revealed and you
      can start making your datapacks! Then, enter it into the jam using the
      button by the countdown.
    </p>
  </div>
</main>
