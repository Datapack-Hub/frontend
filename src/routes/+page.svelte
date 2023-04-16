<script lang="ts">
  import { onMount } from "svelte";
  import ButtonPrimary from "$components/interactable/buttons/ButtonLink.svelte";
  import anime from "animejs";

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

<main class="bg-new-white transition-all dark:bg-stone-900">
  <div
    class="flex h-[66.666vh] w-full flex-col items-center justify-start overflow-visible px-0 sm:px-8 md:flex-row md:px-16 lg:px-24">
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
        class="w-full text-center text-xl text-black dark:text-new-white sm:text-xl md:w-auto md:text-left md:text-2xl xl:text-3xl">
        Over <span
          title="{rawRand.toString()}"
          class="text-gradient bg-gradient-to-br from-pink-600 to-yellow-400 font-bold">
          {rand}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
      <div
        class="mt-8 flex w-full items-center justify-evenly md:mt-16 md:justify-start">
        <ButtonPrimary>Play Now</ButtonPrimary>
        {#if width > 768}
          <div class="px-4"></div>
        {/if}
        <ButtonPrimary>Discover</ButtonPrimary>
      </div>
    </div>
    {#if width > 768}
      <div class="w-1/5"></div>
    {/if}
    <div
      class=" my-8 h-full w-4/5 rounded-xl bg-dark-white dark:bg-stone-800 sm:my-16 md:mt-0 md:h-2/3 md:w-2/5">
      <h2>Content here</h2>
    </div>
  </div>
  <div class="h-[33.333vh] w-full bg-dark-white dark:bg-stone-800">
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
