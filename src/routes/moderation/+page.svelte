<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import ReportComponent from "$lib/components/project/ReportComponent.svelte";
  import { fetchAuthed } from "$lib/globals/functions";
  import {
    projectSchema,
    reportSchema,
    roleSchema,
    type Project,
    type Report,
    type Role
  } from "$lib/globals/schema";
  import autoAnimate from "@formkit/auto-animate";
  import { parallel, title } from "radash";

  let activePage = "publish_queue";

  let rolesJson: Role[];
  let publishQueue: Project[];
  let reviewQueue: Project[];
  let reports: Report[];

  async function loadStuff() {
    let [pq, rq, rp, r] = await parallel(
      4,
      await Promise.all([
        fetchAuthed("get", "/moderation/queue/publish"),
        fetchAuthed("get", "/moderation/queue/review"),
        fetchAuthed("get", "/moderation/queue/report"),
        fetchAuthed("get", "/user/staff/roles")
      ]),
      async (response: Response) => {
        return await response.json();
      }
    );

    publishQueue = await projectSchema.array().parseAsync(pq.projects);
    reviewQueue = await projectSchema.array().parseAsync(rq.projects);
    reports = await reportSchema.array().parseAsync(rp.reports);
    rolesJson = await roleSchema.array().parseAsync(r.roles);
  }
</script>

<svelte:head>
  <title>Moderation | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 px-4 transition-all dark:bg-zinc-900 lg:px-32 xl:px-64">
  <div
    class=" h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="my-3 pb-2 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Moderation Dashboard
    </h1>
    <div class="mb-2 flex space-x-2">
      <Button
        style="base"
        classes="{activePage === 'publish_queue'
          ? 'bg-slate-500 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'publish_queue')}">Publish Queue</Button>
      <Button
        style="base"
        classes="{activePage === 'review_queue'
          ? 'bg-slate-500 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'review_queue')}">Review Queue</Button>
      <Button
        style="base"
        classes="{activePage === 'reports'
          ? 'bg-slate-500 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'reports')}">Reports</Button>
      <Button
        style="base"
        classes="{activePage === 'roles'
          ? 'bg-slate-500 dark:bg-zinc-600'
          : 'bg-slate-300 dark:bg-zinc-800'}"
        click="{() => (activePage = 'roles')}">Roles</Button>
      <Button
        style="base"
        classes="bg-slate-300 dark:bg-zinc-800"
        click="/moderation/console">Open console</Button>
    </div>

    <div use:autoAnimate>
      {#await loadStuff()}
        <p class="p-2 dark:text-white">Loading...</p>
      {:then}
        {#if activePage == "publish_queue"}
          <div
            class="rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start space-y-2">
            {#if publishQueue.length === 0}
              <p class=" dark:text-white">
                You're all caught up! There are no projects in the publish
                queue.
              </p>
            {:else}
              <p class=" dark:text-white">
                There are {publishQueue.length} items awaiting approval:
              </p>
              {#each publishQueue ?? [] as proj}
                <ProjectComponent project="{proj}" />
              {/each}
            {/if}
          </div>
        {:else if activePage == "review_queue"}
          <div
            class="rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start space-y-2"
            use:autoAnimate>
            {#if reviewQueue.length === 0}
              <p class=" dark:text-white">
                You're all caught up! There are no projects awaiting review.
              </p>
            {:else}
              <p class=" dark:text-white">
                There are {reviewQueue.length} items awaiting approval:
              </p>
              {#each reviewQueue ?? [] as proj}
                <ProjectComponent project="{proj}" />
              {/each}
            {/if}
          </div>
        {:else if activePage == "reports"}
          <div
            class="rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start space-y-2">
            {#if reports.length === 0}
              <p class=" dark:text-white">
                You're all caught up! There are no reports in the queue.
              </p>
            {:else}
              <p class=" dark:text-white">
                There are {reports.length} reported item(s):
              </p>
              {#each reports ?? [] as proj}
                <ReportComponent project="{proj.project}" report="{proj}" />
              {/each}
            {/if}
          </div>
        {:else if activePage == "roles"}
          <div
            class="flex flex-col space-x-2 rounded-xl bg-slate-200 dark:bg-zinc-800 p-2 py-3 text-center align-middle md:text-start">
            <h1
              class="m-2 text-center text-2xl font-bold text-slate-950 dark:text-white md:text-start">
              Site Roles
            </h1>
            <table class="table-auto rounded-xl p-2 text-left">
              <tr class="bg-emerald-500 p-2">
                <th class="p-2 text-slate-950 dark:text-white">Role Name</th>
                <th class="p-2 text-slate-950 dark:text-white">Permissions</th>
              </tr>
              {#each rolesJson ?? [] as index}
                <tr
                  use:autoAnimate
                  class="odd:bg-slate-400/25 dark:odd:bg-zinc-700/25">
                  <td
                    ><p
                      style="color: {index.color};"
                      class="text-slate-950 dark:text-white">
                      ⬤ {title(index.name)}
                    </p></td>
                  <td class="text-slate-950 dark:text-white"
                    >{#if index.permissions.length > 0}{index.permissions
                        .map(p => title(p.toLowerCase()))
                        .join(", ")}{:else}None{/if}</td>
                </tr>
              {/each}
            </table>
          </div>
        {/if}
      {/await}
    </div>
  </div>
</main>
