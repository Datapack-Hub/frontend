<script lang="ts">
  import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
  import Select from "$lib/components/utility/Select.svelte";
  import { categories } from "$lib/globals/consts";
  import { authed } from "$lib/globals/stores";
  import { dash } from "radash";
  import { toast } from "svelte-sonner";
  import { readable, type Readable } from "svelte/store";
  import { superForm } from "sveltekit-superforms/client";
  import IconNoIcon from "~icons/tabler/Upload.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let iconValue: FileList;
  let iconImg: string;
  let body: string;
  let { form, errors, constraints, enhance } = superForm(data.form);

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
      $form.icon = event.target?.result?.toString();
      iconImg = URL.createObjectURL(iconValue[0]);
    });
  }

  function titleHandler(event: HTMLInputElement) {
    $form.url = dash(event.value.trim());
  }
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main id="main-content" class="px-4 pb-3 sm:px-8 md:px-16 lg:px-24">
  {#if $authed}
    <div class="pt-0 md:pt-32"></div>
    <h1
      class="mb-4 text-center text-3xl font-bold text-zinc-950 md:text-left dark:text-zinc-100">
      Create New Datapack
    </h1>
    <p
      class="ml-0 text-center text-zinc-950 md:ml-3 md:text-left dark:text-zinc-100">
      Icon
    </p>
    <form
      method="POST"
      enctype="multipart/form-data"
      use:enhance
      class="grid grid-cols-2 gap-3 space-y-2 rounded-xl p-3 text-center align-middle md:text-start lg:grid-cols-3">
      <div
        class="col-span-2 flex flex-col items-center justify-between space-x-0 md:flex-row md:space-x-2">
        <div
          class="aspect-square h-full w-1/3 cursor-pointer justify-center rounded-xl bg-slate-300 transition-all hover:brightness-75 md:w-auto dark:bg-zinc-700 dark:text-white">
          <label
            for="icon"
            class="flex h-full w-full items-center justify-center">
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
              name="icon"
              accept="image/*"
              class="hidden" />
            <IconNoIcon class="h-1/2 w-1/2 {iconValue ? 'hidden' : 'block'}" />
          </label>
        </div>
        <div class="w-full">
          <label for="title" class="mb-2 text-zinc-950 dark:text-zinc-100"
            >Title</label>
          <input
            name="title"
            type="text"
            aria-invalid="{$errors.title ? 'true' : undefined}"
            placeholder="Super Cool Datapack"
            bind:value="{$form.title}"
            {...$constraints.title}
            on:input="{event => titleHandler(event.currentTarget)}"
            class="input w-full" />
          {#if $errors.title}<span class="invalid">{$errors.title}</span>{/if}
          <label
            for="url"
            class="col-span-2 mb-2 mt-4 text-zinc-950 dark:text-zinc-100">
            URL
          </label>
          <input
            name="url"
            type="text"
            aria-invalid="{$errors.url ? 'true' : undefined}"
            placeholder="slug-for-your-pack"
            bind:value="{$form.url}"
            {...$constraints.url}
            class="input w-full" />
          {#if $errors.url}<span class="invalid">{$errors.url}</span>{/if}
        </div>
      </div>

      <label
        for="description"
        class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">Summary</label>
      <textarea
        name="description"
        placeholder="A short description of your pack"
        maxlength="200"
        bind:value="{$form.description}"
        {...$constraints.description}
        class="input col-span-2 h-32 resize-none"></textarea>
      {#if $errors.description}<span class="invalid">{$errors.description}</span
        >{/if}
      <p class="col-span-3 pt-3 text-zinc-950 dark:text-zinc-100">Body</p>
      <MarkdownEditor
        bind:content="{body}"
        name="body"
        classes="col-span-2 resize-none" />
      {#if $errors.body}<span class="invalid">{$errors.body}</span>{/if}
      <p class="col-span-3 text-zinc-950 dark:text-zinc-100">Categories</p>
      <div class="col-span-2">
        <Select
          emptyString="{'Categories'}"
          multi="{true}"
          name="category"
          options="{categories}" />
        {#if $errors.category}<span class="invalid"
            >{$errors.category}</span
          >{/if}
      </div>
      <button type="submit" class="button-primary col-span-3 mt-4 w-fit"
        >Create Project</button>
    </form>
  {:else}
    <div class="flex h-screen w-full flex-col items-center justify-center">
      <p class="text-3xl text-white">You must be signed in to post things!</p>
      <a href="/login" class="mt-3 text-blue-500 underline hover:text-blue-700"
        >You can sign in here!</a>
    </div>
  {/if}
  <div class="py-24"></div>
</main>

<style lang="postcss">
  .invalid {
    color: red;
  }
</style>
