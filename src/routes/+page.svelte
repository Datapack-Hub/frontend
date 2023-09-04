<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import type { FeaturedProjectTypes as FeaturedProjectType } from "$lib/globals/consts";
  import type { Project } from "$lib/globals/schema";
  import anime from "animejs";
  import { onMount } from "svelte";
  import IconArrow from "~icons/tabler/ArrowBigRightLinesFilled.svelte";
  import IconFile from "~icons/tabler/FileZip.svelte";
  import IconX from "~icons/tabler/X.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  let visible = false;
  // let apiExampleUser = "silabear";
  // let apiExampleResult = "";
  let featuredProjects: { type: FeaturedProjectType; project: Project }[] = [];

  featuredProjects = data.featured.map(project => ({
    type: "featured",
    project
  }));

  for (let index = 0; index < 4 - featuredProjects.length; index++) {
    featuredProjects.push({ type: "random", project: data.random[index] });
  }

  onMount(async () => {
    let cyclingTextWrapper = document.querySelectorAll(".split-text .letters");
    let fadingTextElements = document.querySelectorAll(".fadeTextAnime");

    for (const element of cyclingTextWrapper) {
      element.innerHTML = element.textContent!.replaceAll(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
    }

    anime
      .timeline({ loop: true, autoplay: true })
      .add({
        targets: "#indexText1 .letter",
        translateY: ["1.1em", 0],
        duration: 750,
        delay: (_element, index) => 50 * index
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
        delay: (_element, index) => 50 * index
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
        delay: (_element, index) => 50 * index
      })
      .add({
        targets: "#indexText3",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 750
      });

    visible = true;
    let intersect = new IntersectionObserver(entries => {
      for (const [index, entry] of entries.entries()) {
        if (entry.isIntersecting) {
          anime({
            autoplay: true,
            targets: entry.target,
            opacity: 1,
            delay: (index + 1) * 75
          });
        } else {
          anime({ autoplay: true, targets: entry.target, opacity: 0 });
        }
      }
    });

    for (const element of fadingTextElements) intersect.observe(element);
  });
</script>

<svelte:head>
  <title>Datapack Hub</title>
  <meta
    name="description"
    content="Datapack Hub is a website to find and download Minecraft datapacks. Join our datapacking discord" />
</svelte:head>

<main
  id="main-content"
  class="h-full bg-slate-50 transition-all dark:bg-zinc-900">
  <div class="py-12 md:py-0"></div>
  <section
    class="flex h-fit w-full flex-col items-center justify-start overflow-visible px-0 sm:px-4 md:h-[85vh] md:flex-row md:justify-between md:px-8 lg:px-16">
    <div class="w-full p-4 md:w-2/5">
      <div class="relative h-36 w-full">
        <h1
          id="indexText1"
          class="split-text appearing-text-styles {visible
            ? 'visible'
            : 'invisible'}">
          <span class="letters inline-block text-dph-orange">Explore</span>
        </h1>
        <h1
          id="indexText2"
          class="split-text appearing-text-styles {visible
            ? 'visible'
            : 'invisible'}">
          <span class="letters inline-block text-dph-orange">Create</span>
        </h1>
        <h1
          id="indexText3"
          class="split-text appearing-text-styles {visible
            ? 'visible'
            : 'invisible'}">
          <span class="letters inline-block text-dph-orange">Play</span>
        </h1>
      </div>
      <h2
        class="w-full text-center text-xl text-slate-950 dark:text-slate-100 sm:text-xl md:w-auto md:text-left md:text-2xl xl:text-3xl">
        Over <span
          title="{(data.count - 1).toString()}"
          class="font-bold text-dph-orange">
          {formatter.format(data.count - 1)}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
    </div>
    <section
      class="mt-8 h-fit justify-between space-y-3 overflow-y-auto overflow-x-clip rounded-xl px-4 md:w-1/2">
      <h3
        class=" mt-6 text-center text-2xl font-medium text-slate-950 dark:text-slate-100">
        Featured Projects
      </h3>
      <div class="space-y-3">
        {#each featuredProjects as proj}
          <FeaturedProjectComponent
            project="{proj.project}"
            type="{proj.type}" />
        {/each}
      </div>
      <h3 class="text-center">
        <Button style="hugh" classes="text-center" click="/projects"
          >Find more datapacks</Button>
      </h3>
      <div class="py-12 md:py-0"></div>
    </section>
  </section>
  <section
    class="flex w-full flex-col items-center justify-center bg-slate-200 py-32 dark:bg-zinc-800/20">
    <h1
      class="text-center text-4xl font-bold text-black dark:text-white lg:text-5xl xl:text-6xl">
      The Go-To Platform for <span class="text-dph-orange">Datapacks</span>
    </h1>
    <div
      class="mt-16 grid w-full grid-cols-1 gap-3 p-4 lg:w-3/4 lg:grid-cols-2 xl:w-3/4">
      <div
        class="fadeTextAnime col-span-2 w-full rounded-lg bg-slate-300 p-4 opacity-0 dark:bg-zinc-800">
        <h2
          class="fadeTextAnime text-lg text-black opacity-0 dark:text-white lg:text-xl xl:text-2xl">
          <b>Easily find datapacks you'll like</b>
        </h2>
        <p
          class="fadeTextAnime my-3 text-lg font-light text-pearl-lusta-950 opacity-0 dark:text-pearl-lusta-100">
          Easily discover amazing datapacks with our intuitive Explore page!
        </p>
        <div class="mb-5 space-y-2 rounded-xl p-3 dark:bg-zinc-900">
          {#each data.random.slice(2, 4) ?? [] as rand}
            <ProjectComponent project="{rand}" />
          {/each}
        </div>
        <Button click="/projects">Find your next favourite datapack</Button>
      </div>
      <div
        class="fadeTextAnime col-span-2 row-span-2 w-full rounded-lg bg-slate-300 p-4 opacity-0 dark:bg-zinc-800 lg:col-auto">
        <h2
          class="fadeTextAnime text-lg text-black opacity-0 dark:text-white lg:text-xl xl:text-2xl">
          <b>No more "made for older version"</b>
        </h2>
        <p
          class="fadeTextAnime my-3 text-lg font-light text-pearl-lusta-950 opacity-0 dark:text-pearl-lusta-100">
          Datapack Hub automatically converts the pack version to the requested
          version, removing those pesky "Made for an older version" errors!
        </p>
        <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-900">
          <div
            class="fadeTextAnime flex items-center justify-between rounded-t-md bg-slate-300 p-3 text-slate-600 opacity-0 dark:bg-zinc-800 dark:text-zinc-500">
            <p>pack.mcmeta</p>
            <IconX />
          </div>
          <div
            class="fadeTextAnime mt-2 overflow-x-auto rounded-b-md bg-slate-300 px-4 font-mono text-slate-600 opacity-0 dark:bg-zinc-800 dark:text-zinc-500">
            <pre class="text-sm">
              <!--DO NOT INDENT!!!-->
&lbrace;
  "pack": &lbrace;
    "pack_format": <span class="text-red-500">7</span> -&gt; <span
                class="text-green-500">9</span
              >,
    "description": "The timmy pack!"
  &rbrace;
&rbrace;
            </pre>
          </div>
        </div>
      </div>
      <div
        class="fadeTextAnime col-span-2 w-full rounded-lg bg-slate-300 p-4 opacity-0 dark:bg-zinc-800 lg:col-auto">
        <h2
          class="fadeTextAnime text-lg text-black opacity-0 dark:text-white lg:text-xl xl:text-2xl">
          <b>ZIP Optimisation</b>
        </h2>
        <p
          class="fadeTextAnime my-3 text-lg font-light text-pearl-lusta-950 opacity-0 dark:text-pearl-lusta-100">
          Uploaded files have the option to be optimised automatically with
          PackSquash!
        </p>
        <div
          class="flex items-center justify-center rounded-xl bg-slate-200 p-4 dark:bg-zinc-900 dark:text-white">
          <div class="relative flex items-center space-x-2">
            <IconFile width="48" height="48" class="text-red-500" />
            <IconArrow width="24" height="24" />
            <IconFile width="24" height="24" class="text-green-500" />
          </div>
        </div>
      </div>
      <div
        class="fadeTextAnime col-span-2 w-full rounded-lg bg-slate-300 p-4 pb-0 opacity-0 dark:bg-zinc-800 lg:col-auto">
        <h2
          class="fadeTextAnime text-lg text-black opacity-0 dark:text-white lg:text-xl xl:text-2xl">
          <b>Strong Moderation</b>
        </h2>
        <p
          class="mt-3 text-lg font-light text-pearl-lusta-950 dark:text-pearl-lusta-100">
          Our amazing staff team work together to keep Datapack Hub the best and
          cleanest place to find datapacks!
        </p>
        <div class="grid-auto-fit-xs grid gap-1 py-4 md:flex">
          {#each data.staff as staff}
            <a href="/user/{staff.username}">
              <img
                src="{staff.profile_icon}&size=64"
                alt="{staff.username}'s profile"
                title="{staff.username}"
                loading="lazy"
                width="48"
                height="48"
                class="aspect-square h-12 rounded-md transition-all hover:scale-105 md:h-auto" />
            </a>
          {/each}
        </div>
      </div>
      <div
        class="fadeTextAnime col-span-2 w-full rounded-lg bg-slate-300 p-4 opacity-0 dark:bg-zinc-800 lg:col-auto">
        <h2
          class="fadeTextAnime text-lg text-black opacity-0 dark:text-white lg:text-xl xl:text-2xl">
          <b>Awesome Community</b>
        </h2>
        <p
          class="fadeTextAnime my-4 text-lg font-light text-pearl-lusta-950 opacity-0 dark:text-pearl-lusta-100">
          Join our Discord server to get help with the website, support for
          making datapacks, and to be a part of the community!
        </p>
        <a
          class="rounded-lg bg-[#5865F2] p-3 font-bold text-white"
          href="https://discord.datapackhub.net">
          <img
            src="/logos/discord-white.svg"
            alt="discord logo"
            class="mr-2 inline-block"
            loading="lazy"
            height="16"
            width="16" />Join us now!
        </a>
      </div>
      <div
        class="fadeTextAnime col-span-2 w-full rounded-lg bg-slate-300 p-4 opacity-0 dark:bg-zinc-800 lg:col-auto">
        <h2
          class="fadeTextAnime text-lg text-black opacity-0 dark:text-white lg:text-xl xl:text-2xl">
          <b>Project Featuring</b>
        </h2>
        <p
          class="fadeTextAnime my-4 text-lg font-light text-pearl-lusta-950 opacity-0 dark:text-pearl-lusta-100">
          Our staff regularly feature cool projects to reach a wider audience!
        </p>
        {#each data.random.splice(4, 1) as randProj}
          <FeaturedProjectComponent project="{randProj}" type="featured" />
        {/each}
      </div>
      <!-- <div
        class="fadeTextAnime opacity-0 p-4 col-span-2 bg-slate-300 dark:bg-zinc-800 rounded-lg w-full">
        <h2
          class="fadeTextAnime opacity-0 text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Public API</b>
        </h2>
        <p
          class="fadeTextAnime opacity-0 text-pearl-lusta-950 dark:text-pearl-lusta-100 text-lg my-4 font-light">
          Datapack Hub is ran entirely by an API which anyone can access.
        </p>
        <div class="bg-slate-200 dark:bg-zinc-900 rounded-xl p-3">
          <div
            class="flex items-center justify-between space-x-2 bg-slate-300 dark:bg-zinc-800 rounded-t-md p-3 text-slate-600 dark:text-zinc-500">
            <div class="flex space-x-2 overflow-x-auto">
              <p class="text-green-600">GET</p>
              <span class="overflow-hidden text-ellipsis">
                https://api.datapackhub.net/user/<AutoAdjustableInput
                  on:change="{event => (apiExampleUser = event.detail)}"
                  classes="bg-transparent text-slate-600 dark:text-zinc-500"
                  defaultValue="silabear" />
              </span>
            </div>
            <button
              class="button-base text-slate-950 dark:text-slate-100 bg-green-600 text-white"
              on:click="{apiExampleRun}">Run</button>
          </div>
          <div
            class="text-slate-600 dark:text-zinc-500 font-mono mt-2 bg-slate-300 dark:bg-zinc-800 rounded-b-md overflow-clip h-80 overflow-y-auto">
            {#if apiExampleResult.length > 0}
              <pre
                class="text-sm p-3 whitespace-pre-wrap"
                transition:fade="{{ duration: 300, easing: quintInOut }}">
{apiExampleResult}
              </pre>
            {/if}
          </div>
        </div>
      </div>
    </div> -->
    </div>
  </section>
</main>

<style lang="postcss">
  .appearing-text-styles {
    @apply absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center text-7xl font-bold md:left-0 md:w-full md:translate-x-0 md:text-left lg:text-6xl xl:text-8xl;
  }
</style>
