<script lang="ts">
  import ReportComponent from "$lib/components/ReportComponent.svelte";
  import ProjectComponent from "$lib/components/project/ProjectCard.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { createTabs, melt } from "@melt-ui/svelte";
  import { title } from "radash";
  import { quartInOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;

  const {
    elements: { root, list, content, trigger },
    states: { value }
  } = createTabs({
    defaultValue: "pq"
  });

  const triggers = [
    { id: "pq", title: "Publish Queue" },
    { id: "rq", title: "Review Queue" },
    { id: "re", title: "Reports" },
    { id: "ro", title: "Roles" }
  ];

  const [send, receive] = crossfade({
    duration: 250,
    easing: quartInOut
  });
</script>

<svelte:head>
  <title>Moderation | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 px-4 transition-all dark:bg-zinc-900 lg:px-32 xl:px-64">
  <div
    class="h-screen w-full flex-col items-center pt-4 md:flex-row md:items-start md:pt-32">
    <h1
      class="mb-3 pb-2 text-center text-5xl font-bold text-zinc-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Moderation Dashboard
    </h1>
    <div
      class="mb-2 flex w-max space-x-2 rounded-full bg-slate-200 p-2 dark:bg-zinc-800"
      use:melt="{$root}">
      <div use:melt="{$list}" class="flex-grow">
        {#each triggers as triggerItem}
          <button
            class="relative border-r border-slate-400 px-2 last:border-r-0 dark:border-zinc-600 dark:text-white"
            use:melt="{$trigger(triggerItem.id)}">
            {triggerItem.title}
            {#if $value === triggerItem.id}
              <div
                in:send="{{ key: 'trigger' }}"
                out:receive="{{ key: 'trigger' }}"
                class="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-slate-400 dark:bg-zinc-400">
              </div>
            {/if}
          </button>
        {/each}
      </div>
      <a href="/moderation/console" class="dark:text-white">Open Console</a>
    </div>

    <div use:melt="{$content('pq')}">
      <div
        class="space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start">
        {#if data.publishQueue?.length === 0}
          <p class=" dark:text-white">
            You're all caught up! There are no projects in the publish queue.
          </p>
        {:else}
          <p class=" dark:text-white">
            There are {data.publishQueue?.length} items awaiting approval:
          </p>
          {#each data.publishQueue ?? [] as proj}
            <ProjectComponent project="{proj}" />
          {/each}
        {/if}
      </div>
    </div>

    <div use:melt="{$content('rq')}">
      <div
        class="space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start"
        use:autoAnimate>
        {#if data.reviewQueue?.length === 0}
          <p class=" dark:text-white">
            You're all caught up! There are no projects awaiting review.
          </p>
        {:else}
          <p class=" dark:text-white">
            There are {data.reviewQueue?.length} items awaiting approval:
          </p>
          {#each data.reviewQueue ?? [] as proj}
            <ProjectComponent project="{proj}" />
          {/each}
        {/if}
      </div>
    </div>

    <div use:melt="{$content('re')}">
      <div
        class="space-y-2 rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start">
        {#if data.reports?.length === 0}
          <p class=" dark:text-white">
            You're all caught up! There are no reports in the queue.
          </p>
        {:else}
          <p class=" dark:text-white">
            There are {data.reports?.length} reported item(s):
          </p>
          {#each data.reports ?? [] as proj}
            <ReportComponent report="{proj}" />
          {/each}
        {/if}
      </div>
    </div>

    <div use:melt="{$content('ro')}">
      <div
        class="flex flex-col space-x-2 rounded-xl bg-slate-200 p-3 py-3 text-center align-middle dark:bg-zinc-800 md:text-start">
        <h1
          class="m-2 text-center text-2xl font-bold text-zinc-950 dark:text-white md:text-start">
          Site Roles
        </h1>
        <table class="table-auto rounded-xl p-3 text-left">
          <tr class="bg-emerald-500 p-3">
            <th class="p-3 text-zinc-950 dark:text-white">Role Name</th>
            <th class="p-3 text-zinc-950 dark:text-white">Permissions</th>
          </tr>
          {#each data.rolesJson ?? [] as index}
            <tr
              use:autoAnimate
              class="odd:bg-slate-400/25 dark:odd:bg-zinc-700/25">
              <td
                ><p
                  style="color: {index.color};"
                  class="text-zinc-950 dark:text-white">
                  ⬤ {title(index.name)}
                </p></td>
              <td class="text-zinc-950 dark:text-white"
                >{#if index.permissions.length > 0}{index.permissions
                    .map(p => title(p.toLowerCase()))
                    .join(", ")}{:else}None{/if}</td>
            </tr>
          {/each}
        </table>
      </div>
    </div>
  </div>
</main>
