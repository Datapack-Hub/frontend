<script lang="ts">
  import type { PageData } from "./$types";
  import UserCard from "$components/UserCard.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Staff Team | Datapack Hub</title>
</svelte:head>

<main
  class="overflow-y-scroll bg-new-white px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div
    class="h-screen w-full flex-col items-center pt-10 md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-2 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Datapack Hub Staff
    </h1>
    <p class="font-brand dark:text-white">
      The people listed below help keep Datapack Hub running smoothly and safe!
      You will be able to recognise them by their orange or blue verification
      checkmarks.
    </p>
    {#each data.staff ?? [] as person}
      <UserCard person="{person}" />
    {/each}
    <p class="dark:text-white">
      <b>Want to become staff?</b> We don't take applications for staff, so don't
      ask. However, the admins will notice you if you're active and helpful around
      the site, the Discord, and the community.
    </p>
    <br />
  </div>
</main>
