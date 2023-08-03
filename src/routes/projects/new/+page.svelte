<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";

  import { afterNavigate, goto } from "$app/navigation";
  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
  import Button from "$lib/components/decorative/Button.svelte";
  import ToggleBoxes from "$lib/components/utility/ToggleBoxes.svelte";
  import { categories } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import { user } from "$lib/globals/stores";
  import { dash } from "radash";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { writable, type Writable } from "svelte/store";
  import IconAttr from "~icons/tabler/At.svelte";
  import {
    default as IconNC,
    default as IconND
  } from "~icons/tabler/CoinOff.svelte";
  import IconEdit from "~icons/tabler/Pencil.svelte";
  import IconSA from "~icons/tabler/Repeat.svelte";
  import IconNoIcon from "~icons/tabler/Upload.svelte";

  let iconB64: string | ArrayBuffer | null | undefined;
  let iconValue: FileList;
  let iconImg: string;
  let title: string;
  let description: string;
  let body: string;
  let slug: string; // unused for rn
  let category: Writable<string[]> = writable([]);

  onMount(() => {
    $category = [];
  });

  afterNavigate(() => {
    $category = [];
  });

  function maxCategoriesReached() {
    toast.error("Max Categories Reached");
  }

  async function create() {
    let projData = {
      icon: iconB64?.toString(),
      type: "datapack",
      url: dash(title.trim()),
      title: title,
      description: description,
      body: body,
      category: $category,
      author: $user,
      status: "draft"
    };

    toast.promise(
      fetchAuthed("post", `/projects/create`, projData)
        .then(response => {
          if (response.ok) {
            goto("/project/" + title.toLowerCase().replaceAll(" ", "-"));
          }
        })
        .catch(error => console.error(error)),
      {
        success: "Created project! Redirecting...",
        loading: "Creating project...",
        error: "Something went wrong!"
      }
    );
  }

  function uploadIcon() {
    if (iconValue[0].size > 256_000) {
      return toast.error("Icon must be less than 256kb");
    }

    if (
      !["png", "jpg", "webp", "gif", "avif"].includes(
        iconValue[0].name.split(".").at(-1)?.toLowerCase() ?? "null"
      )
    ) {
      return toast.error("Unsupported file type");
    }

    let reader = new FileReader();
    reader.readAsDataURL(iconValue[0]);
    reader.addEventListener("load", event => {
      iconB64 = event.target?.result;
      iconImg = URL.createObjectURL(iconValue[0]);
    });
  }
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main id="main-content" class="pt-20 px-4 sm:px-8 md:px-16 lg:px-24 pb-3">
  <h1 class="text-slate-950 dark:text-slate-100 text-3xl font-bold mb-4">
    Create New Datapack
  </h1>
  <p class="text-slate-950 dark:text-slate-100 ml-3">Logo</p>
  <div
    class="grid grid-cols-2 lg:grid-cols-3 gap-2 rounded-xl p-3 text-center align-middle md:text-start space-y-2">
    <div
      class="flex items-center justify-between space-x-0 md:space-x-3 flex-col md:flex-row col-span-2">
      <div
        class="bg-slate-300 dark:bg-stone-700 h-full w-1/3 md:w-auto aspect-square justify-center rounded-xl dark:text-white hover:brightness-75 cursor-pointer transition-all">
        <label class="w-full h-full flex items-center justify-center">
          <img
            src="{iconImg}"
            alt="Your Icon"
            class="aspect-square overflow-clip w-full h-full rounded-xl {iconValue
              ? 'block'
              : 'hidden'}" />
          <input
            bind:files="{iconValue}"
            on:change="{uploadIcon}"
            type="file"
            accept="image/*"
            class="hidden" />
          <IconNoIcon class="h-1/2 w-1/2 {iconValue ? 'hidden' : 'block'}" />
        </label>
      </div>
      <div class="w-full">
        <p class="text-slate-950 dark:text-slate-100 mb-2">Title</p>
        <input
          type="text"
          placeholder="Super Cool Datapack"
          maxlength="35"
          required
          aria-required="true"
          bind:value="{title}"
          class="input w-full" />
        <p class="text-slate-950 dark:text-slate-100 col-span-2 mt-4 mb-2">
          URL
        </p>
        <input
          type="text"
          placeholder="slug-for-your-pack"
          maxlength="35"
          bind:value="{slug}"
          class="input w-full" />
      </div>
    </div>

    <p class="text-slate-950 dark:text-slate-100 col-span-3 pt-3">Summary</p>
    <textarea
      placeholder="A short description of your pack"
      maxlength="200"
      bind:value="{description}"
      class="input resize-none h-32 col-span-2"></textarea>
    <p class="text-slate-950 dark:text-slate-100 col-span-3 pt-3">
      Description
    </p>
    <MarkdownEditor bind:content="{body}" classes="col-span-2 resize-none" />
    <p class="text-slate-950 dark:text-slate-100 col-span-3 pt-3">
      CC Licence (click to select)
    </p>
    <p class="text-slate-950 dark:text-slate-100/20 col-span-3">
      WIP, does not work!
    </p>
    <div
      class="grid grid-cols-2 gap-3 col-span-2 lg:col-span-1"
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
          class="input w-full"
          placeholder="https://example.com/my-custom-licence.md" />
      </div>
    </div>
    <p class="text-slate-950 dark:text-slate-100 col-span-3">Categories</p>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 rounded-lg col-span-2">
      {#each categories as cat}
        <ToggleBoxes
          value="{cat}"
          selected="{category}"
          on:fail="{maxCategoriesReached}" />
      {/each}
    </div>
    <Button classes="col-span-3 w-fit mt-4" click="{create}" wait="{true}"
      >Create Project</Button>
  </div>
  <div class="py-16"></div>
</main>
