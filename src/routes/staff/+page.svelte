<script lang="ts">
  import type { PageData } from "./$types";
  import UserCard from "$components/UserCard.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Staff Team | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64 overflow-y-scroll"
>
  <div
    class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"
  >
    <h1
      class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2"
    >
      Datapack Hub Staff
    </h1>
    <p class="dark:text-white font-brand">
      The people listed below help keep Datapack Hub running smoothly and safe!
      You will be able to recognise them by their coloured name or outline.
    </p>
    {#each data.staff ?? [] as person}
      <UserCard {person} />
    {/each}
    <p class="dark:text-white">
      <b>Want to become staff?</b> We don't take applications for staff, so don't
      ask. However, the admins will notice you if you're active and helpful around
      the site, the Discord, and the community.
    </p>
    <br />
  </div>
</main>
