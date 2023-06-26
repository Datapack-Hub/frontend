<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";

  import IconAttr from "~icons/tabler/At.svelte";
  import IconSA from "~icons/tabler/Repeat.svelte";
  import IconNC from "~icons/tabler/CoinOff.svelte";
  import IconND from "~icons/tabler/CoinOff.svelte";
  import IconEdit from "~icons/tabler/Pencil.svelte";
  import IconNoIcon from "~icons/tabler/Upload.svelte";
  import Button from "$lib/components/Button.svelte";

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

  // function uploadIcon() {
  //   if (iconVal[0].size > 256000) {
  //     return toast.error("Icon must be less than 256kb");
  //   }
  //   let reader = new FileReader();

  //   iconElem.src = URL.createObjectURL(iconVal[0]);
  //   reader.addEventListener("load", e => {
  //     iconB64 = e.target?.result;
  //   });
  //   reader.readAsDataURL(iconVal[0]);
  // }
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main class="pt-20 grid grid-cols-3 gap-2 px-4 sm:px-8 md:px-16 lg:px-24 pb-3">
  <h1 class="col-span-3 text-pearl-lusta-100 text-3xl font-bold mb-4">
    Create New Datapack
  </h1>
  <div class="col-span-3 lg:col-span-2 flex items-center justify-between space-x-0 md:space-x-3 flex-col md:flex-row">
    <div
      class="bg-stone-700 flex items-center h-full w-1/3 md:w-auto aspect-square justify-center rounded-xl dark:text-white">
      <IconNoIcon class="h-1/2 w-1/2" />
    </div>
    <div class="w-full">
      <p class="text-pearl-lusta-100 col-span-3 mb-2">Title</p>
      <input type="text" placeholder="Super Cool Datapack" maxlength="35" class="input" />
      <p class="text-pearl-lusta-100 col-span-3 mt-4 mb-2">URL</p>
      <input type="text" placeholder="slug-for-your-pack" maxlength="35" class="input" />
    </div>
  </div>

  <p class="text-pearl-lusta-100 col-span-3 pt-3">Summary</p>
  <textarea placeholder="A short description of your pack" maxlength="200" class="input resize-none h-32 col-span-2 lg:col-span-1"></textarea>
  <p class="text-pearl-lusta-100 col-span-3 pt-3">Description</p>
  <textarea placeholder="Details about your project" maxlength="2000" class="input resize-none h-64 col-span-3 lg:col-span-2"
  ></textarea>
  <p class="text-pearl-lusta-100 col-span-3 pt-3">
    CC Licence (click to select)
  </p>
  <div class="grid grid-cols-2 gap-3 col-span-3 md:col-span-2 lg:col-span-1" use:autoAnimate>
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
  <Button classes="col-span-3 w-fit mt-4">Create Project</Button>
  <div class="py-16"></div>
</main>

<style lang="postcss">
  .input {
    @apply bg-stone-800 rounded-lg border-2 border-stone-700 p-2 focus:border-dph-orange outline-none text-opacity-60 focus:text-opacity-100 text-pearl-lusta-100 transition-all w-full placeholder:italic placeholder:text-stone-500;
  }
</style>
