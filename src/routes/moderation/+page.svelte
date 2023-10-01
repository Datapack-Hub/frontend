<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import ReportComponent from "$lib/components/ReportComponent.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { title } from "radash";
  import type { PageData } from "./$types";

  export let data: PageData;

  let activePage = "publish_queue";
</script>

<svelte:head>
  <title>Moderation | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 px-4 transition-all dark:bg-zinc-900 lg:px-32 xl:px-64">
  <div
    class="pt-4 h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mb-3 pb-2 text-center text-5xl font-bold text-zinc-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Moderation Dashboard
    </h1>
    <div class="mb-2 flex space-x-2">
      <Button
        style="base"
        classes="text-zinc-950 dark:text-zinc-100 {activePage ===
        'publish_queue'
          ? 'bg-slate-400 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'publish_queue')}">Publish Queue</Button>
      <Button
        style="base"
        classes="text-zinc-950 dark:text-zinc-100 {activePage === 'review_queue'
          ? 'bg-slate-400 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'review_queue')}">Review Queue</Button>
      <Button
        style="base"
        classes="text-zinc-950 dark:text-zinc-100 {activePage === 'reports'
          ? 'bg-slate-400 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'reports')}">Reports</Button>
      <Button
        style="base"
        classes="text-zinc-950 dark:text-zinc-100 {activePage === 'roles'
          ? 'bg-slate-400 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'roles')}">Roles</Button>
      <Button
        style="base"
        classes="bg-slate-300 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100"
        click="/moderation/console">Open console</Button>
    </div>

    <div use:autoAnimate>
      {#if activePage == "publish_queue"}
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
      {:else if activePage == "review_queue"}
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
      {:else if activePage == "reports"}
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
      {:else if activePage == "roles"}
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
      {/if}
    </div>
  </div>
</main>
