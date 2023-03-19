<script lang="ts">
  import { onMount } from "svelte";
  import ButtonPrimary from "$components/buttons/ButtonLink.svelte";
  import anime from "animejs/lib/anime.es";
  import { browser } from "$app/environment";

  let rand = Math.floor(Math.random() * 10_000_000);

  let formattedRand = Intl.NumberFormat("en", { notation: "compact" }).format(
    rand
  );

  let visible = false;
  let width: number

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
        delay: (el, i) => 50 * i,
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
        delay: (el, i) => 50 * i,
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
        delay: (el, i) => 50 * i,
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
</svelte:head>

<svelte:window bind:innerWidth={width}/>

<main class="dark:bg-stone-900 bg-newWhite transition-all">
  <div class="flex md:flex-row flex-col justify-start items-center w-screen overflow-visible px-0 sm:px-8 md:px-16 lg:px-24 h-[66.666vh]">
    <div class="md:w-3/5 lg:w-2/5 w-2/3 mt-16 md:mt-0">
      <div
        class="relative w-full h-[4.5rem] md:h-24 lg:h-32 xl:h-40 {visible
          ? 'visible'
          : 'invisible'}"
      >
        <h1
          id="indexText1"
          class="split-text text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-9xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"
        >
          <span class="letters text-dphOrange inline-block">Explore</span>
        </h1>
        <h1
          id="indexText2"
          class="split-text text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-9xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"
        >
          <span class="letters text-dphOrange inline-block">Create</span>
        </h1>
        <h1
          id="indexText3"
          class="split-text text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-9xl font-brand font-bold inline-block overflow-y-hidden absolute md:text-left md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 text-center w-full md:w-auto"
        >
          <span class="letters text-dphOrange inline-block">Play</span>
        </h1>
      </div>
      <h2
        class="dark:text-newWhite text-black mt-0 text-xl sm:text-2xl md:text-3xl xl:text-4xl md:text-left text-center w-full md:w-auto"
      >
        Over <span
          title={rand.toString()}
          class="font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br"
        >
          {formattedRand}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
      <div class="flex justify-evenly md:justify-start w-full items-center mt-8 md:mt-16">
        <ButtonPrimary>Text Here</ButtonPrimary>
        {#if width > 768}
          <div class="px-4" />
        {/if}
        <ButtonPrimary>Discover</ButtonPrimary>
      </div>
    </div>
    {#if width > 768}
      <div class="w-1/5" />
    {/if}
    <div class=" w-4/5 my-8 sm:my-16 md:mt-0 md:w-2/5 bg-stone-800 h-full md:h-2/3 rounded-xl">
      <h2>Content here</h2>
    </div>
  </div>
  <div class="bg-stone-800 h-[33.333vh] w-screen">
    <h2>Content here</h2>
  </div>
</main>
