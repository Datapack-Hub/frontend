<script lang="ts">
  import { onMount } from "svelte";
  import anime from "animejs";
  import { fade } from "svelte/transition";

  let rawRand = Math.floor(Math.random() * 10_000_000);
  let rand = Intl.NumberFormat("en", { notation: "compact" }).format(rawRand);

  let visible = false;
  let width: number;

  onMount(async () => {
    let textWrapper = document.querySelectorAll(".split-text .letters");
    textWrapper.forEach((el) => {
      el.innerHTML = el.textContent!.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
    });

    anime
      .timeline({ loop: true, autoplay: true })
      .add({
        targets: "#indexText1 .letter",
        translateY: ["1.1em", 0],
        duration: 750,
        delay: (_el, i) => 50 * i,
      })
      .add({
        targets: "#indexText1",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      })
      .add({
        targets: "#indexText2 .letter",
        translateY: ["1.1em", 0],
        duration: 750,
        delay: (_el, i) => 50 * i,
      })
      .add({
        targets: "#indexText2",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      })
      .add({
        targets: "#indexText3 .letter",
        translateY: ["1.1em", 0],
        duration: 750,
        delay: (_el, i) => 50 * i,
      })
      .add({
        targets: "#indexText3",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
    visible = true;
  });
</script>

<svelte:head>
  <title>Datapack Hub</title>
  <meta
    name="description"
    content="DatapackHub is a website designed for publishing datapacks" />
</svelte:head>

<svelte:window bind:innerWidth="{width}" />

<main class="bg-pearl-lusta-100 transition-all dark:bg-stone-900">
  <div
    class="flex h-[75vh] w-full -translate-y-20 flex-col items-center justify-start overflow-visible px-0 sm:px-8 md:translate-y-0 md:flex-row md:justify-between md:px-16 lg:px-24">
    <div class="w-2/3 md:w-3/5 lg:w-2/5">
      <div
        class="relative mb-4 h-36 w-full md:mb-0 {visible
          ? 'visible'
          : 'invisible'}">
        <h1
          id="indexText1"
          class="split-text absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center font-brand text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl">
          <span class="letters inline-block text-dph-orange">Explore</span>
        </h1>
        <h1
          id="indexText2"
          class="split-text absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center font-brand text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl">
          <span class="letters inline-block text-dph-orange">Create</span>
        </h1>
        <h1
          id="indexText3"
          class="split-text absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center font-brand text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl">
          <span class="letters inline-block text-dph-orange">Play</span>
        </h1>
      </div>
      <h2
        class="w-full text-center text-xl text-pearl-lusta-950 dark:text-pearl-lusta-100 sm:text-xl md:w-auto md:text-left md:text-2xl xl:text-3xl">
        Over <span
          title="{rawRand.toString()}"
          class="text-gradient bg-gradient-to-br from-pink-600 to-yellow-400 font-bold">
          {rand}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
      <div
        class="mt-8 flex w-full items-center justify-evenly md:mt-16 md:w-64 md:justify-between">
        <a href="/projects" class="button-style">Discover</a>
        <a href="/projects" class="button-style">Explore</a>
      </div>
    </div>
    <div
      class="my-8 flex h-full w-4/5 flex-col justify-between rounded-xl bg-pearl-lusta-200 px-4 dark:bg-stone-800 sm:my-16 md:my-0 md:h-2/3 md:w-2/5">
      <h3 class="font-brand text-2xl font-bold text-pearl-lusta-100">
        Featured Datapack (WIP, not finished)
      </h3>
      <div
        class="border-1 my-1 flex w-full items-center rounded-xl border border-stone-600 bg-pearl-lusta-200 p-2 text-pearl-lusta-950 outline outline-2 outline-offset-4 outline-dph-orange dark:bg-stone-800 dark:text-white">
        <div class="absolute bg-dph-orange text-white p-1 -translate-y-[85px] rounded-t-md">Featured Datapack</div>
        <a
          href="/project/no"
          class="rounded-lg bg-pearl-lusta-300 dark:bg-stone-700 dark:text-pearl-lusta-100">
          <img
            src="https://static.planetminecraft.com/files/avatar/3183322_24.jpg"
            alt="silabear icon"
            class="aspect-square w-20 rounded-lg bg-cover" />
        </a>
        <div class="ml-4 w-2/3">
          <a
            href="/project/no"
            class="font-brand text-lg hover:underline md:text-xl lg:text-2xl">
            Totally real Datapack
          </a>
          {#if visible}
            <a
              href="/user/silabear"
              class="text-xs text-pearl-lusta-950 text-opacity-40 hover:underline dark:text-white dark:hover:text-pearl-lusta-100 md:text-sm"
              in:fade="{{ duration: 250 }}">
              By Sillybear
            </a>
          {/if}
          <p
            class=" mt-2 line-clamp-2 text-sm font-medium text-pearl-lusta-950 text-opacity-70 dark:text-pearl-lusta-100 md:text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
            voluptatum eligendi vero dignissimos, eum ratione, excepturi rerum
            dolore autem harum id. Atque veritatis, ad rerum aut suscipit
            incidunt harum delectus.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  </div>
  <div class="h-[33.333vh] w-full bg-pearl-lusta-200 dark:bg-stone-800">
    <h2>Content here</h2>
  </div>
</main>

<style lang="postcss">
  .text-gradient {
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    @apply bg-gradient-to-br from-pink-700 to-dph-orange;
  }
</style>
