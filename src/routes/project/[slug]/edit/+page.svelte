<svelte:head>
  <title>Editing Project | Datapack Hub</title>
</svelte:head>

<main
  class="overflow-y-scroll bg-new-white-200 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-10 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-4xl">
      Editing Project: <span class="text-orange-500">Realistic Item Drops</span>
    </h1>
    <div class="text-center align-middle md:text-start">
      <!-- Title -->
      <p class="align-middle font-brand dark:text-new-white-200">Title</p>
      <input
        class="h-10 w-1/2 rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        value="Realistic Item Drops"
        id="username" /><br /><br />

      <!-- Short Description -->
      <p class="align-middle font-brand dark:text-new-white-200">
        Short Description
      </p>
      <textarea
        class="h-24 w-3/4 resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        value="This datapack makes dropped items display realistically on the ground, using armour stands. It works server side!"
        id="username"></textarea
      ><br /><br />

      <!-- Long Description -->
      <p class="align-middle font-brand dark:text-new-white-200">
        Long Description (supports markdown)
      </p>
      <textarea
        class="h-96 w-full resize-none rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        value="This datapack makes dropped items display realistically!\nWhen you drop an item, it will rest in the ground. You can change this by running the /function items:_menu command, which will make it display flat.\nTo uninstall, run the uninstall function."
        id="username"></textarea
      ><br /><br />

      <!-- Downloadable File -->
      <p class="align-middle font-brand dark:text-new-white-200">
        Datapack File Upload
      </p>
      <input
        type="file"
        class="rounded-md bg-new-white-300 p-2 font-brand text-lg dark:bg-stone-800 dark:text-white"
        value="This datapack makes dropped items display realistically!\nWhen you drop an item, it will rest in the ground. You can change this by running the /function items:_menu command, which will make it display flat.\nTo uninstall, run the uninstall function."
        id="username" /><br /><br />

      <button
        class="text-md my-2 rounded-md border-2 border-red-400 bg-red-400 bg-opacity-10 px-2 py-2 font-brand text-red-400 transition-all hover:scale-105 active:brightness-75 md:px-3 md:py-2 md:text-lg lg:text-xl">
        Save Changes
      </button>
    </div>
  </div>
</main>
