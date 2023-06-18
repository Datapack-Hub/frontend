<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import ProjectComponent from "$lib/components/project/ProjectComponent.svelte";
  import ReportComponent from "$lib/components/project/ReportComponent.svelte";
  import { fetchAuthed, titleCase } from "$lib/globals/functions";
  import { user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import type { Role, Project } from "$lib/globals/schema";

  let activePage = "publish_queue";

  let rolesJson: Role[];
  let publishQueue: Project[];
  let reviewQueue: Project[];
  let reports: Report[];

  async function loadStuff() {
    if (!["moderator", "admin"].includes($user.role)) {
      goto("/");
    }

    let pq = await fetchAuthed("get", "/moderation/queue/publish");
    publishQueue = (await pq.json())["projects"] as Project[];

    let rq = await fetchAuthed("get", "/moderation/queue/review");
    reviewQueue = (await rq.json())["projects"] as Project[];

    let rp = await fetchAuthed("get", "/moderation/queue/report");
    reports = (await rp.json())["reports"] as Report[];

    let r = await fetchAuthed("get", "/user/staff/roles");
    rolesJson = (await r.json())["roles"];
  }
</script>

<svelte:head>
  <title>Moderation | Datapack Hub</title>
</svelte:head>

<main
  class="-translate-y-20 bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 md:translate-y-0 lg:px-32 xl:px-64">
  <div
    class=" h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="my-3 pb-2 text-center text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Moderation Dashboard
    </h1>
    <div class="mb-2 flex space-x-2">
      <Button
        style="base"
        classes="{activePage === 'publish_queue'
          ? 'bg-pearl-lusta-500 dark:bg-stone-600'
          : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'publish_queue')}">Publish Queue</Button>
      <Button
        style="base"
        classes="{activePage === 'review_queue'
          ? 'bg-pearl-lusta-500 dark:bg-stone-600'
          : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'review_queue')}">Review Queue</Button>
      <Button
        style="base"
        classes="{activePage === 'reports'
          ? 'bg-pearl-lusta-500 dark:bg-stone-600'
          : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'reports')}">Reports</Button>
      <Button
        style="base"
        classes="{activePage === 'roles'
          ? 'bg-pearl-lusta-500 dark:bg-stone-600'
          : 'bg-pearl-lusta-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'roles')}">Roles</Button>
      <Button
        style="base"
        classes="bg-pearl-lusta-300 dark:bg-stone-800"
        click="/moderation/console">Open console</Button>
    </div>

    <div use:autoAnimate>
      {#await loadStuff()}
        <p class="p-2 dark:text-white">Loading...</p>
      {:then}
        {#if activePage == "publish_queue"}
          <div
            class="rounded-xl bg-pearl-lusta-200 p-3 text-center align-middle dark:bg-pearl-lusta-100/10 md:text-start space-y-2">
            {#if publishQueue.length == 0}
              <p class=" dark:text-white">
                You're all caught up! There are no projects in the queue.
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
            class="rounded-xl bg-pearl-lusta-200 p-3 text-center align-middle dark:bg-pearl-lusta-100/10 md:text-start space-y-2"
            use:autoAnimate>
            {#if reviewQueue.length == 0}
              <p class=" dark:text-white">
                You're all caught up! There are no projects in the queue.
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
            class="rounded-xl bg-pearl-lusta-200 p-3 text-center align-middle dark:bg-pearl-lusta-100/10 md:text-start space-y-2">
            {#if reports.length == 0}
              <p class=" dark:text-white">
                You're all caught up! There are no projects in the queue.
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
            class="flex flex-col space-x-2 rounded-xl bg-stone-800 p-2 py-3 text-center align-middle md:text-start">
            <h1
              class="m-2 text-center text-2xl font-bold text-pearl-lusta-950 dark:text-white md:text-start">
              Site Roles
            </h1>
            <table class="table-auto rounded-xl p-2 text-left">
              <tr class="bg-emerald-500 p-2">
                <th class="p-2 text-pearl-lusta-950 dark:text-white"
                  >Role Name</th>
                <th class="p-2 text-pearl-lusta-950 dark:text-white"
                  >Permissions</th>
              </tr>
              {#each rolesJson ?? [] as i}
                <tr use:autoAnimate class="odd:bg-stone-700/25">
                  <td
                    ><p
                      style="color: {i.color};"
                      class="text-pearl-lusta-950 dark:text-white">
                      ⬤ {titleCase(i.name)}
                    </p></td>
                  <td class="text-pearl-lusta-950 dark:text-white"
                    >{#if i.permissions.length != 0}{i.permissions.join(
                        " | "
                      )}{:else}None{/if}</td>
                </tr>
              {/each}
            </table>
          </div>
        {/if}
      {/await}
    </div>
  </div>
</main>
