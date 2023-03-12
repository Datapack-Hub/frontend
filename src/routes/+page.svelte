<script lang="ts">
  import { onMount } from "svelte";
  import ButtonPrimary from "$components/buttons/ButtonLink.svelte";
  import anime from "animejs/lib/anime.es";

  let rand = Math.floor(Math.random() * 10_000_000);
  let formattedRand = Intl.NumberFormat("en", {
    notation: "compact",
  }).format(rand);

  let visible = false;

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

<main class="h-screen">
  <div class="dark:bg-stone-900 bg-newWhite transition-all">
    <div
      class="flex flex-col items-center justify-center h-screen w-screen overflow-visible"
    >
      <div class="relative w-full h-[4.5rem] md:h-24 lg:h-32 xl:h-40 {visible ? "visible" : "invisible"}">
        <h1
          id="indexText1"
          class="split-text text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-brand font-bold inline-block overflow-y-hidden absolute top-0 left-1/2 w-1/2 -translate-x-1/2 text-center"
        >
          <span class="letters text-dphOrange inline-block">Explore</span>
        </h1>
        <h1
          id="indexText2"
          class="split-text text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-brand font-bold inline-block overflow-y-hidden absolute top-0 left-1/2 w-1/2 -translate-x-1/2 text-center"
        >
          <span class="letters text-dphOrange inline-block">Create</span>
        </h1>
        <h1
          id="indexText3"
          class="split-text text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-brand font-bold inline-block overflow-y-hidden absolute top-0 left-1/2 w-1/2 -translate-x-1/2 text-center"
        >
          <span class="letters text-dphOrange inline-block">Play</span>
        </h1>
      </div>
      <p
        class="dark:text-newWhite text-black w-2/3 md:w-1/2 lg:w-1/3 mt-12 text-center sm:text-2xl md:text-3xl lg:text-4xl"
      >
        Over <span
          title={rand.toString()}
          class="font-bold text-gradient from-pink-600 to-yellow-400 bg-gradient-to-br"
        >
          {formattedRand}
        </span>
        of the latest and best datapacks from creators across the globe
      </p>
      <div
        class="flex w-2/3 md:w-1/2 lg:w-1/2 items-center justify-evenly mt-8 md:mt-16"
      >
        <ButtonPrimary>Text Here</ButtonPrimary>
        <ButtonPrimary>Discover</ButtonPrimary>
      </div>
    </div>
  </div>
</main>
