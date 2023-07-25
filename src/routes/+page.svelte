<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import anime from "animejs";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import IconDiscord from "~icons/tabler/BrandDiscord.svelte";

  let compactNumberFormatter = Intl.NumberFormat("en", { notation: "compact" });

  let visible = false;
  let width: number;

  export let data: PageData;

  onMount(() => {
    let cyclingTextWrapper = document.querySelectorAll(".split-text .letters");
    cyclingTextWrapper.forEach(el => {
      el.innerHTML =
        el.textContent?.replace(/\S/g, "<span class='letter'>$&</span>") ?? "";
    });

    let fadingTextElements = document.querySelectorAll(".fadeTextAnime");

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

    let intersect = new IntersectionObserver(e => {
      e.forEach((entry, i) => {
        if (entry.isIntersecting) {
          anime({
            autoplay: true,
            targets: entry.target,
            opacity: 1,
            delay: (i + 1) * 200
          });
        } else {
          anime({ autoplay: true, targets: entry.target, opacity: 0 });
        }
      });
    });

    fadingTextElements.forEach(e => intersect.observe(e));
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

<main
  id="main-content"
  class="bg-slate-50 transition-all dark:bg-stone-900 h-full">
  <div class="pt-0 md:pt-20"></div>
  <div
    class="moderation mx-0 sm:mx-8 md:mx-16 lg:mx-24 dark:text-white p-2 rounded-lg">
    <b class="text-lg mb-2">Datapack Hub is in early beta.</b><br />
    Many features are incomplete or do not work as expected. In these early stages,
    there is likely going to be lots of downtime. All projects will stay after the
    beta period, unless you don't want that.
  </div>
  <div class="pt-20 lg:pt-0"></div>
  <div
    class="flex h-[75vh] w-full flex-col items-center justify-start overflow-visible px-0 sm:px-8 md:flex-row md:justify-between md:px-16 lg:px-24">
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
        class="w-full text-center text-xl text-slate-950 dark:text-slate-100 sm:text-xl md:w-auto md:text-left md:text-2xl xl:text-3xl">
        Over <span
          title="{(data.count - 1).toString()}"
          class="text-gradient bg-gradient-to-br from-rose-500 to-yellow-500 font-bold">
          {compactNumberFormatter.format(data.count - 1)}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
    </div>
    <div
      class="mt-8 h-fit justify-between space-y-3 overflow-y-none rounded-xl px-4 sm:my-16 md:my-0 md:w-1/2">
      <h3
        class=" text-2xl font-medium text-slate-950 dark:text-slate-100 text-center mt-6">
        Featured Projects
      </h3>
      <div use:autoAnimate>
        {#each data.featured.splice(0, 2) as randProj}
          <FeaturedProjectComponent project="{randProj}" type="featured" />
        {/each}
        {#each data.random.splice(0, 1) as randProj}
          <FeaturedProjectComponent project="{randProj}" type="random" />
        {/each}
      </div>
      <div></div>
    </div>
  </div>
  <div
    class="w-full bg-stone-800 h-[60vh] flex flex-col justify-center items-center">
    <h1 class="fadeTextAnime text-white w-full text-center text-7xl">
      The Go-To Platform for Datapacks
    </h1>
    <ul class="mt-6">
      <li
        class="opacity-0 fadeTextAnime list-disc text-white text-3xl my-4 font-light">
        Automatic Pack Optimization
      </li>
      <li
        class="opacity-0 fadeTextAnime list-disc text-white text-3xl my-4 font-light">
        No more "made for an older version"
      </li>
      <li
        class="opacity-0 fadeTextAnime list-disc text-white text-3xl my-4 font-light">
        Strong Moderation
      </li>
      <li
        class="opacity-0 fadeTextAnime list-disc text-white text-3xl my-4 font-light">
        Engaging, growing community
      </li>
      <li
        class="opacity-0 fadeTextAnime list-disc text-white text-3xl my-4 font-light">
        Project featuring
      </li>
      <li class="opacity-0 fadeTextAnime text-white text-3xl my-4 font-light">
        ...And More!
      </li>
    </ul>
    <Button click="/projects" style="alt" classes="fadeTextAnime"
      >Explore our Collection</Button>
  </div>
  <div class="py-32 flex items-center flex-col">
    <h1 class="fadeTextAnime text-white w-full text-center text-5xl">
      Join our community
    </h1>
    <p class="text-center text-white w-2/3 mt-6">
      Join our Discord server to get help with the website, support for making
      datapacks, and to be a part of the community!
    </p>
    <a
      class="flex rounded-lg p-2 bg-[#5865F2] text-white font-bold items-center mt-6"
      href="https://api.datapackhub.net/auth/login/discord">
      <p>
        <img
          src="/logos/discord-white.svg"
          alt="discord logo"
          class="inline-block mr-2"
          height="16"
          width="16" />Join us now!
      </p>
    </a>
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
