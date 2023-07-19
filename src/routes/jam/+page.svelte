<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<svelte:head>
  <title>Datapack Jam | Datapack Hub</title>
</svelte:head>

<main class=" bg-slate-50 transition-all dark:bg-stone-900 lg:px-16 xl:px-32">
  <div
    class="h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-2 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-5xl lg:text-6xl">
      Join <span class="text-dph-orange">Datapack Jam</span>
    </h1>
    <p in:fly="{{ x: -200 }}" class=" dark:text-white text-lg">
      Datapack Jam is a monthly competition where you're tasked to create a
      datapack around a theme, in a set period of time.
    </p>
    <h2 class=" dark:text-white text-2xl mt-3 font-bold">How does it work?</h2>
    <p in:fly="{{ x: -200 }}" class=" dark:text-white text-lg">
      You have one week to create a datapack. A countdown to the start can be
      seen below this post. Around that time, the theme will be revealed and you
      can start making your datapacks! Then, enter it into the jam using the
      button by the countdown.
    </p>
  </div>
</main>
