<script lang="ts">
  import { browser } from "$app/environment";
  import FeaturedProjectComponent from "$lib/components/FeaturedProjectComponent.svelte";
  import { apiURL } from "$lib/globals/consts";
  import type { Project } from "$lib/globals/schema";
  import { projectSchema } from "$lib/globals/schema";
  import autoAnimate from "@formkit/auto-animate";
  import anime from "animejs";
  import { onMount } from "svelte";

  let rawRand = Math.floor(Math.random() * 10_000_000);
  let compactNumberFormatter = Intl.NumberFormat("en", { notation: "compact" });
  let rand = compactNumberFormatter.format(rawRand);

  let visible = false;
  let width: number;
  let count = 0;

  let random: Project[] = [];

  onMount(async () => {
    if (browser) {
      let randomReq = await fetch(apiURL + "/projects/random?count=3");
      random = await projectSchema
        .array()
        .parseAsync((await randomReq.json()).result);

      let countRes = await fetch(apiURL + "/projects/count");
      count = (await countRes.json()).count;

      let textWrapper = document.querySelectorAll(".split-text .letters");
      textWrapper.forEach(el => {
        el.innerHTML =
          el.textContent?.replace(/\S/g, "<span class='letter'>$&</span>") ??
          "";
      });

      anime
        .timeline({ loop: true, autoplay: true })
        .add({
          targets: "#indexText1 .letter",
          translateY: ["1.1em", 0],
          duration: 750,
          delay: (_el, i) => 50 * i
        })
        .add({
          targets: "#indexText1",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        })
        .add({
          targets: "#indexText2 .letter",
          translateY: ["1.1em", 0],
          duration: 750,
          delay: (_el, i) => 50 * i
        })
        .add({
          targets: "#indexText2",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        })
        .add({
          targets: "#indexText3 .letter",
          translateY: ["1.1em", 0],
          duration: 750,
          delay: (_el, i) => 50 * i
        })
        .add({
          targets: "#indexText3",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        });
      visible = true;
    }
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
  <div class="pt-0 md:pt-20"></div>
  <div
    class="moderation mx-0 sm:mx-8 md:mx-16 lg:mx-24 dark:text-white p-2 -translate-y-20 md:translate-y-0 rounded-lg">
    <b class="text-lg">Datapack Hub is in early beta.</b>
    <div class="pt-1"></div>
    Many features are incomplete or do not work as expected. In these early stages,
    there is likely going to be lots of downtime. All projects will stay after the
    beta period, unless you don't want that.
  </div>
  <div class="pt-20 lg:pt-0"></div>
  <div
    class="flex h-[75vh] w-full -translate-y-20 flex-col items-center justify-start overflow-visible px-0 sm:px-8 md:translate-y-0 md:flex-row md:justify-between md:px-16 lg:px-24">
    <div class="w-2/3 md:w-3/5 lg:w-2/5">
      <div
        class="relative mb-4 h-36 w-full md:mb-0 {visible
          ? 'visible'
          : 'invisible'}">
        <h1
          id="indexText1"
          class="split-text absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl">
          <span class="letters inline-block text-dph-orange">Explore</span>
        </h1>
        <h1
          id="indexText2"
          class="split-text absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl">
          <span class="letters inline-block text-dph-orange">Create</span>
        </h1>
        <h1
          id="indexText3"
          class="split-text absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl">
          <span class="letters inline-block text-dph-orange">Play</span>
        </h1>
      </div>
      <h2
        class="w-full text-center text-xl text-pearl-lusta-950 dark:text-pearl-lusta-100 sm:text-xl md:w-auto md:text-left md:text-2xl xl:text-3xl">
        Over <span
          title="{rand}"
          class="text-gradient bg-gradient-to-br from-rose-500 to-yellow-500 font-bold">
          {compactNumberFormatter.format(count)}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
    </div>
    <div
      class="mt-8 h-fit justify-between space-y-3 bg-pearl-lusta-200 dark:bg-stone-800 overflow-y-none rounded-xl px-4 sm:my-16 md:my-0 md:w-1/2">
      <h3
        class=" text-2xl font-medium text-pearl-lusta-950 dark:text-pearl-lusta-100 text-center mt-6">
        Featured Projects
      </h3>
      <p class="text-pearl-lusta-950 dark:text-pearl-lusta-100 text-center">
        Featured projects are coming soon! In the meantime, here's some random
        projects to check out:
      </p>
      <div use:autoAnimate>
        {#each random as randProj}
          <FeaturedProjectComponent project="{randProj}" type="random" />
        {/each}
      </div>
      <div></div>
    </div>
  </div>
  <div class="py-64"></div>
  <!-- <div class="h-screen w-full bg-pearl-lusta-200 dark:bg-stone-800">
    <h2>Content here</h2>
  </div> -->
</main>

<style lang="postcss">
  .text-gradient {
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    @apply bg-gradient-to-br from-pink-700 to-dph-orange;
  }
</style>
