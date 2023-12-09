<script lang="ts">
  import { beforeNavigate, goto } from "$app/navigation";
  import Button from "$lib/components/decorative/Button.svelte";
  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
  import ToggleBoxes from "$lib/components/utility/ToggleBoxes.svelte";
  import { categories } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import { authed, user } from "$lib/globals/stores";
  import { dash } from "radash";
  import { toast } from "svelte-sonner";
  import { writable } from "svelte/store";
  import IconNoIcon from "~icons/tabler/Upload.svelte";

  let iconB64: string | ArrayBuffer | null | undefined;
  let iconValue: FileList;
  let iconImg: string;
  let title: string;
  let description: string;
  let body: string;
  let slug: string;
  let dirty = false;
  $: category = writable([]);

  function maxCategoriesReached() {
    toast.error("Max Categories Reached");
  }

  beforeNavigate(({ cancel }) => {
    if (dirty && !confirm('Are you sure you want to leave this page? You have unsaved changes that will be lost.')) {
        cancel();
      }
  });

  async function create() {
    let projData = {
      icon: iconB64?.toString(),
      type: "datapack",
      url: slug.length === 0 ? dash(title.trim()) : dash(slug),
      title: title,
      description: description,
      body: body,
      category: $category,
      author: $user,
      status: "draft"
    };

    toast.promise(
      fetchAuthed("post", `/projects/create`, {
        data: projData
      }).then(response => {
        if (response.ok) {
          dirty = false;
          goto(`/project/${projData.url.toLowerCase()}?is_new=1`);
        }
      }),
      {
        success: "Created project! Redirecting...",
        loading: "Creating project...",
        error: "Something went wrong!"
      }
    );
  }

  function uploadIcon() {
    dirty = true
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

  function titleHandler(event: HTMLInputElement) {
    dirty = true
    title = event.value;
    slug = dash(event.value.trim());
  }
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main id="main-content" class="px-4 pb-3 sm:px-8 md:px-16 lg:px-24">
  {#if $authed}
    <div class="pt-0 md:pt-32"></div>
    <h1 class="mb-4 text-3xl font-bold text-zinc-950 dark:text-zinc-100">
      Create New Datapack
    </h1>
    <p class="ml-3 text-zinc-950 dark:text-zinc-100">Logo</p>
    <div
      class="grid grid-cols-2 gap-3 space-y-2 rounded-xl p-3 text-center align-middle md:text-start lg:grid-cols-3">
      <div
        class="col-span-2 flex flex-col items-center justify-between space-x-0 md:flex-row md:space-x-2">
        <div
          class="aspect-square h-full w-1/3 cursor-pointer justify-center rounded-xl bg-slate-300 transition-all hover:brightness-75 dark:bg-zinc-700 dark:text-white md:w-auto">
          <label class="flex h-full w-full items-center justify-center">
            <img
              src="{iconImg}"
              alt="Your Icon"
              class="aspect-square h-full w-full overflow-clip rounded-xl {iconValue
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
          <p class="mb-2 text-zinc-950 dark:text-zinc-100">Title</p>
          <input
            type="text"
            on:change="{() => dirty = true}"
            placeholder="Super Cool Datapack"
            maxlength="35"
            required
            aria-required="true"
            on:input="{event => titleHandler(event.currentTarget)}"
            class="input w-full" />
          <p class="col-span-2 mb-2 mt-4 text-zinc-950 dark:text-zinc-100">
            URL
          </p>
          <input
            type="text"
            on:change="{() => dirty = true}"
            placeholder="slug-for-your-pack"
            maxlength="35"
            bind:value="{slug}"
            class="input w-full" />
        </div>
      </div>

      <p class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">Summary</p>
      <textarea
        placeholder="A short description of your pack"
        maxlength="200"
        on:change="{() => dirty = true}"
        bind:value="{description}"
        class="input col-span-2 h-32 resize-none"></textarea>
      <p class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">
        Description
      </p>
      <MarkdownEditor on:input="{() => dirty = true}" bind:content="{body}" classes="col-span-2 resize-none" />
      <p class="col-span-3 text-zinc-950 dark:text-zinc-100">Categories</p>
      <div
        class="col-span-2 grid grid-cols-2 gap-3 rounded-lg md:grid-cols-3 lg:grid-cols-4">
        {#each categories as cat}
          <ToggleBoxes
            value="{cat}"
            selected="{category}"
            on:fail="{maxCategoriesReached}" />
        {/each}
      </div>
      <Button classes="col-span-3 mt-4 w-fit" click="{create}" wait="{true}"
        >Create Project</Button>
    </div>
  {:else}
    <div class="flex h-screen w-full flex-col items-center justify-center">
      <p class="text-3xl text-white">You must be signed in to post things!</p>
      <a href="/login" class="mt-3 text-blue-500 underline hover:text-blue-700"
        >You can sign in here!</a>
    </div>
  {/if}
  <div class="py-24"></div>
</main>
