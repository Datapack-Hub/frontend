<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import FeaturedProjectComponent from "$lib/components/project/FeaturedProjectComponent.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import { roles } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import anime from "animejs";
  import { title } from "radash";
  import { onMount } from "svelte";
  import tippy from "sveltejs-tippy";
  import IconArrow from "~icons/tabler/ArrowBigRightLinesFilled.svelte";
  import IconFile from "~icons/tabler/FileZip.svelte";
  import IconX from "~icons/tabler/X.svelte";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  export let data: PageData;

  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  let width: number;
  let visible = false;
  // let apiExampleUser = "silabear";
  // let apiExampleResult = "";

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

  // async function apiExampleRun() {
  //   let exampleResponse = await fetch(API + "/user/" + apiExampleUser);
  //   let exampleJson = await exampleResponse.json();
  //   apiExampleResult = JSON.stringify(exampleJson, undefined, 2);
  // }
</script>

<svelte:head>
  <title>Datapack Hub</title>
  <meta
    name="description"
    content="Datapack Hub is a website to find and download Minecraft datapacks. Join our datapacking discord" />
</svelte:head>

<svelte:window bind:innerWidth="{width}" />

<main
  id="main-content"
  class="bg-slate-50 transition-all dark:bg-zinc-900 h-full">
  <div class="pt-0 md:pt-12"></div>

  <div class="pt-20 lg:pt-0"></div>
  <section
    class="flex h-screen md:h-[75vh] w-full flex-col items-center justify-start overflow-visible px-0 sm:px-8 md:flex-row md:justify-between md:px-16 lg:px-24">
    <div class="w-2/3 md:w-3/5 lg:w-2/5">
      <div class="relative mb-4 h-36 w-full md:mb-0">
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
          class="text-dph-orange font-bold">
          {formatter.format(data.count - 1)}
        </span>
        of the latest and best datapacks from creators across the globe
      </h2>
    </div>
    <section
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
      <h3 class="text-center">
        <Button
          style="hugh"
          classes="text-center"
          click="{() => goto('/projects')}">Find more datapacks</Button>
      </h3>
      <div></div>
    </section>
  </section>
  <section
    class="w-full bg-slate-200 dark:bg-zinc-800/20 flex flex-col justify-center items-center py-32">
    <h1
      class="font-bold text-black dark:text-white text-center text-4xl lg:text-5xl xl:text-6xl">
      The Go-To Platform for <span class="text-dph-orange">Datapacks</span>
    </h1>
    <div
      class="mt-16 grid grid-cols-1 lg:grid-cols-2 p-4 w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 gap-3">
      <div
        class="fadeTextAnime opacity-0 col-span-2 p-4 bg-slate-300 dark:bg-zinc-800 rounded-lg w-full">
        <h2
          class="fadeTextAnime opacity-0 text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Easily find datapacks you'll like</b>
        </h2>
        <p
          class="fadeTextAnime opacity-0 text-pearl-lusta-950 dark:text-pearl-lusta-100 text-lg my-3 font-light">
          Easily discover amazing datapacks with our intuitive Explore page!
        </p>
        <div class="dark:bg-zinc-900 rounded-xl p-3 mb-5 space-y-2">
          {#each data.random.slice(0, 2) ?? [] as rand}
            <ProjectComponent project="{rand}" />
          {/each}
        </div>
        <Button click="/projects">Find your next favourite datapack</Button>
      </div>
      <div
        class="fadeTextAnime opacity-0 p-4 col-span-2 lg:col-auto row-span-2 bg-slate-300 dark:bg-zinc-800 rounded-lg w-full">
        <h2
          class="fadeTextAnime opacity-0 text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>No more "made for older version"</b>
        </h2>
        <p
          class="fadeTextAnime opacity-0 text-pearl-lusta-950 dark:text-pearl-lusta-100 text-lg my-3 font-light">
          Datapack Hub automatically converts the pack version to the requested
          version, removing those pesky "Made for an older version" errors!
        </p>
        <div class="bg-slate-200 dark:bg-zinc-900 rounded-xl p-2">
          <div
            class="fadeTextAnime opacity-0 flex items-center justify-between bg-slate-300 dark:bg-zinc-800 rounded-t-md p-2 text-slate-600 dark:text-zinc-500">
            <p>pack.mcmeta</p>
            <IconX />
          </div>
          <div
            class="fadeTextAnime opacity-0 text-slate-600 dark:text-zinc-500 font-mono bg-slate-300 dark:bg-zinc-800 mt-2 px-4 rounded-b-md overflow-x-auto">
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
        class="fadeTextAnime opacity-0 p-4 col-span-2 lg:col-auto bg-slate-300 dark:bg-zinc-800 rounded-lg w-full">
        <h2
          class="fadeTextAnime opacity-0 text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>ZIP Optimisation</b>
        </h2>
        <p
          class="fadeTextAnime opacity-0 text-pearl-lusta-950 dark:text-pearl-lusta-100 text-lg my-3 font-light">
          Uploaded files have the option to be optimised automatically with
          PackSquash!
        </p>
        <div
          class="bg-slate-200 dark:bg-zinc-900 rounded-xl p-4 dark:text-white flex items-center justify-center">
          <div class="flex items-center relative space-x-3">
            <IconFile width="48" height="48" class="text-red-500" />
            <IconArrow width="24" height="24" />
            <IconFile width="24" height="24" class="text-green-500" />
          </div>
        </div>
      </div>
      <div
        class="fadeTextAnime opacity-0 p-4 col-span-2 lg:col-auto pb-0 bg-slate-300 dark:bg-zinc-800 rounded-lg w-full">
        <h2
          class="fadeTextAnime opacity-0 text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Strong Moderation</b>
        </h2>
        <p
          class="text-pearl-lusta-950 dark:text-pearl-lusta-100 text-lg mt-3 font-light">
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
                class="h-auto md:h-12 rounded-md hover:scale-105 transition-all" />
            </a>
          {/each}
        </div>
      </div>
      <div
        class="fadeTextAnime opacity-0 p-4 col-span-2 lg:col-auto bg-slate-300 dark:bg-zinc-800 rounded-lg w-full">
        <h2
          class="fadeTextAnime opacity-0 text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Awesome Community</b>
        </h2>
        <p
          class="fadeTextAnime opacity-0 text-pearl-lusta-950 dark:text-pearl-lusta-100 text-lg my-4 font-light">
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
        class="fadeTextAnime opacity-0 p-4 col-span-2 lg:col-auto bg-slate-300 dark:bg-zinc-800 rounded-lg w-full">
        <h2
          class="fadeTextAnime opacity-0 text-black dark:text-white text-lg lg:text-xl xl:text-2xl">
          <b>Project Featuring</b>
        </h2>
        <p
          class="fadeTextAnime opacity-0 text-pearl-lusta-950 dark:text-pearl-lusta-100 text-lg my-4 font-light">
          Our staff regularly feature cool projects to reach a wider audience!
        </p>
        {#each data.random.splice(0, 1) as randProj}
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
        <div class="bg-slate-200 dark:bg-zinc-900 rounded-xl p-2">
          <div
            class="flex items-center justify-between space-x-2 bg-slate-300 dark:bg-zinc-800 rounded-t-md p-2 text-slate-600 dark:text-zinc-500">
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
              class="button-base bg-green-600 text-white"
              on:click="{apiExampleRun}">Run</button>
          </div>
          <div
            class="text-slate-600 dark:text-zinc-500 font-mono mt-2 bg-slate-300 dark:bg-zinc-800 rounded-b-md overflow-clip h-80 overflow-y-auto">
            {#if apiExampleResult.length > 0}
              <pre
                class="text-sm p-2 whitespace-pre-wrap"
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
    @apply absolute left-1/2 inline-block w-full -translate-x-1/2 overflow-y-hidden text-center text-5xl font-bold sm:text-6xl md:left-0 md:w-auto md:translate-x-0 md:text-left md:text-7xl xl:text-8xl;
  }
</style>
