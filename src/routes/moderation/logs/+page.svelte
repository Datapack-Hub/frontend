<script lang="ts">
  import { user } from "$lib/globals/stores";
  import { goto } from "$app/navigation";
  import { fetchAuthed } from "$lib/globals/functions";
  import { apiURL } from "$lib/globals/consts";
  import { page } from "$app/stores";

  let logsJson: [{ username: string; action: string; time: number }];

  async function loadStuff() {
    if ($user.role == "default") {
      goto("/");
    }

    let logs = await fetchAuthed(
      "get",
      `${apiURL}/moderation/logs?page=${
        $page.url.searchParams.get("page") ?? "1"
      }`
    );
    logsJson = (await logs.json())["result"];
  }
</script>

<svelte:head>
  <title>Staff Team | Datapack Hub</title>
</svelte:head>

<main
  class="bg-new-white-200 overflow-y-scroll px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="h-screen w-full flex-col md:flex-row md:items-start md:pt-5">
    <h1
      class="mt-8 pb-2 text-center font-brand text-3xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Moderation logs
    </h1>
    <br />
    {#await loadStuff() then}
      <table class="w-full table-auto p-2 text-left font-brand dark:text-white">
        <tr class="bg-emerald-500">
          <th class="p-2">User</th>
          <th>Action</th>
          <th>When</th>
        </tr>
        {#each logsJson ?? [] as i}
          <tr>
            <td
              ><a
                href="/user/{i.username}"
                aria-label="Link to {i.username}'s profile"
                class="hover:text-blue-500 hover:underline">{i.username}</a
              ></td>
            <td>{i.action}</td>
            <td>{new Date(i.time).toLocaleString()}</td>
          </tr>
        {/each}
      </table>
    {/await}
  </div>
</main>
