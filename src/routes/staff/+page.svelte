<script lang="ts">
  import type { PageData } from "./$types";
  import UserCard from "$lib/components/user/UserCard.svelte";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { roles } from "$lib/globals/stores";

  export let data: PageData;

  let visible = false;
  onMount(() => (visible = true));
</script>

<svelte:head>
  <title>Staff Team | Datapack Hub</title>
  <meta name="description" content="Our amazing staff team protecting you!" />
</svelte:head>

<main
  id="main-content"
  class="  bg-slate-50 px-4 transition-all dark:bg-zinc-900 lg:px-32 xl:px-64">
  <div class="w-full flex-col items-center md:flex-row md:items-start md:pt-32">
    <h1
      class="pb-2 pt-8 text-center text-5xl font-bold text-zinc-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Datapack Hub Staff
    </h1>
    <p class=" text-zinc-950 dark:text-white">
      The people listed below help keep Datapack Hub running smoothly and safe!
      You will be able to recognise them by their orange or blue verification
      check marks.
    </p>
    <ul>
      {#each data.staff ?? [] as person, index}
        {#if visible}
          <li transition:fly="{{ y: -300, duration: 500, delay: index * 100 }}">
            <UserCard
              {person}
              role="{$roles?.find(v => person.role == v.name)}" />
          </li>
        {/if}
      {/each}
    </ul>

    <p class="text-zinc-950 dark:text-white">
      <b>Want to become staff?</b> We don't take applications for staff, so don't
      ask. However, the admins will notice you if you're active and helpful around
      the site, the Discord, and the community.
    </p>
    <br />
  </div>
</main>
