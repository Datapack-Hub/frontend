<script lang="ts">
  import type { PageData } from "./$types";
  import UserCard from "$lib/components/user/UserCard.svelte";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  export let data: PageData;

  let visible = false;
  onMount(() => (visible = true));
</script>

<svelte:head>
  <title>Staff Team | Datapack Hub</title>
  <meta name="description" content="Our amazing staff team protecting you!" />
</svelte:head>

<main
  class="  bg-slate-50 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="pt-8 pb-2 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Datapack Hub Staff
    </h1>
    <p class=" text-slate-950 dark:text-white">
      The people listed below help keep Datapack Hub running smoothly and safe!
      You will be able to recognise them by their orange or blue verification
      checkmarks.
    </p>
    {#if visible}
      {#each data.staff ?? [] as person, i}
        <div in:fly="{{ x: -200, duration: 500, delay: i * 75 }}">
          <UserCard
            person="{person}"
            role="{data.roleData?.find(v => person.role == v.name)}" />
        </div>
      {/each}
    {/if}
    <p class="text-slate-950 dark:text-white">
      <b>Want to become staff?</b> We don't take applications for staff, so don't
      ask. However, the admins will notice you if you're active and helpful around
      the site, the Discord, and the community.
    </p>
    <br />
  </div>
</main>
