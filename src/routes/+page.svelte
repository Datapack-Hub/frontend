<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import { roles } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import anime from "animejs/lib/anime.es";
  import { title } from "radash";
  import { onMount } from "svelte";
  import tippy from "sveltejs-tippy";
  import IconArrow from "~icons/tabler/ArrowBigRightLinesFilled.svelte";
  import IconFile from "~icons/tabler/FileZip.svelte";
  import IconNoPhoto from "~icons/tabler/Polaroid.svelte";
  import IconX from "~icons/tabler/X.svelte";
  import type { PageData } from "./$types";

  let compactNumberFormatter = Intl.NumberFormat("en", { notation: "compact" });

  let visible = false;
  let width: number;

  let ran = false;

  export let data: PageData;

  onMount(async () => {
    let cyclingTextWrapper = document.querySelectorAll(".split-text .letters");
    let fadingTextElements = document.getElementsByClassName("fadeTextAnime");

    cyclingTextWrapper.forEach(el => {
      el.innerHTML =
        el.textContent?.replace(/\S/g, "<span class='letter'>$&</span>") ?? "";
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
        delay: 750
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
        delay: 750
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
        delay: 750
      });

    let intersect = new IntersectionObserver(e => {
      e.forEach((entry, i) => {
        if (
          entry.isIntersecting &&
          window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
        ) {
          anime({
            autoplay: true,
            targets: entry.target,
            opacity: 1,
            delay: i * 75
          });
        } else {
          anime({ autoplay: true, targets: entry.target, opacity: 0 });
        }
      });
    });

    for (let i = 0; i < fadingTextElements.length; i++) {
      const item = fadingTextElements.item(i);
      if (item !== null) intersect.observe(item);
    }

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
    class="flex h-screen md:h-[75vh] w-full flex-col items-center justify-start overflow-visible px-0 sm:px-8 md:flex-row md:justify-between md:px-16 lg:px-24">
    <div class="w-2/3 md:w-3/5 lg:w-2/5">
      <div
        class="relative mb-4 h-36 w-full md:mb-0 {visible
          ? 'visible'
          : 'invisible'}">
        <h1 id="indexText1" class="split-text appearing-text-styles">
          <span class="letters inline-block text-dph-orange">Explore</span>
        </h1>
        <h1 id="indexText2" class="split-text appearing-text-styles">
          <span class="letters inline-block text-dph-orange">Create</span>
        </h1>
        <h1 id="indexText3" class="split-text appearing-text-styles">
          <span class="letters inline-block text-dph-orange">Play</span>
        </h1>
      </div>
      <h2
        class="w-full text-center text-xl text-slate-950 dark:text-slate-100 sm:text-xl md:w-auto md:text-left md:text-2xl xl:text-3xl">
        Over <span
          title="{(data.count - 1).toString()}"
          class="text-dph-orange font-bold">
          {compactNumberFormatter.format(data.count - 1)}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
    </div>
    <div
      class="mt-8 h-fit justify-between space-y-3 overflow-x-clip overflow-y-auto rounded-xl px-4 sm:my-16 md:my-0 md:w-1/2">
      <h3
        class=" text-2xl font-medium text-slate-950 dark:text-slate-100 text-center mt-6">
        Featured Projects
      </h3>
      <div use:autoAnimate class="space-y-3">
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
    class="w-full bg-slate-200 dark:bg-stone-800/20 py-48 flex flex-col justify-center items-center">
    <h1
      class="fadeTextAnime font-bold text-black dark:text-white text-center text-4xl lg:text-5xl xl:text-6xl mx-4">
      The Go-To Platform for <span class="text-dph-orange">Datapacks</span>
    </h1>
    <div
      class="mt-6 grid grid-cols-1 lg:grid-cols-2 w-3/4 xl:w-2/3 2xl:w-1/2 gap-3">
      <div
        class="col-span-2 p-4 bg-slate-300 dark:bg-stone-800 rounded-lg w-full">
        <h2
          class="opacity-0 fadeTextAnime text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Easily find datapacks you'll like</b>
        </h2>
        <p
          class="fadeTextAnime text-black dark:text-white text-lg my-3 font-light">
          Easily discover amazing datapacks with our intuitive Explore page!
        </p>
        <div class="dark:bg-stone-900 rounded-xl p-3 mb-5 space-y-2">
          {#each data.random.slice(0, 2) ?? [] as rand}
            <div
              class="w-full items-center rounded-xl bg-slate-200 p-3 text-slate-950 dark:bg-stone-800 dark:text-slate-100">
              <div class="flex items-top">
                {#if rand.icon}
                  <img
                    src="{rand.icon}"
                    alt="{rand.title} icon"
                    width="96"
                    height="96"
                    loading="lazy"
                    class="aspect-square w-20 rounded-lg bg-cover" />
                {:else}
                  <IconNoPhoto width="48" height="48" />
                {/if}
                <div class="ml-4 w-3/4">
                  <a
                    href="/project/{rand.url}"
                    class=" text-lg hover:underline md:text-xl lg:text-2xl">
                    {rand.title}
                  </a>
                  <div
                    class="flex space-x-2 items-center text-xs text-slate-950/40 dark:text-slate-100">
                    <a href="/user/{rand.author.username}" class="block">
                      {rand.author.username}
                    </a>
                    <span>•</span>
                    <span>
                      {rand.latest_version?.version_code}
                    </span>
                    <span>•</span>
                    <span
                      >{rand.downloads ? rand.downloads : "0"} downloads</span>
                  </div>
                  <p
                    class="line-clamp-2 max-w-1/2 text-xs font-medium text-slate-950/40 dark:text-slate-100/40 mt-2">
                    {rand.description}
                  </p>
                </div>
              </div>
            </div>
          {/each}
        </div>
        <a
          class="rounded-lg p-2 mt-2 bg-dph-orange text-white font-medium"
          href="/projects">
          Find your next favourite datapack
        </a>
      </div>
      <div
        class="p-4 col-span-2 lg:col-auto row-span-2 bg-slate-300 dark:bg-stone-800 rounded-lg w-full">
        <h2
          class="opacity-0 fadeTextAnime text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>No more "made for older version"</b>
        </h2>
        <p
          class="fadeTextAnime text-black dark:text-white text-lg my-3 font-light">
          Datapack Hub automatically converts the pack version to the requested
          version, removing those pesky "Made for an older version" errors!
        </p>
        <div class="bg-slate-200 dark:bg-stone-900 rounded-lg p-4">
          <div
            class="flex items-center justify-between bg-slate-300 dark:bg-stone-800 rounded-t-md p-2 mx-4 mt-4 text-slate-600 dark:text-stone-500">
            <p>pack.mcmeta</p>
            <IconX />
          </div>
          <div
            class="text-slate-600 dark:text-stone-500 font-mono bg-slate-300 dark:bg-stone-800 mx-4 mb-4 my-2 px-4 rounded-b-md overflow-x-auto">
            <pre class="text-sm">
              <!--DO NOT INDENT!!!-->
&lbrace;
  "pack": &lbrace;
    "pack_format": <span class="text-red-500">7</span> -&gt; <span
                class="text-green-500 fadeTextAnime">9</span
              >,
    "description": "The timmy pack!"
  &rbrace;
&rbrace;
            </pre>
          </div>
        </div>
      </div>
      <div
        class="p-4 col-span-2 lg:col-auto bg-slate-300 dark:bg-stone-800 rounded-lg w-full">
        <h2
          class="opacity-0 fadeTextAnime text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Automatic ZIP Optimisation</b>
        </h2>
        <p
          class="fadeTextAnime text-black dark:text-white text-lg my-4 font-light">
          We use PackSquash in the background to reduce the size of files and
          make them run faster in-game!
        </p>
        <div
          class="bg-slate-200 dark:bg-stone-900 rounded-xl p-4 px-32 dark:text-white flex items-center">
          <div class="flex items-center relative space-x-3">
            <IconFile width="64" height="64" class="text-red-500" />
            <IconArrow width="32" height="32" />
            <IconFile width="32" height="32" class="text-green-500" />
          </div>
        </div>
      </div>
      <div
        class="p-4 col-span-2 lg:col-auto pb-0 bg-slate-300 dark:bg-stone-800 rounded-lg w-full">
        <h2
          class="opacity-0 fadeTextAnime text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Strong Moderation</b>
        </h2>
        <p
          class="fadeTextAnime text-black dark:text-white text-lg mt-3 font-light">
          Our amazing staff team work together to keep Datapack Hub the best and
          cleanest place to find datapacks!
        </p>
        <div class="flex py-4 space-x-1">
          {#each data.staff as staff}
            <a href="/user/{staff.username}">
              <img
                src="{staff.profile_icon}&size=64"
                alt="{staff.username}'s profile"
                use:tippy="{{
                  content: `${staff.username}<br /><span style='color: ${
                    $roles.find(v => v.name == staff.role)?.color
                  }; font-weight:600'>● ${title(staff.role)}</span>`,
                  placement: 'bottom',
                  interactive: true,
                  allowHTML: true
                }}"
                loading="lazy"
                width="48"
                height="48"
                class="h-auto md:h-12 rounded-md hover:scale-105 transition-all fadeTextAnime" />
            </a>
          {/each}
        </div>
      </div>
      <div
        class="p-4 col-span-2 lg:col-auto bg-slate-300 dark:bg-stone-800 rounded-lg w-full">
        <h2
          class="opacity-0 fadeTextAnime text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Awesome Community</b>
        </h2>
        <p
          class="fadeTextAnime text-black dark:text-white text-lg my-4 font-light">
          Join our Discord server to get help with the website, support for
          making datapacks, and to be a part of the community!
        </p>
        <a
          class="rounded-lg p-2 bg-[#5865F2] text-white font-bold"
          href="https://discord.gg/aEXsdjjdu4">
          <img
            src="/logos/discord-white.svg"
            alt="discord logo"
            class="inline-block mr-2"
            loading="lazy"
            height="16"
            width="16" />Join us now!
        </a>
      </div>
      <div
        class="p-4 col-span-2 lg:col-auto bg-slate-300 dark:bg-stone-800 rounded-lg w-full">
        <h2
          class="opacity-0 fadeTextAnime text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Project Featuring</b>
        </h2>
        <p
          class="fadeTextAnime text-black dark:text-white text-lg my-4 font-light">
          Our staff regularly feature cool projects to reach a wider audience!
        </p>
        {#each data.random.splice(0, 1) as randProj}
          <FeaturedProjectComponent project="{randProj}" type="featured" />
        {/each}
      </div>
      <div
        class="p-4 col-span-2 bg-slate-300 dark:bg-stone-800 rounded-lg w-full">
        <h2
          class="opacity-0 fadeTextAnime text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Public API</b>
        </h2>
        <p
          class="fadeTextAnime text-black dark:text-white text-lg my-4 font-light">
          Datapack Hub is ran entirely by an API which anyone can access.
        </p>
        <div class="bg-slate-200 dark:bg-stone-900 rounded-lg p-8">
          <div
            class="flex items-center justify-between space-x-2 bg-slate-300 dark:bg-stone-800 rounded-md p-2 text-slate-600 dark:text-stone-500">
            <div class="flex space-x-2">
              <p class="text-green-500">GET</p>
              <p>https://api.datapackhub.net/user/silabear</p>
            </div>
            <button
              class="bg-green-500 text-white rounded-md px-2 py-1 cursor-pointer"
              on:click="{() => (ran = true)}">Run</button>
          </div>
          <div
            class="text-slate-600 dark:text-stone-300 font-mono mt-2 bg-slate-300 dark:bg-stone-800 rounded-md overflow-x-auto h-80">
            {#if ran}
              <pre class="text-sm p-4">
<!--DO NOT INDENT!!!-->&lbrace;
  "badges": [
    "contributor",
    "betatester",
    "bugfinder",
    "nerd"
  ],
  "bio": "`const silabear = new Silabear(he/him)`\n\nI\u2019m an owne...",
  "id": 1,
  "profile_icon": "https://avatars.githubusercontent.com/u/56885288?v=4",
  "role": "admin",
  "username": "Silabear"
&rbrace;      </pre>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <Button click="/projects" style="alt" classes="fadeTextAnime mt-2"
      >Explore datapacks</Button>
  </div>
</main>

<style lang="postcss">
  .appearing-text-styles {
    @apply absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl;
  }
</style>
