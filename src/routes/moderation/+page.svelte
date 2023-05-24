<script lang="ts">
  import { user } from "$lib/globals/stores";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { fetchAuthed, titleCase } from "$lib/globals/functions";
  import { apiURL } from "$lib/globals/consts";
  import autoAnimate from "@formkit/auto-animate";
  import ProjectComponent from "$lib/components/ProjectComponent.svelte";
  import { sampleSize } from "lodash-es";

  let activePage = "publish_queue";

  let rolesJson: Role[];
  let publishQueue: Project[];
  let reviewQueue: Project[];

  async function loadStuff() {
    if ($user.role == "default") {
      goto("/");
    }

    let pq = await fetchAuthed("get", `${apiURL}/moderation/queue/publish`);
    publishQueue = (await pq.json())["projects"] as Project[];

    let rq = await fetchAuthed("get", `${apiURL}/moderation/queue/review`);
    reviewQueue = (await rq.json())["projects"] as Project[];

    let r = await fetchAuthed("get", `${apiURL}/user/staff/roles`);
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
      class="my-3 pb-2 text-center font-brand text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Moderation Dashboard
    </h1>
    <div class="mb-2 flex space-x-2">
      <button
        class="button-base {activePage === 'publish_queue'
          ? 'bg-stone-600'
          : 'bg-stone-800'}"
        on:click="{() => (activePage = 'publish_queue')}">Publish Queue</button>
      <button
        class="button-base {activePage === 'review_queue'
          ? 'bg-stone-600'
          : 'bg-stone-800'}"
        on:click="{() => (activePage = 'review_queue')}">Review Queue</button>
      <button
        class="button-base {activePage === 'roles'
          ? 'bg-stone-600'
          : 'bg-stone-800'}"
        on:click="{() => (activePage = 'roles')}">Roles</button>
      <a href="/moderation/console"
        ><button class="button-base bg-stone-800">Open console</button></a>
    </div>

    {#await loadStuff()}
      <p class="p-2 font-brand dark:text-white">Loading...</p>
    {:then}
      {#if activePage == "publish_queue"}
        <div
          use:autoAnimate
          class="rounded-xl bg-pearl-lusta-200 p-3 text-center align-middle dark:bg-pearl-lusta-100/10 md:text-start">
          {#if publishQueue.length == 0}
            <p class="font-brand dark:text-white">
              You're all caught up! There are no projects in the queue.
            </p>
          {:else}
            <p class="font-brand dark:text-white">
              There are {publishQueue.length} items awaiting approval:
            </p>
            {#each publishQueue ?? [] as proj}
              <ProjectComponent project="{proj}" />
            {/each}
          {/if}
        </div>
      {:else if activePage == "review_queue"}
        <div
          use:autoAnimate
          class="rounded-xl bg-pearl-lusta-200 p-3 text-center align-middle dark:bg-pearl-lusta-100/10 md:text-start">
          {#if reviewQueue.length == 0}
            <p class="font-brand dark:text-white">
              You're all caught up! There are no projects in the queue.
            </p>
          {:else}
            <p class="font-brand dark:text-white">
              There are {reviewQueue.length} items awaiting approval:
            </p>
            {#each reviewQueue ?? [] as proj}
              <ProjectComponent project="{proj}" />
            {/each}
          {/if}
        </div>
      {:else if activePage == "roles"}
        <div
          use:autoAnimate
          class="flex flex-col space-x-2 rounded-xl bg-stone-800 p-2 py-3 text-center align-middle md:text-start">
          <h1
            class="m-2 text-center font-brand text-2xl font-bold text-pearl-lusta-950 dark:text-white md:text-start">
            Site Roles
          </h1>
          <table class="table-auto rounded-xl p-2 text-left font-brand">
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
</main>
