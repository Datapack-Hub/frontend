<script lang="ts">
  import { onMount } from "svelte";
  import anime from "animejs";
  import FeaturedProjectComponent from "$lib/components/FeaturedProjectComponent.svelte";
  import { apiURL } from "$lib/globals/consts";
  import autoAnimate from "@formkit/auto-animate";
  import { browser } from "$app/environment";

  let rawRand = Math.floor(Math.random() * 10_000_000);
  let rand = Intl.NumberFormat("en", { notation: "compact" }).format(rawRand);

  let visible = false;
  let width: number;

  let proj: Project;

  proj = {
    ID: 1,
    author: 1,
    body: "actually very long description",
    category: "German",
    description:
      "This datapack makes dropped items appear realistic as if they were thrown onto the ground!",
    icon: "https://cdn.discordapp.com/attachments/723984082853298297/1076083669409730590/IMG_2434.png",
    title: "Realistic Item Drops",
    type: "datapack",
    updated: 0,
    uploaded: 0,
    url: "realistic-item-drops",
    status: "live",
    mod_message: null
  } as Project;

  let random: Project;
  onMount(async () => {
    if (browser) {
      let randomReq = await fetch(apiURL + "/projects/random");
      random = (await randomReq.json()) as Project;

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
  <div class="pt-20" />
  <div class="moderation mx-20 dark:text-white p-2 rounded-lg"><b class="text-lg">Datapack Hub is in early beta.</b> <div class="pt-1"/>Many features are incomplete or do not work as expected. In these early stages, there is likely going to be lots of downtime. All projects will stay after the beta period, unless you don't want that.</div>
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
          title="{rawRand.toString()}"
          class="text-gradient bg-gradient-to-br from-pink-600 to-yellow-400 font-bold">
          {rand}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
    </div>
    <div
      class="my-8 h-3/4 w-4/5 justify-between space-y-3 overflow-y-none rounded-xl px-4 sm:my-16 md:my-0 md:h-2/3 md:w-1/2">
      <h3
        class=" text-2xl font-medium text-pearl-lusta-950 dark:text-pearl-lusta-100 text-center my-6">
        Featured
      </h3>
      <div use:autoAnimate>
        {#if visible}
          <FeaturedProjectComponent project="{proj}" type="popular" />
          <FeaturedProjectComponent project="{proj}" type="featured" />
          {#if random}
            <FeaturedProjectComponent project="{random}" type="random" />
          {/if}
        {/if}
      </div>
      <div></div>
    </div>
  </div>
  <div class="h-screen w-full bg-pearl-lusta-200 dark:bg-stone-800">
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
