<svelte:head>
  <title>Editing Project | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64 overflow-y-scroll"
>
  <div
    class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"
  >
    <h1
      class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-4xl font-brand font-bold mt-8 pb-10"
    >
      Editing Project: <span class="text-orange-500">Realistic Item Drops</span>
    </h1>
    <div class="align-middle text-center md:text-start">
      <!-- Title -->
      <p class="align-middle dark:text-new-white font-brand">Title</p>
      <input
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white h-10 text-lg p-2 font-brand w-1/2"
        value="Realistic Item Drops"
        id="username"
      /><br /><br />

      <!-- Short Description -->
      <p class="align-middle dark:text-new-white font-brand">
        Short Description
      </p>
      <textarea
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white text-lg p-2 font-brand w-3/4 h-24 resize-none"
        value="This datapack makes dropped items display realistically on the ground, using armour stands. It works server side!"
        id="username"
      /><br /><br />

      <!-- Long Description -->
      <p class="align-middle dark:text-new-white font-brand">
        Long Description (supports markdown)
      </p>
      <textarea
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white text-lg p-2 font-brand w-full h-96 resize-none"
        value="This datapack makes dropped items display realistically!\nWhen you drop an item, it will rest in the ground. You can change this by running the /function items:_menu command, which will make it display flat.\nTo uninstall, run the uninstall function."
        id="username"
      /><br /><br />

      <!-- Downloadable File -->
      <p class="align-middle dark:text-new-white font-brand">
        Datapack File Upload
      </p>
      <input
        type="file"
        class="dark:bg-stone-800 bg-dark-white rounded-md dark:text-white text-lg p-2 font-brand"
        value="This datapack makes dropped items display realistically!\nWhen you drop an item, it will rest in the ground. You can change this by running the /function items:_menu command, which will make it display flat.\nTo uninstall, run the uninstall function."
        id="username"
      /><br /><br />

      <button
        class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 md:py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 my-2"
      >
        Save Changes
      </button>
    </div>
  </div>
</main>
