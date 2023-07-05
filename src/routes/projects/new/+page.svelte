<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";

  import { afterNavigate } from "$app/navigation";
  import Button from "$lib/components/decorative/Button.svelte";
  import ToggleBoxes from "$lib/components/utility/ToggleBoxes.svelte";
  import { categories } from "$lib/globals/consts";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { writable } from "svelte/store";
  import IconAttr from "~icons/tabler/At.svelte";
  import { default as IconNC, default as IconND } from "~icons/tabler/CoinOff.svelte";
  import IconEdit from "~icons/tabler/Pencil.svelte";
  import IconSA from "~icons/tabler/Repeat.svelte";
  import IconNoIcon from "~icons/tabler/Upload.svelte";

  let iconB64: string | ArrayBuffer | null | undefined;
  let iconVal: FileList;
  let iconImg: string;

  // let dependencies: Project[] = [];
  // let dependencyNames: string[] = [""];

  // let cat = document.getElementById("cat") as HTMLSelectElement

  // async function create() {
  //   let projData: Project = {
  //     icon: iconB64?.toString(),
  //     type: "datapack",
  //     url: titleVal.trim().toLowerCase().replaceAll(" ", "-"),
  //     title: titleVal,
  //     description: descVal,
  //     body: bodyVal,
  //     category: catVal,
  //     author: $user.id,
  //     status: "draft"
  //   };

  //   toast.promise(
  //     fetchAuthed("post", `/projects/create`, projData).then(res => {
  //       if (res.ok) {
  //         goto("/project/" + titleVal.toLowerCase().replaceAll(" ", "-"));
  //       }
  //     }),
  //     {
  //       success: "Created project! Redirecting...",
  //       loading: "Creating project...",
  //       error: "Something went wrong!"
  //     }
  //   );
  // }

  function uploadIcon() {
    if (iconVal[0].size > 256000) {
      return toast.error("Icon must be less than 256kb");
    }
    let reader = new FileReader();

    reader.readAsDataURL(iconVal[0]);

    reader.addEventListener("load", e => {
      iconB64 = e.target?.result;
      iconImg = URL.createObjectURL(iconVal[0]);
    });
  }

  let categoryCount = writable([]);

  onMount(() => {
    $categoryCount = [];
  });

  afterNavigate(() => {
    $categoryCount = [];
  });

  function maxCategoriesReached() {
    toast.error("Max Categories Reached");
  }

  // function dependencyHandler(v: string, i: number) {
  //   dependencyNames[i] = v;
  //   dependencyNames[i + 1] = "";
  //   dependencyNames = [...dependencyNames.slice(0, 4)];
  //   resolveDependency(v, i);
  // }

  // async function resolveDependency(v: string, i: number) {
  //   let search = await fetch(`${apiURL}/projects/search?query=${v}`);
  //   let projects = projectSchema.array().parse((await search.json()).result);
  //   console.log("ping");
  //   console.log(projects);
  //   console.log(v.split("/")[5]);

  //   projects.forEach(project => {
  //     console.log(project);
  //     if (project.url == v) {
  //       dependencies[i] = project;
  //     }
  //   });
  // }
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main class="pt-20 px-4 sm:px-8 md:px-16 lg:px-24 pb-3">
  <h1 class="text-pearl-lusta-100 text-3xl font-bold mb-4">
    Create New Datapack
  </h1>
  <div
    class="grid grid-cols-3 gap-2 rounded-xl p-3 text-center align-middle md:text-start space-y-2">
    <div
      class="flex items-center justify-between space-x-0 md:space-x-3 flex-col md:flex-row col-span-2 xl:col-span-1">
      <div
        class="bg-stone-700 h-full w-1/3 md:w-auto aspect-square justify-center rounded-xl dark:text-white">
        <label class="w-full h-full flex items-center justify-center">
          <img
            src="{iconImg}"
            alt="Your Icon"
            class="aspect-square overflow-clip w-full h-full rounded-xl {iconVal
              ? 'block'
              : 'hidden'}" />
          <input
            bind:files="{iconVal}"
            on:change="{uploadIcon}"
            type="file"
            class="hidden" />
          <IconNoIcon class="h-1/2 w-1/2 {iconVal ? 'hidden' : 'block'}" />
        </label>
      </div>
      <div class="w-full">
        <p class="text-pearl-lusta-100 mb-2">Title</p>
        <input
          type="text"
          placeholder="Super Cool Datapack"
          maxlength="35"
          class="input" />
        <p class="text-pearl-lusta-100 col-span-2 mt-4 mb-2">URL</p>
        <input
          type="text"
          placeholder="slug-for-your-pack"
          maxlength="35"
          class="input" />
      </div>
    </div>

    <p class="text-pearl-lusta-100 col-span-3 pt-3">Summary</p>
    <textarea
      placeholder="A short description of your pack"
      maxlength="200"
      class="input resize-none h-32 col-span-2 xl:col-span-1"></textarea>
    <p class="text-pearl-lusta-100 col-span-3 pt-3">Description</p>
    <textarea
      placeholder="Details about your project"
      maxlength="2000"
      class="input resize-none h-64 col-span-2 xl:col-span-1"></textarea>
    <p class="text-pearl-lusta-100 col-span-3 pt-3">
      CC Licence (click to select)
    </p>
    <p class="text-pearl-lusta-100/20 col-span-3">WIP, does not work!</p>
    <div
      class="grid grid-cols-2 gap-3 col-span-2 md:col-span-2 lg:col-span-1"
      use:autoAnimate>
      <div class="input cursor-pointer">
        <h1 class="flex items-center space-x-2">
          <IconAttr />
          <p class="font-bold">Attribution</p>
        </h1>
        <p class="text-xs">
          If people use, redistribute, or modify your work, credit must be given
          to you, the creator.
        </p>
      </div>
      <div class="input cursor-pointer">
        <h1 class="flex items-center space-x-2">
          <IconSA />
          <p class="font-bold">ShareAlike</p>
        </h1>
        <p class="text-xs">
          If someone remixes, transforms, or builds upon your work, they have to
          distribute it under the same licence.
        </p>
      </div>
      <div class="input cursor-pointer">
        <h1 class="flex items-center space-x-2">
          <IconNC />
          <p class="font-bold">NonCommercial</p>
        </h1>
        <p class="text-xs">
          People can't use your work to make money or for other commercial
          purposes.
        </p>
      </div>
      <div class="input cursor-pointer p-3">
        <h1 class="flex items-center space-x-2">
          <IconND />
          <p class="font-bold">NoDeriatives</p>
        </h1>
        <p class="text-xs">
          If someone remixes, transforms, or builds upon your work, they can't
          distribute it.
        </p>
      </div>
      <div class="input p-3 col-span-2 space-y-1">
        <h1 class="flex items-center space-x-2">
          <IconEdit />
          <p class="font-bold">Custom</p>
        </h1>
        <input
          type="text"
          class="input"
          placeholder="https://example.com/my-custom-licence.md" />
      </div>
    </div>
    <p class="text-pearl-lusta-100 col-span-3">Categories</p>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 rounded-lg">
      {#each categories as cat}
        <ToggleBoxes
          value="{cat}"
          selected="{categoryCount}"
          on:fail="{maxCategoriesReached}" />
      {/each}
    </div>
    <div class="col-span-3"></div>
    <!--I've been creating this for like 4 days just to realize its not even for this page-->
    <!-- <p class="text-pearl-lusta-100 col-span-3">Dependencies</p>
    <div
      class="space-y-3 bg-stone-800/50 rounded-lg border-2 border-stone-700 p-3"
      use:autoAnimate>
      {#each dependencyNames as _, i}
        <p class="text-pearl-lusta-100 pb-3">
          <IconLink class="inline-block" /> Dependency URL
        </p>
        <div class="flex items-center">
          <span class="input">
            https://datapackhub.net/project/<AutoAdjustableInput
              classes="bg-stone-800 outline-none"
              on:change="{e => dependencyHandler(e.detail, i)}" />
          </span>
          {#if dependencies[i]}
            <img
              src="{dependencies[i].icon}"
              alt="{dependencies[i].title}'s icon"
              height="48"
              width="48"
              class="ml-3 rounded-lg aspect-square" />
          {/if}
        </div>
      {/each}
    </div> -->
    <Button classes="col-span-3 w-fit mt-4">Create Project</Button>
  </div>
  <div class="py-16"></div>
</main>
